<?php

$categorias = $this->generico->get_tudo('categorias');

?>
<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->

<head>
    <?php require_once('includes/meta_header.php'); ?>
</head>

<body>

<?php require_once('includes/header.php'); ?>

<section id="container">
    <div class="container">
        <div class="row">
            <div class="span12">
                <div class="gmap">
                    <iframe width="100%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com.br/maps?f=q&amp;source=s_q&amp;hl=pt-BR&amp;geocode=&amp;q=Pedro+Rigotti,+925,+Vila+Santo+Andr%C3%A9,+79810-120+-+Dourados%2FMS&amp;aq=&amp;sll=-25.571183,-53.128739&amp;sspn=3.51279,6.696167&amp;ie=UTF8&amp;hq=&amp;hnear=R.+Pedro+Rigotti,+925+-+Jardim+S%C3%A3o+Geraldo,+Dourados+-+Mato+Grosso+do+Sul,+79810-120&amp;t=m&amp;z=14&amp;ll=-22.233004,-54.806675&amp;output=embed"></iframe><br /><small><a href="https://www.google.com.br/maps?f=q&amp;source=embed&amp;hl=pt-BR&amp;geocode=&amp;q=Pedro+Rigotti,+925,+Vila+Santo+Andr%C3%A9,+79833-085+-+Dourados%2FMS&amp;aq=&amp;sll=-25.571183,-53.128739&amp;sspn=3.51279,6.696167&amp;ie=UTF8&amp;hq=&amp;hnear=R.+Pedro+Rigotti,+925+-+Jardim+S%C3%A3o+Geraldo,+Dourados+-+Mato+Grosso+do+Sul,+79810-120&amp;t=m&amp;z=14&amp;ll=-22.2323312,-54.8016188" style="color:#0000FF;text-align:left">Exibir mapa ampliado</a></small>
                    
                </div>
            </div>
        </div>
        <div class="row">
            <section id="page-sidebar" class="pull-left span7">
                <h4>Fale conosco</h4>
                <form name="form_contato" method="post" action="#" id="form_contato">
                    <div class="af-outer">
                        <div class="af-inner">
                            <label for="tg_nome">Nome:</label>
                            <input type="text" name="tg_nome" id="tg_nome"  value="" class="text-input span7" style="background-color: rgb(255, 255, 255);">
                        </div>
                    </div>
                    <div class="af-outer">
                        <div class="af-inner">
                            <label for="tg_email">E-mail:</label>
                            <input type="text" name="tg_email" id="tg_email"  value="" class="text-input span7" style="background-color: rgb(255, 255, 255);">
                        </div>
                    </div>
                    <div class="af-outer af-required">
                        <div class="af-inner">
                            <label for="tg_assunto">Assunto:</label>
                            <input type="text" name="tg_assunto" id="tg_assunto" value="" class="text-input span7" style="background-color: rgb(255, 255, 255);">
                        </div>
                    </div>
                    <div class="af-outer af-required">
                        <div class="af-inner">
                            <label for="msg">Mensagem:</label>
                            <textarea name="tg_msg" id="tg_msg" cols="30" class="text-input span7" style="background-color: rgb(255, 255, 255);"></textarea>
                        </div>
                    </div>
                    <div class="af-outer af-required">
                        <div class="af-inner">
                            <input type="submit" name="submit" class="form-button btn btn-welcome btn-large" id="submit_btn" value="Enviar!">
                        </div>
                    </div>
                </form>
                <div id="result_contato"></div>
            </section>
            <!--sidebar-->
            <aside id="sidebar" class="pull-right span5">
                <!--address-->
                <section>
                    <h4>Nossa localização</h4>
                    <address>
                        <p>
                            <i class="icon-map-marker"></i> R. Pedro Rigotti, 925, Vila Santo André, 79810-120 - Dourados/MS<br>
                            <i class="icon-phone"></i> (67) 3032-3090<br>
                            <i class="icon-phone"></i> (67) 3021-3150<br>
                            <i class="icon-envelope"></i> <a href="mailto:#">vendas@tgdistribuidora.com.br</a>
                        </p>
                    </address>
                </section>
                <section>
                    <h4>Horário de atendimento</h4>
                    <ul class="unstyled">
                        <li class="clearfix">Segunda à Sexta:<p class="pull-right">8:00 às 18:00</p></li>
                        <li class="clearfix">Sábado:<p class="pull-right">8:00 às 12:00</p></li>
                    </ul>
                </section>
            </aside>
        </div>
    </div>    
</section>

<?php require_once('includes/meta_footer.php'); ?> 

<?php require_once('includes/footer.php'); ?>

    <script type="text/javascript">
            $("#form_contato").submit(function(){
                var base_url = "<?php echo base_url(''); ?>";
                if( $("#tg_nome").val() == "" ){
                    $("#result_contato").fadeIn();  
                    $("#result_contato").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Por favor, informe seu nome!</strong></div>');
                    $("#tg_nome").focus();
                    return false;
                }else if( $("#tg_email").val() == "" ){
                    $("#result_contato").fadeIn();  
                    $("#result_contato").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Por favor, informe seu E-mail!</strong></div>');
                    $("#tg_email").focus();
                    return false;
                }else if( $("#tg_assunto").val() == "" ){
                    $("#result_contato").fadeIn();  
                    $("#result_contato").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Por favor, informe o assunto!</strong></div>');
                    $("#tg_assunto").focus();
                    return false;
                }else if( $("#tg_msg").val() == "" ){
                    $("#result_contato").fadeIn();  
                    $("#result_contato").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Por favor, informe sua mensagem!</strong></div>');
                    $("#tg_msg").focus();
                    return false;
                }else{
                    
                    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                    if(filter.test($("#tg_email").val())){
                        $("#result_contato").html("");                      
                    }else{
                        $("#result_contato").fadeIn();  
                        $("#result_contato").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Por favor, informe um e-mail válido!</strong></div>');   
                        $("#tg_email").focus(); 
                        return false;
                    }
                

                    $("#result_contato").html('&emsp;');
                    $.post(base_url+"contato/addContato",{
                        nome: $("#tg_nome").val(),
                        email: $("#tg_email").val(),
                        assunto: $("#tg_assunto").val(),
                        msg: $("#tg_msg").val()
                        
                    }, function(contato){
                       if(contato == 'accept'){  
                            $("#result_contato").fadeIn();       
                            $("#result_contato").html('<div class="alert alert-success"><strong>Mensagem enviada com sucesso!</strong></div>');                           
                            $('#tg_nome').val('');
                            $('#tg_email').val('');  
                            $('#tg_assunto').val('');  
                            $('#tg_msg').val('');                                
                            $("#result_contato").fadeOut(10000);           
                                             
                        }else{
                            $('#result_contato').html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Não foi possível enviar sua mensagem agora. Por favor, tente novamente!</strong></div>');
                            $("#result_contato").fadeIn();
                        }
                    });
                    
                    return false;
                    }
            });
        </script>
    
</body>
</html>
