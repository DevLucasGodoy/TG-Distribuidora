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
                                <a href="<?php echo base_url('painel/categorias/'); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                <h1>Cadastrar nova categoria</h1>
                                <hr />
                                <form class="form-horizontal" action="#" role="form" id="form_config" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
                                  <div class="form-group">
                                    <label for="nome" class="col-lg-2 control-label">Nome</label>
                                    <div class="col-lg-10">
                                      <input type="text" class="form-control" id="nome" name="nome" placeholder="Nome">
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

                                foreach ($categoriaDet as $row) {
                                    $id_md5 = $row->id_md5;
                                    $nome = $row->nome;
                                }
                        ?>
                                <a href="<?php echo base_url('painel/categorias/'); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                <h1>Editar Categoria</h1>
                                <hr />
                                <form class="form-horizontal" action="#" role="form" id="form_config_altera" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
                                  <div class="form-group">
                                    <label for="nome" class="col-lg-2 control-label">Nome</label>
                                    <div class="col-lg-10">
                                      <input type="text" class="form-control" id="nome" name="nome" placeholder="Nome" value="<?php echo $nome; ?>">
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
                                
                                <a href="<?php echo base_url('painel/categorias/novo'); ?>" class="btn btn-success btn-block">Cadastrar Categoria</a>
                                <h1>Categorias</h1>
                                <div class="clearfix"></div>
                                
                                <hr />
                                <?php if($categorias){ ?>
                                    <table class="table table-striped">
                                        <thead>
                                          <tr>
                                            <th>#</th>
                                            <th>Nome</th>
                                            <th></th>
                                            <th class="text-center" colspan="2">Ações</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                        <?php                        
                                        foreach ($categorias as $key) {  
                                                                    
                                          ?>
                                            <tr>
                                                <td><?php echo $key->id; ?></td>
                                                <td><?php echo $key->nome; ?></td>
                                                <td class="text-center"><a href="<?php echo base_url('painel/subcategorias/'.$key->id_md5); ?>" class="btn-link">Gerenciar</a></td>
                                                <td class="text-center"><a href="<?php echo base_url('painel/categorias/editar/'.$key->id_md5); ?>"><img src="<?php echo base_url('assets/painel/images/icone_editar.png'); ?>"></a></td>
                                                <td class="text-center"><a href="javascript:void(0);" onclick="excluir('<?php echo $key->id_md5; ?>')"><img src="<?php echo base_url('assets/painel/images/icone_deletar.png'); ?>"></a></td>
                                              </tr>
                                          <?php                           
                                        }
                                       ?>                             
                                          
                                        </tbody>
                                    </table>
                                    <div id="result_config"></div>

                        <?php   }else{ ?>
                                  <h4>Nenhuma categoria cadastrada</h4>
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
                var base_url = "<?php echo base_url(); ?>";
                $("#result_config").html('');

                if( $("#nome").val() == "" ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Informe o nome!</strong></div>');   
                    $("#nome").focus();
                    return false;
                }

                $.post(base_url+"painel/cadastra_categoria",{
                       nome: $("#nome").val()
                    }, function(config){
                       if(config == 'accept'){                    
                          
                           var novaURL = base_url+'painel/categorias';
                           setTimeout(function(){
                               $(window.document.location).attr("href",novaURL);
                             }, 500);
                return false;
                       }else{
                           $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Ocorreu um erro ao cadastrar!</strong></div>');   
                           $("#result_config").fadeIn();
                       }
                    });
                
                return false;
            });

            $("#form_config_altera").submit(function(){
                var base_url = "<?php echo base_url(); ?>";
                $("#result_config").html('');

                if( $("#nome").val() == "" ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Informe o nome!</strong></div>');   
                    $("#nome").focus();
                    return false;
                }

                $.post(base_url+"painel/edita_categoria",{
                       nome: $("#nome").val(),
                       id_md5: $("#id_md5").val()
                    }, function(config){
                       if(config == 'accept'){                    
                          
                           var novaURL = base_url+'painel/categorias';
                           setTimeout(function(){
                               $(window.document.location).attr("href",novaURL);
                             }, 500);
                return false;
                       }else{
                           $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Ocorreu um erro ao cadastrar!</strong></div>');   
                           $("#result_config").fadeIn();
                       }
                    });
                
                return false;
            });

            function excluir(id){
                var base_url = "<?php echo base_url(); ?>";
                if(confirm('Deseja realmente excluir esta categoria, todas suas sub-categorias e todos seus produtos cadastrados?')){
                    $.post(base_url+"painel/exclui_categoria",{
                       id_md5: id
                    }, function(config){
                       if(config == 'produtos'){
                          $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Impossível excluir esta categoria! Existem produtos cadastrados.</strong></div>');   
                          $("#result_config").fadeIn();
                       }else if(config == 'subcategorias'){
                          $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Impossível excluir esta categoria! Existem sub-categorias cadastradas.</strong></div>');   
                          $("#result_config").fadeIn();                        
                       }else if(config == 'accept'){                    
                          
                           var novaURL = base_url+'painel/categorias';
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