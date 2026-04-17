
<!DOCTYPE html>
<html lang="en">
  <head>
    <?php 
      require_once('p_includes/meta_header.php');
    ?>
       
    </head>
    <body>       
            
        <div class="geral">
            <div class="container">

                <?php 
                  require_once('p_includes/header.php');
                ?>

                <div class="row">
                    <div class="col-xs-12 box-shadow padding_20 margin_top_30 bg_gradient">

                        <?php 
                            if($contatoDet){ 
                                foreach ($contatoDet as $value) {
                                  $nome = $value->nome;
                                  $email = $value->email;
                                  $assunto = $value->assunto;
                                  $msg = $value->msg;
                                  $data_cad = $value->data_cad;

                                  list($ano,$mes,$dia) = explode('-', $data_cad);   

                                }

                              ?>
                                <a href="<?php echo base_url('painel/contatos'); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                                                
                                <h1>Mensagem de Contato</h1>
                                
                                <hr />

                                Nome: <strong><?php echo $nome; ?></strong><br />
                                E-mail: <strong><?php echo $email; ?></strong><br />
                                Assunto: <strong><?php echo $assunto; ?></strong><br />
                                Enviada em: <strong><?php echo $dia.'/'.$mes.'/'.$ano; ?></strong><br />
                                <br>
                                Mensagem: <p style="text-align: justify;"><i><?php echo $msg; ?></i></p>




                        <?php
                            }elseif($contatos){ 
                             
                                ?>
                                
                                <a href="<?php echo base_url('painel/home'); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                <hr />
                                
                                <h1>Mensagens de Contato</h1>
                                <p class="pull-right"><span style="background-color: #00C900">&emsp;&emsp;</span> - Mensagem não visualizada</p>
                                <div class="clearfix"></div>
                                
                                <hr />
                                
                                    <table class="table table-condensed">
                                        <thead>
                                          <tr>
                                            <th>#</th>
                                            <th>Nome</th>
                                            <th>E-mail</th>
                                            <th>Assunto</th>
                                            <th>Data de envio</th>
                                            <th class="text-center">Ações</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                        <?php                        
                                        foreach ($contatos as $key) {     
                                            $status = $key->status;

                                            if($status == 'N'){
                                                $linha = 'style="background-color: #00C900;"';
                                            }else{
                                                $linha = '';
                                            }  

                                            list($ano,$mes,$dia) = explode('-', $key->data_cad);

                                          ?>
                                            <tr <?php echo $linha; ?>>
                                                <td><?php echo $key->id; ?></td>
                                                <td><?php echo $key->nome; ?></td>
                                                <td><?php echo $key->email; ?></td>
                                                <td><?php echo $key->assunto; ?></td>
                                                <td><?php echo $dia.'/'.$mes.'/'.$ano; ?></td>
                                                <td class="text-center"><a href="<?php echo base_url('painel/contatos/visualizar/'.$key->id_md5); ?>"><img src="<?php echo base_url('assets/painel/images/icone_visualizar.png'); ?>"></a></td>
                                              </tr>
                                          <?php                           
                                        }
                                       ?>                             
                                          
                                        </tbody>
                                    </table>

                        <?php   }else{ ?>
                                  <h4>Nenhuma mensagem de contato enviada!</h4>
                        <?php   }
                            
                        ?>

                        
                                               
                        <div class="clearfix"></div>
                    </div>
                        
                </div>
              

            </div> <!-- /container -->
        </div>

        <?php 
          require_once('p_includes/footer.php');
        ?>


        <?php 
          require_once('p_includes/meta_footer.php');
        ?>

        <script type="text/javascript">

            $("#form_config").submit(function(){
                $("#result_config").html('');

                if( $("#titulo").val() == "" ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Informe o titulo!</strong></div>');   
                    $("#titulo").focus();
                    return false;
                }
                
                if( $("#resumo").val() == "" ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Informe um resumo!</strong></div>');   
                    $("#resumo").focus();
                    return false;
                }
                if( $("#resumo").val().length > 200 ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>No máximo 200 caracteres para o resumo!</strong></div>');   
                    $("#resumo").focus();
                    return false;
                }
                if( $("#texto").val() == "" ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Informe um texto!</strong></div>');   
                    $("#texto").focus();
                    return false;
                }
                
                return true;
            });

            function excluir(id){
                var base_url = "<?php echo base_url(); ?>";
                if(confirm('Deseja realmente excluir esta notícia?')){
                    $.post(base_url+"painel/exclui_noticia",{
                       id_md5: id
                    }, function(config){
                       if(config == 'accept'){                    
                          
                           var novaURL = base_url+'painel/noticias';
                           setTimeout(function(){
                               $(window.document.location).attr("href",novaURL);
                             }, 500);
                       }else{
                           $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Ocorreu um erro ao excluir!</strong></div>');   
                           $("#result_config").fadeIn();
                       }
                    });
                }
            }

            function excluirImg(id, id_not){
                var base_url = "<?php echo base_url(); ?>";
                if(confirm('Deseja realmente excluir esta imagem?')){
                    $.post(base_url+"painel/exclui_imagem_noticia",{
                       id: id,
                       noticia_md5: id_not
                    }, function(config){
                       if(config == 'accept'){                    
                          
                           var novaURL = base_url+'painel/noticias/imagens/'+id_not;
                           setTimeout(function(){
                               $(window.document.location).attr("href",novaURL);
                             }, 500);
                       }else{
                           $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Ocorreu um erro ao excluir!</strong></div>');   
                           $("#result_config").fadeIn();
                       }
                    });
                }
            }

            function update(){
                var base_url = "<?php echo base_url(); ?>";

                $("#marca_up").removeClass('display-none');
                $("#marca").addClass('display-none');

                $.post(base_url+"painel/atualiza_marcas",{
                   
                }, function(config){
                   if(config == 0){                          
                       return false;
                   }else{
                      var options = '<option>Selecione</option>';
                                               
                      $.each(config, function(i, item) {
                        options += '<option value="' + config[i].id_md5 + '">' + config[i].nome + '</option>';
                        //$('#result_busca_cep').append($( "<hr /><li><small><input type='hidden' id='log"+i+"' value='"+busca_cep[i].logradouro.ucwords()+"' /> <input type='hidden' id='cid"+i+"' value='"+busca_cep[i].cidade+"' />  <input type='hidden' id='uf"+i+"' value='"+busca_cep[i].uf+"' /> " + busca_cep[i].logradouro.ucwords() + ", <input type='hidden' id='bai"+i+"' value='"+busca_cep[i].bairro.ucwords()+"' /> " + busca_cep[i].bairro.ucwords() +", <strong style='text-decoration: underline;'>" + busca_cep[i].cep + "</strong></small> &emsp;&emsp; <a onClick=preenche('"+i+"','"+busca_cep[i].cep+"') data-dismiss='modal'  class='btn btn-mini btn-food'>Selecionar</a> </li>" ));                             
                      });

                      $("#marca").html('');
                      $("#marca").html(options);

                      $("#marca_up").addClass('display-none');
                      $("#marca").removeClass('display-none');
                      return false;
                   }
                }, "json");
                
            }

            $("#categoria").change(function(){
                var base_url = "<?php echo base_url(); ?>";

                //$("#subcategoria").removeClass('display-none');
                //$("#marca").addClass('display-none');

                $.post(base_url+"painel/busca_subcategorias",{
                   id_cat: $("#categoria").val()
                }, function(config){
                   if(config == 0){      
                       $("#subcategoria").html('');                    
                       $("#box_subcategoria").addClass('display-none');
                   }else{
                      var options = '';
                                               
                      $.each(config, function(i, item) {
                        options += '<option value="' + config[i].id_md5 + '">' + config[i].nome + '</option>';
                      });

                      $("#subcategoria").html(options);

                      //$("#marca_up").addClass('display-none');
                      $("#box_subcategoria").removeClass('display-none');
                      return false;
                   }
                }, "json");
           });


        </script>

        <script language="JavaScript">
          function abrir(URL) {
           
            var width = 1024;
            var height = 350;
           
            var left = 150;
            var top = 150;
           
            window.open(URL,'janela', 'width='+width+', height='+height+', top='+top+', left='+left+', scrollbars=yes, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no');
           
          }
        </script>
        
       
    </body>
</html>