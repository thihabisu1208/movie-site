<?php
/**
 * 認証 class
 */

class Auth
{
    /**
     * ベーシック認証
     *
     * [usage]
     * $user = Auth::basic(array(
     *     'hoge0' => 'pass0',
     *     'hoge1' => 'pass1',
     * ));
     *
     * @param array  $users   ユーザー情報(複数ユーザー可) array('ユーザ名' => 'パスワード') の形式
     * @param string $realm   レルム文字列
     * @param string $err_msg 認証失敗時のエラーメッセージ
     */
    public static function basic(Array $users, $realm = 'Require valid-user', $err_msg = '401 Unauthorized')
    {
        if (isset($_SERVER['PHP_AUTH_USER']) && isset($users[$_SERVER['PHP_AUTH_USER']])){
            if ($users[$_SERVER['PHP_AUTH_USER']] == $_SERVER['PHP_AUTH_PW']){
                return $_SERVER['PHP_AUTH_USER'];
            }
        }

        header('WWW-Authenticate: Basic realm="'.$realm.'"');
        header('HTTP/1.0 401 Unauthorized');
        header('Content-type: text/html; charset='.mb_internal_encoding());

        exit($err_msg);
    }



} // -- End of class


