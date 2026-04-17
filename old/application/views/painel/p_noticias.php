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
                            if($novo){ 
                             
                                ?>
                                  <a href="<?php echo base_url('painel/noticias'); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                  <h1>Cadastrar nova notícia</h1>
                                  <hr />
                                  <form class="form-horizontal" action="<?php echo base_url('painel/cadastra_noticia'); ?>" role="form" id="form_config" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
                                    <div class="form-group">
                                      <label for="titulo" class="col-lg-2 control-label">Título</label>
                                      <div class="col-lg-10">
                                        <input type="text" class="form-control" id="titulo" name="titulo" placeholder="Título">
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <label for="userfile" class="col-lg-2 control-label">Imagem Principal</label>
                                      <div class="col-lg-10">
                                        <input type="file" id="userfile" name="userfile">
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <label for="status" class="col-lg-2 control-label">Status</label>
                                      <div class="col-lg-10">
                                        <select id="status" name="status" class="form-control">
                                            <option value="S">Ativo</option>
                                            <option value="N">Inativo</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <label for="destaque" class="col-lg-2 control-label">Destaque</label>
                                      <div class="col-lg-10">
                                        <select id="destaque" name="destaque" class="form-control">
                                            <option value="S">Sim</option>
                                            <option value="N">Não</option>
                                        </select>
                                      </div>
                                    </div>


                                    <div class="form-group">
                                      <label for="resumo" class="col-lg-2 control-label">Resumo</label>
                                      <div class="col-lg-10">
                                        <textarea class="form-control" id="resumo" name="resumo" placeholder="Resumo"></textarea>
                                      </div>
                                    </div>

                                    <div class="form-group">
                                      <label for="texto" class="col-lg-2 control-label">Texto</label>
                                      <div class="col-lg-10">
                                        <textarea class="form-control" id="summernote" name="content" placeholder="Texto"></textarea>
                                      </div>
                                    </div>
                                    
                                   
                                    <div class="form-group">
                                      <div class="col-lg-offset-2 col-lg-10">
                                        <input type="submit" class="btn btn-success" value="Cadastrar"/>
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <div class="col-lg-offset-2 col-lg-10" id="result_config">
                                             <?php  
                                              if($error){
                                                  echo $error;
                                              }
                                             ?>                                   
                                      </div>
                                    </div>
                                  </form>
                                

                    <?php    
                            
                              }elseif($editar){                               

                                  if($status == 'S'){
                                      $selected1 = 'selected="selected"';
                                      $selected2 = '';
                                  }else{
                                      $selected1 = '';
                                      $selected2 = 'selected="selected"';                                        
                                  }

                                  if($destaque == 'S'){
                                      $selectedDest1 = 'selected="selected"';
                                      $selectedDest2 = '';
                                  }else{
                                      $selectedDest1 = '';
                                      $selectedDest2 = 'selected="selected"';                                        
                                  }
                               
                        ?>
                                <a href="<?php echo base_url('painel/noticias'); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                <h1>Editar Notícia</h1>
                                <hr />
                                <form class="form-horizontal" action="<?php echo base_url('painel/edita_noticia'); ?>" role="form" id="form_config" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
                                    <div class="form-group">
                                      <label for="titulo" class="col-lg-2 control-label">Título</label>
                                      <div class="col-lg-10">
                                        <input type="text" class="form-control" id="titulo" name="titulo" placeholder="Título" value="<?php echo $tituloNoticia; ?>">
                                      </div>
                                    </div>
                                    <div class="form-group">
                                    <label for="userfile" class="col-lg-2 control-label">Imagem Principal</label>
                                     
                                      <div class="col-lg-3">
                                        <img src="<?php echo base_url('assets/uploads/noticias/'.$id_md5.'/'.$img); ?>" width="200" />                     
                                      </div>

                                      <div class="col-lg-7">
                                        <input type="file" id="userfile" name="userfile" />
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <label for="status" class="col-lg-2 control-label">Status</label>
                                      <div class="col-lg-10">
                                        <select id="status" name="status" class="form-control">
                                            <option <?php echo $selected1; ?> value="S">Ativo</option>
                                            <option <?php echo $selected2; ?> value="N">Inativo</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <label for="destaque" class="col-lg-2 control-label">Destaque</label>
                                      <div class="col-lg-10">
                                        <select id="destaque" name="destaque" class="form-control">
                                            <option <?php echo $selectedDest1; ?> value="S">Sim</option>
                                            <option <?php echo $selectedDest2; ?> value="N">Não</option>
                                        </select>
                                      </div>
                                    </div>


                                    <div class="form-group">
                                      <label for="resumo" class="col-lg-2 control-label">Resumo</label>
                                      <div class="col-lg-10">
                                        <textarea class="form-control" id="resumo" name="resumo" placeholder="Resumo"><?php echo $resumo; ?></textarea>
                                      </div>
                                    </div>

                                    <div class="form-group">
                                      <label for="texto" class="col-lg-2 control-label">Texto</label>
                                      <div class="col-lg-10">
                                        <textarea class="form-control" id="summernote2" name="content2" placeholder="Texto"><?php echo $texto; ?></textarea>
                                      </div>
                                    </div>
                                    
                                   
                                    <div class="form-group">
                                      <div class="col-lg-offset-2 col-lg-10">
                                        <input type="hidden" id="imagem" name="imagem" value="<?php echo $img; ?>">
                                        <input type="hidden" id="id_md5" name="id_md5" value="<?php echo $id_md5; ?>">
                                        <input type="submit" class="btn btn-info" value="Editar"/>
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <div class="col-lg-offset-2 col-lg-10" id="result_config">
                                             <?php  
                                              if($error){
                                                  echo $error;
                                              }
                                             ?>                                   
                                      </div>
                                    </div>
                                  </form>
                    <?php

                            }elseif($imagens){ 

                                
                        ?>
                                <a href="<?php echo base_url('painel/noticias'); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                <a href="<?php echo base_url('painel/noticias/cad_imagem/'.$id_md5); ?>" class="btn btn-success pull-right">Cadastrar nova imagem</a>
                                <h1>Gerenciar Imagens da Notícia </h1>
                                <hr />
                                <div class="row" class="boxImg">
                                  <?php
                                    if($imagensNoticia){
                                        $aux = 0;
                                        foreach ($imagensNoticia as $value) { 
                                          
                                          ?>
                                        
                                          <div class="col-xs-4" style="padding: 10px;">
                                            <a href="#" class="thumbnail" onclick="excluirImg('<?php echo $value->id; ?>','<?php echo $id_md5;?>');">
                                              <img src="<?php echo base_url('assets/uploads/noticias/'.$id_md5.'/'.$value->img); ?>">
                                            </a>
                                          </div> 
                                                      
                                <?php   }
                                    }else{
                                      echo '<div class="col-xs-10" style="padding: 10px;"><h3>Nenhuma foto cadastrada para esta notícia</h3></div>';
                                    }
                                  ?>
                                </div>
                    <?php

                            }elseif($imagensCad){ 

                                
                        ?>
                                <a href="<?php echo base_url('painel/noticias/imagens/'.$id_md5); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                <h1>Cadastrar nova imagem </h1>
                                <hr />
                                <div class="row">
                                  <form class="form-horizontal" action="<?php echo base_url('painel/cad_imagem'); ?>" role="form" id="form_cad_img" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
                                    <div class="form-group">
                                        <label for="userfile" class="col-lg-2 control-label">Nova imagem</label> 
                                        <div class="col-lg-10">
                                          <input type="file" id="userfile" name="userfile">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                      <div class="col-lg-offset-2 col-lg-10">
                                        <input type="hidden" id="id_md5" name="id_md5" value="<?php echo $id_md5; ?>"/>
                                        <input type="submit" class="btn btn-success" value="Cadastrar"/>
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <div class="col-lg-offset-2 col-lg-10" id="result_config">
                                             <?php  
                                              if($error){
                                                  echo $error;
                                              }
                                             ?>                                   
                                      </div>
                                    </div>

                                  </form>

                                </div>
                    <?php

                            }else{
                     ?>
                                <a href="<?php echo base_url('painel/home'); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                <hr />
                                
                                <a href="<?php echo base_url('painel/noticias/novo'); ?>" class="btn btn-success pull-right">Cadastrar nova Notícia</a>
                                <h1>Listagem de Notícias</h1>
                                <div class="clearfix"></div>
                                
                                <hr />
                                <?php if($noticias){ ?>
                                    <table class="table table-striped">
                                        <thead>
                                          <tr>
                                            <th>#</th>
                                            <th>Imagem</th>
                                            <th>Título</th>
                                            <th>Status</th>
                                            <th>Destaque</th>
                                            <th>Data de cadastro</th>
                                            <th class="text-center" colspan="3">Ações</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                        <?php                        
                                        foreach ($noticias as $key) {  
                                            $status = $key->status;
                                            $destaque = $key->destaque;

                                            if($status == 'S'){
                                                $status = 'Ativo';
                                            }else{
                                                $status = 'Inativo';
                                            } 

                                            if($destaque == 'S'){
                                                $destaque = 'Sim';
                                            }else{
                                                $destaque = 'Não';
                                            }                         
                                          ?>
                                            <tr>
                                                <td><?php echo $key->id; ?></td>
                                                <td><img src="<?php echo base_url('assets/uploads/noticias/'.$key->id_md5.'/'.$key->img); ?>" width="128"></td>
                                                <td><?php echo $key->titulo; ?></td>
                                                <td><?php echo $status; ?></td>
                                                <td><?php echo $destaque; ?></td>
                                                <td><?php echo $key->data_cad; ?></td>
                                                <td class="text-center"><a href="<?php echo base_url('painel/noticias/imagens/'.$key->id_md5); ?>"><img src="<?php echo base_url('assets/painel/images/icone_imagens.png'); ?>"></a></td>
                                                <td class="text-center"><a href="<?php echo base_url('painel/noticias/editar/'.$key->id_md5); ?>"><img src="<?php echo base_url('assets/painel/images/icone_editar.png'); ?>"></a></td>
                                                <td class="text-center"><a href="javascript:void(0);" onclick="excluir('<?php echo $key->id_md5; ?>')"><img src="<?php echo base_url('assets/painel/images/icone_deletar.png'); ?>"></a></td>
                                              </tr>
                                          <?php                           
                                        }
                                       ?>                             
                                          
                                        </tbody>
                                    </table>

                        <?php   }else{ ?>
                                  <h4>Nenhuma notícia cadastrada</h4>
                        <?php   }
                            }
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
          $(document).ready(function() {
            $('#summernote').summernote({
              height: 300,   
              focus: false    
            });
            var sHTML = $('#summernote').code();

            $('#summernote2').summernote({
              height: 300,   
              focus: false   
            });
            var sHTML = $('#summernote2').code();
        });
          
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