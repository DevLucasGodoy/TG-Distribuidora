<!--footer-->
<footer id="footer">
    <div class="container">
        <div class="row">
            <div class="span4">
                <p class="heading">Loja Dourados</p>
                <address>
                    <p><i class="icon-map-marker"></i>Rua Pedro Rigotti, 925, Vila Santo André, <br>79810-120 - Dourados/MS</p>
                    <p><i class="icon-phone"></i> (67) 3032-3090</p>
                    <p><i class="icon-phone"></i> (67) 3021-3150</p>
                </address>
            </div>
            <div class="span8">
                <div class="row">
                    <div class="span8"></div>
                    <div class="span8">

                    </div>
                </div>
            </div>
            
            <div class="span4">
                <p class="heading">Loja Campo Grande</p>
                     <address>
                        <p><i class="icon-map-marker"></i>Av. Salgado Filho, 1756 - 79005-330 - Campo Grande/MS</p>
                        <p><i class="icon-phone"></i> (67) 3043-3090</p>
                        <p><i class="icon-phone"></i> (67) 3042-3091</p>
                    </address>

            </div>
             <div class="span4">
                <p class="heading">Loja Ponta Porã</p>
                <address>
                    <p><i class="icon-map-marker"></i>Av. Paraguai, 2310 - </br> Centro Ponta Porã/MS</p>
                    <p><i class="icon-phone"></i> (67) 3431-6421</p>
                  
                </address>
            </div>
            <div class="span12">
                <p class="heading">Newsletter</p>
                <p>Receba nossas novidades em seu e-mail.</p>
                <div class="input-append">
                    <form method="post" id="form_news">
                        <input type="text" id="email" placeholder="Digite seu e-mail aqui" class="span2"/>
                        <input type="submit" class="btn btn-inverse" value="Cadastrar">
                    </form>
                    <div id="result_news"></div>
                </div>
            </div>
        </div>
    </div>
</footer>

<!--footer menu-->
<section id="footer-menu">
    <div class="container">
        <div class="row">
            <div class="span4">
                <p class="copyright">&copy; Copyright 2019.</p>
            </div>
            <div class="span8 hidden-phone">
                <ul class="pull-right">
                    <li>Todos os direitos reservados à TG distribuidora</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<script type="text/javascript" charset="utf-8">
        $("#form_news").submit(function(){
            var base_url = "<?php echo base_url(); ?>";            
            /*
            if($("#nome").val() == ""){  
                $("#result_news").fadeIn();
                $('#result_news').addClass('alert alert-error');
                $("#result_news").html("Por favor, informe seu Nome!");
                
                $("#nome").focus(); 
                return false;
            }*/
            
            if($("#email").val() == ""){  
                alert("Por favor, informe seu e-mail!");
                $("#email").focus(); //Adiciona foco ao campo com id='login'
                return false; //retorna nulo
            }else{
                var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                if(filter.test($("#email").val())){
                    $("#result_news").html("");  
                    
                }else{
                    alert("Por favor, informe um e-mail válido!");  
                    $("#email").focus(); 
                    return false;
                }
            }
            
            
            $.post(base_url+"contato/newsletter",{
                email: $("#email").val()
                
            }, function(news){
                if(news == 'indisponivel'){
                    alert("E-mail já cadastrado!");
                }else if(news == 'accept'){   
                    alert("E-mail cadastrado com sucesso!"); 
                    $('#email').val('');                                        
                }else{
                    alert("Não foi possível cadastrar seu E-mail! Tente novamente."); 
                }
            });
            
            return false;
        });
    </script>

    <script type="text/javascript">
        $("#form_busca").submit(function(){
            if($("#busca").val() == ""){
                $("#busca").focus();
                return false;   
            }        
        });
    </script>