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
                            if($novo){ ?>
                                <a href="<?php echo base_url('painel/banners/'); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                <h1>Cadastrar novo banner</h1>
                                <hr />
                                <form class="form-horizontal" action="<?php echo base_url('painel/cadastra_banner'); ?>" role="form" id="form_config" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
                                  <div class="form-group">
                                    <label for="titulo" class="col-lg-2 control-label">Título</label>
                                    <div class="col-lg-10">
                                      <input type="text" class="form-control" id="titulo" name="titulo" placeholder="Título">
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label for="userfile" class="col-lg-2 control-label">Imagem</label>
                                    <div class="col-lg-10">
                                      <input type="file" id="userfile" name="userfile">
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label for="descricao" class="col-lg-2 control-label">Descrição</label>
                                    <div class="col-lg-10">
                                      <textarea class="form-control" id="descricao" name="descricao" placeholder="Descrição"></textarea>
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
                                

                    <?php    }elseif($editar){ 

                                foreach ($bannerDet as $row) {
                                    $id_md5 = $row->id_md5;
                                    $titulo = $row->titulo;
                                    $img = $row->img;
                                    $descricao = $row->descricao;
                                    $status = $row->status;

                                    if($status == 'S'){
                                        $selected1 = 'selected="selected"';
                                        $selected2 = '';
                                    }else{
                                        $selected1 = '';
                                        $selected2 = 'selected="selected"';                                        
                                    }
                                }
                        ?>
                                <a href="<?php echo base_url('painel/banners/'); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                <h1>Editar Banner</h1>
                                <hr />
                                <form class="form-horizontal" action="<?php echo base_url('painel/edita_banner'); ?>" role="form" id="form_config" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
                                  <div class="form-group">
                                    <label for="titulo" class="col-lg-2 control-label">Título</label>
                                    <div class="col-lg-10">
                                      <input type="text" class="form-control" id="titulo" name="titulo" placeholder="Título" value="<?php echo $titulo; ?>">
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label for="descricao" class="col-lg-2 control-label">Descrição</label>
                                    <div class="col-lg-10">
                                      <textarea class="form-control" id="descricao" name="descricao" placeholder="Descrição"><?php echo $descricao; ?></textarea>
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
                                    <div class="col-lg-offset-2 col-lg-10">
                                      <input type="hidden" name="id_md5" id="id_md5" value="<?php echo $id_md5; ?>">
                                      <input type="submit" class="btn btn-info" value="Editar"/>
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <div class="col-lg-offset-2 col-lg-10" id="result_config">
                                                                              
                                    </div>
                                  </div>
                                </form>
                    <?php

                            }else{
                     ?>
                                <a href="<?php echo base_url('painel/'); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                <a href="<?php echo base_url('painel/banners/novo'); ?>" class="btn btn-success pull-right">Cadastrar novo Banner</a>
                                <h1>Listagem de Banners</h1>
                                <div class="clearfix"></div>
                                
                                <hr />
                                <?php if($banners){ ?>
                                    <table class="table table-striped">
                                        <thead>
                                          <tr>
                                            <th>#</th>
                                            <th>Banner</th>
                                            <th>Título</th>
                                            <th>Descrição</th>
                                            <th>Status</th>
                                            <th class="text-center" colspan="2">Ações</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                        <?php                        
                                        foreach ($banners as $key) {  
                                            $status = $key->status;

                                            if($status == 'S'){
                                                $status = 'Ativo';
                                            }else{
                                                $status = 'Inativo';
                                            }                         
                                          ?>
                                            <tr>
                                                <td><?php echo $key->id; ?></td>
                                                <td><img src="<?php echo base_url('assets/uploads/banners/'.$key->img); ?>" width="128"></td>
                                                <td><?php echo $key->titulo; ?></td>
                                                <td><?php echo $key->descricao; ?></td>
                                                <td><?php echo $status; ?></td>
                                                <td class="text-center"><a href="<?php echo base_url('painel/banners/editar/'.$key->id_md5); ?>"><img src="<?php echo base_url('assets/painel/images/icone_editar.png'); ?>"></a></td>
                                                <td class="text-center"><a href="javascript:void(0);" onclick="excluirBanner('<?php echo $key->id_md5; ?>')"><img src="<?php echo base_url('assets/painel/images/icone_deletar.png'); ?>"></a></td>
                                              </tr>
                                          <?php                           
                                        }
                                       ?>                             
                                          
                                        </tbody>
                                    </table>

                        <?php   }else{ ?>
                                  <h4>Nenhum banner cadastrado</h4>
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

            $("#form_config").submit(function(){
                $("#result_config").html('');

                if( $("#titulo").val() == "" ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Informe o nome!</strong></div>');   
                    $("#titulo").focus();
                    return false;
                }
                if( $("#descricao").val() == "" ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Informe uma descrição!</strong></div>');   
                    $("#descricao").focus();
                    return false;
                }
                
                return true;
            });

            function excluirBanner(id){
                var base_url = "<?php echo base_url(); ?>";
                if(confirm('Deseja realmente excluir este banner?')){
                    $.post(base_url+"painel/exclui_banner",{
                       id_md5: id
                    }, function(config){
                       if(config == 'accept'){                    
                          
                           var novaURL = base_url+'painel/banners';
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

        </script>
        
       
    </body>
</html>