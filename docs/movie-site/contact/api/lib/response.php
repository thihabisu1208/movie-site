<?php

class Response
{

    // SUCCESS
    const SUCCESS            = '000';
    // DATA BASE
    const DB_FAILURE         = '100';
    const DB_NODATA          = '101';
    const DB_DUPULICATION    = '102';
    // REQUEST
    const REQ_INVALID_PARAM  = '200';
    const REQ_VALIDATION_ERR = '201';
    // SERVICE
    const SRV_INVALID        = '300';
    const SRV_NOSSL          = '301';
    const SRV_NOACCEPTION    = '302';
    const SRV_NOACTIVATION   = '303';
    // UNKNOWN
    const UNKOWN_ERROR       = '900';

    public function message($code)
    {
        switch ($code) {
            // 000
            case self::SUCCESS : // 000
                $msg = 'OK';
                break;
            // 100...
            case self::DB_FAILURE : // 100
                $msg = 'DB処理が失敗しました';
                break;
            case self::DB_NODATA : // 101
                $msg = '該当レコードが存在しませんでした';
                break;
            case self::DB_DUPULICATION : // 102
                $msg = '該当レコードが重複しています';
                break;
            // 200...
            case self::REQ_INVALID_PARAM : // 200
                $msg = '受信パラメーターが不正(invalid parameter)';
                break;
            case self::REQ_VALIDATION_ERR : // 201
                $msg = '受信データが不正(validation error)';
                break;
            // 300...
            case self::SRV_INVALID : // 300
                $msg = '不正なアクセスです(invalid access)';
                break;
            case self::SRV_NOSSL : // 301
                $msg = '不正なアクセスです(no ssl)';
                break;
            case self::SRV_NOACCEPTION : // 302
                $msg = '不正なアクセスです(no acception)';
                break;
            case self::SRV_NOACTIVATION : // 303
                $msg = '不正なアクセスです(no activation)';
                break;
            // others...
            default :
                $msg = '';
        }
        return $msg;
    }

    private $code, $msg, $data;

    public function __construct()
    {
    }

    public function set($code, $msg = '', array $data = array())
    {
        $this->code = strpos($msg, 'Model_Super::') !== FALSE ? self::DB_FAILURE : $code;
        $this->msg  = $msg === '' ? $this->message($code) : $msg;
        $this->data = empty($data) ? (object)$data : $data;
        return $this;
    }

    public function send()
    {
        header('Content-Type: application/json; charset=utf-8');
        echo(json_encode(
            array(
                'rescode' => $this->code,
                'message'=> $this->msg,
                'data' => $this->data
            )
        ));
        exit;
    }

}

