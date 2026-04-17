<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><?php echo $titulo; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="<?php echo base_url('assets/painel/css/normalize.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('assets/painel/css/bootstrap.css'); ?>" rel="stylesheet"/>
    <link href="<?php echo base_url('assets/painel/css/painel.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('assets/painel/css/bruno_framework.css'); ?>" rel="stylesheet">


    <!--[if lt IE 8]>
    <div style=' clear: both; text-align:center; position: relative;'>
        <a href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home?ocid=ie6_countdown_bannercode">
            <img src="http://storage.ie6countdown.com/assets/100/images/banners/warning_bar_0000_us.jpg" border="0" height="42" width="820" alt="You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today." />
        </a>
    </div>
    <![endif]-->

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
       
    </head>
    <body>       
            
        <div class="geral">
            <div class="container">

                <div class="row">
                    <div class="col-xs-12 text-center">
                        <div class="logo">
                            <img src="<?php echo base_url('assets/painel/images/logo.png'); ?>">
                        </div>
                        <div class="box-shadow box-radius margin_top_40 padding_top_20 grid_8 margin_auto color_1">                            
                            <form class="padding_20" method="post" id="form_login">
                            
                                <p>
                                    <label for="email">E-mail:</label>
                                    <input type="text" id="email" name="email" placeholder="Digite seu e-mail">
                                </p>
                                <p>    
                                    <label for="senha">Senha:</label>
                                    <input type="password" id="senha" name="senha" placeholder="Digite sua senha">
                                </p>
                            
                                <div class="footer">                                     
                                    <button type="submit" class="btn btn-success"> <span class="glyphicon glyphicon-lock"></span> Acessar</button>
                                </div>
                                <br>
                                <div id="result_login"></div>
                            </form>
                        </div>
                    </div>
                </div>
              

            </div> <!-- /container -->
        </div>

        <footer class="rodape text-center padding_10 bg_gradient">
            © Painel Administrativo 2019 
        </footer>
        <script src="<?php echo base_url('assets/painel/js/jquery-2.0.2.min.js'); ?>"></script>
        <script src="<?php echo base_url('assets/painel/js/bootstrap.min.js'); ?>"></script>
        <script src="<?php echo base_url('assets/painel/js/respond.min.js'); ?>"></script>

        <script type="text/javascript">
            $("#form_login").submit(function(){
                var base_url = "<?php echo base_url(); ?>";
                
                if($("#email").val() == ""){  
                    $("#result_login").fadeIn();
                    $('#result_login').addClass('alert alert-error');
                    $("#result_login").html("Por favor, informe seu E-mail!");
                    $("#email").focus(); //Adiciona foco ao campo com id='login'
                    return false; //retorna nulo
                }else{
                    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                    if(filter.test($("#email").val())){
                        $("#result_login").html("");  
                        $("#result_login").hide();
                        
                    }else{
                        $("#result_login").html("Por favor, informe um E-mail v&aacute;lido!");   
                        $("#email").focus(); 
                        return false;
                    }
                }
                
                if($("#senha").val() == ""){  
                    $("#result_login").fadeIn();
                    $('#result_login').addClass('alert alert-error');
                    $("#result_login").html("Por favor, informe sua senha!");
                    
                    $("#senha").focus(); 
                    return false;
                }
                
                $.post(base_url+"painel/valida_login",{
                    email: $("#email").val(),
                    senha: $("#senha").val()
                }, function(logar){
                    if(logar == 'accept'){
                        
                       $('#result_login').html("Redirecionando");                                                    
                       var novaURL = base_url+"painel/home";
                       $(window.document.location).attr('href',novaURL);                           
                                         
                    }else{
                        $('#result_login').addClass('alert alert-error');
                        $('#result_login').html("Dados incorretos!");
                        $("#result_login").fadeIn();
                    }
                });
                
                return false;
            });
        </script>
    </body>
</html>