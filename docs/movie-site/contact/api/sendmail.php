<?php
/* vim:se et ts=4 sw=4 sts=4: */
include 'lib/email.php';
include 'lib/validate.php';
include 'lib/request.php';
include 'lib/response.php';

/**
 * Set php error level and display
 */
define('ERROR_LOG_FILE', './log/error-' . date('Ym') . '.log');
error_reporting(E_ALL | E_STRICT);    // all level of error
ini_set('log_errors', 1);             // log error on
ini_set('error_log', ERROR_LOG_FILE); // path of error log
ini_set('display_errors', 0);         // always hide error

class Sendmail
{

    public function __construct()
    {
        $this->rq = new Request;
        $this->em = new Email(array(
            'template_dir' => './template',
			'regex_email' => '/^([a-z0-9\+_\-\/]+)(\.[a-z0-9\+_\-\/]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix',
        ));
        $this->vd = new Validate(array(
            'get_errors_type' => 'array',
        ));
        $this->vd->init()->add($this);
    }

    public function prepare()
    {
        date_default_timezone_set('Asia/Tokyo');
        $this->data = $this->rq->post();
    }

    public function validate()
    {
        $this->vd->field('company', '会社名・学校名', 'required')
            ->field('role', '役職・役割', 'throw')
            ->field('name', 'お名前', 'required')
            ->field('kana', 'お名前（ふりがな）', 'required')
            ->field('email', 'メールアドレス', 'required|email')
            ->field('tel', '電話番号', 'required')
            ->field('message', 'お問い合わせ内容', 'required')
            ->field('g-recaptcha-response', 'リキャプチャ', 'recaptcha')
            ; // end of $this->vd
        if ($this->vd->execute($this->data) === FALSE) {
            $this->_throw(Response::REQ_VALIDATION_ERR, $this->vd->get_errors(':state'));
        }
    }

    public function _valid_recaptcha($val)
    {
        $key = '6Le6k3EaAAAAAMlTcWuYWLW6bD0-Q3lpW0OuLgMQ';
        $result = $this->_fetch('https://www.google.com/recaptcha/api/siteverify', array(
            'secret' => $key,
            'response' => $val,
        ));
        $score = isset($result['score']) ? floatval($result['score']) : 0.0;
        Validate::message('recaptcha', sprintf("リキャプチャ認証に失敗しました。[%0.1f]", $score));
        return isset($result['success']) && (int)$result['success'] === 1
            && isset($result['action']) && $result['action'] === 'homepage'
            && $score >= 0.5
            ;
    }

    public function execute()
    {
        $date = date('Y-m-d H:i:s');
        return;
        // user
        $this->em->template('user')
            ->keyword($this->data + array('date' => $date))
            ->replace()
            ->send();
        $this->em->clear();
        // admin
        $this->em->template('admin')
            ->keyword($this->data + array('date' => $date))
            ->replace()
            ->send();
        $this->em->clear();
    }

    private function _fetch($url, $param = array(), $method = 'POST')
    {
        $result = array();
        $ch = curl_init($url);
        curl_setopt_array($ch, array(
            CURLOPT_POST => $method,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_TIMEOUT => 3,
            CURLOPT_POSTFIELDS => http_build_query($param),
        ));
        $json  = curl_exec($ch);
        $info  = curl_getinfo($ch);
        $errno = curl_errno($ch);
        curl_close($ch);
        if ($errno === CURLE_OK && $info['http_code'] === 200) {
            $result = json_decode($json, TRUE);
        }
        return $result;
    }

    private function _throw($code, $data)
    {
        $msg = is_array($data) ? json_encode($data) : "{'unknown':'$data'}";
        throw new Exception($msg, $code);
    }

    public function logging($msg)
    {
        $msg = '[' . date('Y-m-d H:i:s') . '] ' . $msg;
        error_log($msg, 3, ERROR_LOG_FILE);
    }

}

$obj = new Sendmail;
$res = new Response;
try {
    $obj->prepare();
    $obj->validate();
    $obj->execute();
    $res->set(Response::SUCCESS)->send();
} catch (Exception $e) {
    if ($e->getCode() === 0) {
        $err = array(
            Response::UNKOWN_ERROR,
            '送信に失敗しました。',
            array('unknown' => $e->getMessage()),
        );
    } else {
        $err = array(
            $e->getCode(),
            '送信に失敗しました。',
            json_decode($e->getMessage(), TRUE),
        );
    }
    $obj->logging(print_r($err, TRUE));
    $res->set($err[0], $err[1], $err[2])->send();
}

