<?php
//    require 'auth.php';
//    Auth::basic(array(
//        'adminuser' => 'useradmin',
//    ));
?>
<html lang="ja">
<head>
<meta charset="utf-8" />
<script type="text/javascript" src="./jquery-1.9.1.min.js"></script>
<style type="text/css">
.content {
    width: 80%;
    margin: 10px auto;
    border: 1px solid gray;
    padding: 10px;
}
table {
    width: 100%;
}
input {
    border: 1px solid gray;
}
input[type="text"] {
    width: 90%;
}
textarea {
    border: 1px solid gray;
    width: 100%;
}
textarea#req {
    height: 80px;
}
textarea#res {
    height: 200px;
}
</style>
</head>
<body>

<div class="content">

<h2>データベースAPI操作画面</h2>

<p class="desc">この画面は、APIのデバッグや動作検証を行うための画面です。</p>

<div>
<table>
    <tr>
        <td>
            Request Method: 
            <select id="method">
                <option value="POST">POST</option>
                <option value="GET">GET</option>
            </select>
            &nbsp;&nbsp;&nbsp;
            API名: <select id="api"></select>
        </td>
    </tr>
    <tr>
        <td>
            URI: <input type="text" id="url" />
        </td>
    </tr>
    <tr>
        <td>
            Request In
            <input type="button" id="concat" value="改行を & 連結する" />
            <textarea id="req"></textarea>
        </td>
    </tr>
    <tr>
        <td><input type="button" id="send" value="送信する" /></td>
    </tr>
    <tr>
        <td>
            Response Out
            <textarea id="res"></textarea>
        </td>
    </tr>
</table>

</div>

</div>

<form name="ff" id="ff" action=""></form>

<script type="text/javascript">
var api = {

    uri: [ // {{{ API情報
        {
            'name' : 'メール送信API',
            'val'  : '/api/sendmail.php',
            'req'  : "company=ベースメント\nname=山田たろう\nkana=ヤマダタロウ\ntel=09012349999\nemail=seesawc@gmail.com\nkind=本イベントに関するお問い合わせ\nmessage=見積りを頂けますでしょうか。\ng-recaptcha-response=",
            'mode' : 'ajax'
        }
    ], // }}}

    init: function(){
        this.baseurl = location.protocol + '//' + location.host;
        this.loadApiSelector();
        $('#url').val($('#api option:selected').val());
        $('#req').val(api.reqget($('#api option:selected').val()));
        this.listen();
    },

    loadApiSelector: function(){
        var option = '';
        for (var i in this.uri) {
            option += '<option value="' + this.uri[i].val + '" mode="' + this.uri[i].mode + '">' + this.uri[i].name + '</option>';
        }
        $('#api').append(option);
    },

    submit: function(){
        var req = {
            action : this.baseurl + $('#url').val(),
            method : $('#method').val(),
            data   : $('#req').val(),
            mode   : $('#api option:selected').attr('mode')
        };
        if (req.mode == 'ajax') {
            this.do_ajax(req);
        } else if (req.mode == 'browse') {
            this.do_browse(req);
        }
    },

    do_ajax: function(req){
        $.ajax({
            type: req.method,
            dataType: 'text',
            async: false,
            cache: false,
            url: req.action,
            data: req.data,
            success: function(res, s, e){
                var txt = api.json2str(res);
                $('#res').val(res);
                console.log($.parseJSON(res));
            }
        });
    },

    do_browse: function(req){
        if (req.method == 'GET') {
            var url = req.action + '?' + req.data;
            window.open(url, '_blank');
        } else {
            var ff = $('#ff');
            var html = '';
            if (req.data.length > 0) {
                var arr = req.data.split('&');
                for (var i in arr) {
                    var kv = arr[i].split(/=/);
                    html += '<input type="hidden" name="' + kv[0] + '" value="' + kv[1] + '" />';
                }
            }
            ff.find('*').remove();
            ff.append(html);
            ff.attr({
                'method' : req.method,
                'action' : req.action,
                'target' : '_blank'
            });
            ff.submit();
        }
    },

    json2str: function(res){
        var json = new Array();
        for (var name in res) {
            if (res[name] instanceof Object) {
                json.push('"' + name + '":' + api.json2str(res[name]));
            } else {
                json.push('"' + name + '":"' + res[name] + '"');
            }
        }
        return '{' + json.join(',') + '}';
    },

    concat: function(){
        var text = $('#req').val();
        var arr  = text.split(/\n/);
        text = arr.join('&');
        $('#req').val(text);
    },

    reqget: function(uri){
        for (var i in api.uri) {
            if (api.uri[i].val == uri) {
                return api.uri[i].req;
            }
        }
    },

    listen: function(){
        $('#concat').click(function(){
            api.concat();
        });
        $('#api').change(function(){
            $('#url').val($(this).val());
            $('#req').val(api.reqget($(this).val()));
            $('#res').val('');
        });
        $('#send').click(function(){
            api.submit();
        });
    }
}
$(function(){
    api.init();
});
</script>

</body>
</html>
