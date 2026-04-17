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
            <section id="page-sidebar" class="span12">
                <h4>Resultado da busca</h4>
                <small>Foram encontrados <?php echo $busca_num; ?> produto(s)</small>
                <hr>
                <?php

                if($busca_result){
                    foreach ($busca_result as $value) {
                        $nome = $value->nome;
                        $url_produto = $value->url_produto;
                        $codigo = $value->codigo;
                        $id_md5 = $value->id_md5;
                        $img = $value->img;
                        ?>
                        <article data-id="id-1" data-type="javascript html" class="span2">
                            <div class="inner-image">
                                <a href="<?php echo base_url('produtos/detalhes/'.$url_produto) ?>">
                                    <img src="<?php echo base_url('assets/uploads/produtos/'.$id_md5.'/'.$img); ?>" width="200" title="<?php echo $nome; ?>" alt="<?php echo $nome; ?>"><br>
                                    <span class="frame-overlay"></span>
                                </a>
                            </div>
                            <div class="sliding">
                                <div class="inner-text">
                                    Nome: <strong><?php echo $nome; ?></strong><br>
                                    <small>Código: <strong><?php echo $codigo; ?></strong></small><br>
                                    <a href="<?php echo base_url('produtos/detalhes/'.$url_produto) ?>">+ Detalhes</a><br />
                                </div>
                            </div>
                        </article>
                        
             <?php  }
                }

                ?>
                
                
            </section>
            
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
