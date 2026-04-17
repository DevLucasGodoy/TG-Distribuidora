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
                            if($editar){ 

                                foreach ($dados as $row) {
                                    $id = $row->id;
                                    $titulo = $row->titulo;
                                    $texto = $row->texto;
                                    $status = $row->status;
                                    $banner = $row->banner;

                                    if($status == 'S'){
                                        $selected1 = 'selected="selected"';
                                        $selected2 = '';
                                    }else{
                                        $selected1 = '';
                                        $selected2 = 'selected="selected"';                                        
                                    }

                                }
                        ?>
                                <a href="<?php echo base_url('painel/home'); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                <h1>A Empresa</h1>
                                <hr />
                                <form class="form-horizontal" action="<?php echo base_url('painel/altera_empresa'); ?>" role="form" id="form_config" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
                                    <div class="form-group">
                                      <label for="titulo" class="col-lg-2 control-label">Título</label>
                                      <div class="col-lg-10">
                                        <input type="text" class="form-control" id="titulo" name="titulo" placeholder="Título" value="<?php echo $titulo; ?>">
                                      </div>
                                    </div>                                    
                                    <div class="form-group">
                                      <label for="texto" class="col-lg-2 control-label">Texto</label>
                                      <div class="col-lg-10">
                                        <textarea class="form-control" id="texto" name="texto" placeholder="Texto"><?php echo $texto; ?></textarea>
                                      </div>
                                    </div>

                                    <div class="form-group">
                                      <label for="userfile" class="col-lg-2 control-label">Bnner</label>                                      
                                      <div class="col-lg-4">
                                        <img src="<?php echo base_url('assets/uploads/empresa/'.$banner); ?>" width="260">
                                      </div>
                                      <div class="col-lg-6">
                                        <input type="file" id="userfile" name="userfile">
                                      </div>
                                    </div>                                    
                                   
                                    <div class="form-group">
                                      <label for="status" class="col-lg-2 control-label">Status</label>
                                      <div class="col-lg-10">
                                        <select id="status" name="status" class="form-control">
                                            <option value="S" <?php echo $selected1; ?>>Ativo</option>
                                            <option value="N" <?php echo $selected2; ?>>Inativo</option>
                                        </select>
                                      </div>
                                    </div>
                                   
                                   
                                    <div class="form-group">
                                      <div class="col-lg-offset-2 col-lg-10">
                                        <input type="hidden" id="img" name="img" value="<?php echo $banner; ?>">
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
                                  <hr />
                    

                                <a href="<?php echo base_url('painel/empresa/cadImagem'); ?>" class="btn btn-success pull-right">Cadastrar nova imagem</a>
                                <div class="clearfix"></div>

                                <div class="row" class="boxImg">
                                  <?php
                                    if($imagens){
                                        $aux = 0;
                                        foreach ($imagens as $value) {                                           
                                          ?>
                                        
                                          <div class="col-xs-4" style="padding: 10px;">
                                            <a href="#" class="thumbnail" onclick="excluirImg('<?php echo $value->id; ?>','<?php echo $value->img; ?>');">
                                              <img src="<?php echo base_url('assets/uploads/empresa/fotos/'.$value->img); ?>">
                                            </a>
                                          </div> 
                                                      
                                <?php   }
                                    }
                                  ?>
                                </div>

                  <?php      }elseif($imagensCad){ 

                        ?>
                                <a href="<?php echo base_url('painel/empresa'); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                <h1>Cadastrar nova imagem </h1>
                                <hr />
                                <div class="row">
                                  <form class="form-horizontal" action="<?php echo base_url('painel/cadastraImgEmpresa'); ?>" role="form" id="form_cad_img" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
                                    <div class="form-group">
                                        <label for="userfile" class="col-lg-2 control-label">Nova imagem</label> 
                                        <div class="col-lg-10">
                                          <input type="file" id="userfile" name="userfile">
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

                                </div>
                    <?php

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

            $("#form_config").submit(function(){
                $("#result_config").html('');

                if( $("#titulo").val() == "" ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Informe o título!</strong></div>');   
                    $("#titulo").focus();
                    return false;
                }
                if( $("#subtitulo").val() == "" ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Informe o sub-título!</strong></div>');   
                    $("#subtitulo").focus();
                    return false;
                }
                if( $("#texto").val() == "" ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Informe o texto!</strong></div>');   
                    $("#texto").focus();
                    return false;
                }
                
                return true;
            });


            function excluirImg(id, img){
                var base_url = "<?php echo base_url(); ?>";
                if(confirm('Deseja realmente excluir esta imagem?')){
                    $.post(base_url+"painel/exclui_imagem_empresa",{
                       id: id,
                       img: img
                    }, function(config){
                       if(config == 'accept'){                    
                          
                           var novaURL = base_url+'painel/empresa';
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