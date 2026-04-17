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
                              if(!$categorias){ ?>
                                <h4>Você ainda não cadastrou nenhuma categoria e sub-categoria. Para cadastrar um produto, é necessário ao menos ter uma categoria e uma sub-categoria cadastrada.</h4>
                                <a href="<?php echo base_url('painel/categorias'); ?>" class="btn btn-primary">Clique aqui para cadastrar uma categoria</a> 
                        <?php }elseif(!$subcategorias){ ?>
                                <h4>Você ainda não cadastrou nenhuma sub-categoria. Para cadastrar um produto, é necessário ao menos ter uma uma sub-categoria cadastrada.</h4>
                                <a href="<?php echo base_url('painel/subcategorias'); ?>" class="btn btn-primary">Clique aqui para cadastrar uma sub-categoria</a> 
                        <?php }else{
                                ?>
                                  <a href="<?php echo base_url('painel/gerenciar_produtos/'.$id_cat_md5.'/'.$id_sub_md5); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                  <h1>Cadastrar novo produto</h1>
                                  <hr />
                                  <form class="form-horizontal" action="<?php echo base_url('painel/cadastra_produto'); ?>" role="form" id="form_config" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
                                    
                                    <div class="form-group">
                                      <div class="col-lg-offset-2 col-lg-10" id="result_config">
                                             <?php  
                                              if($error){
                                                  echo $error;
                                              }
                                             ?>                                   
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <label for="codigo" class="col-lg-2 control-label">Código</label>
                                      <div class="col-lg-10">
                                        <input type="text" class="form-control" id="codigo" name="codigo" placeholder="Código">
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <label for="nome" class="col-lg-2 control-label">Nome</label>
                                      <div class="col-lg-10">
                                        <input type="text" class="form-control" id="nome" name="nome" placeholder="Nome">
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <label for="nome" class="col-lg-2 control-label">Categoria</label>
                                      <div class="col-lg-10">
                                        <?php
                                        $cat = $this->generico->get_tudo_parametro_row($id_cat_md5, 'id_md5', 'categorias');
                                        echo '<strong><u>'.$cat->nome.'</u></strong>';
                                        ?>
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <label for="nome" class="col-lg-2 control-label">Sub-Categoria</label>
                                      <div class="col-lg-10">
                                        <?php
                                        $cat = $this->generico->get_tudo_parametro_row($id_sub_md5, 'id_md5', 'subcategorias');
                                        echo '<strong><u>'.$cat->nome.'</u></strong>';
                                        ?>
                                      </div>
                                    </div>

                                    <?php 
                                      if($marcas){ ?>
                                        <div class="form-group">
                                          <label for="marca" class="col-lg-2 control-label">Marca</label>
                                          <div class="col-lg-6">
                                            <div id="marca_up" class="display-none"><img src="<?php echo base_url('assets/painel/images/icone_load.gif'); ?>"></div>
                                            <select id="marca" name="marca" class="form-control">
                                                <option>Selecione</option>
                                                <?php
                                                  foreach ($marcas as $row) { ?>
                                                    <option value="<?php echo $row->id_md5; ?>"><?php echo $row->nome; ?></option>
                                          <?php   }
                                                ?>                                              
                                            </select>
                                          </div>
                                          <div class="col-lg-1"><a href="#" onclick="update();"><img src="<?php echo base_url('assets/painel/images/icone_atualizar.png'); ?>"></a></div>
                                          <div class="col-lg-2"><a href="javascript:abrir('<?php echo base_url('painel/marcas'); ?>');" class="btn btn-link">Gerenciar marcas</a></div>
                                        </div>
                               <?php  }else{ ?>
                                          <div class="form-group">
                                          <label for="marca" class="col-lg-2 control-label">Marca</label>
                                          <div class="col-lg-7">
                                            <select id="marca" name="marca" class="form-control">
                                                <option>Nenhuma marca cadastrada</option>
                                            </select>
                                          </div>
                                          <div class="col-lg-1"><a href="#" onclick="update();"><img src="<?php echo base_url('assets/painel/images/icone_atualizar.png'); ?>"></a></div>
                                          <div class="col-lg-2"><a href="javascript:abrir('<?php echo base_url('painel/marcas'); ?>');" class="btn btn-link">Gerenciar marcas</a></div>
                                        </div>
                               <?php  }
                                    ?>


                                    <div class="form-group">
                                      <label for="descricao" class="col-lg-2 control-label">Descrição</label>
                                      <div class="col-lg-10">
                                        <textarea class="form-control" id="summernote2" name="content2" placeholder="Descrição"></textarea>
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
                                      <label for="dados_tecnicos" class="col-lg-2 control-label">Dados Técnicos</label>
                                      <div class="col-lg-10">
                                        <textarea class="form-control" id="summernote3" name="content3" placeholder="Dados Técnicos"></textarea>
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <div class="col-lg-offset-2 col-lg-10">
                                        <input type="hidden" id="categoria" name="categoria" value="<?php echo $id_cat_md5; ?>">
                                        <input type="hidden" id="subcategoria" name="subcategoria" value="<?php echo $id_sub_md5; ?>">
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
                            }
                              }elseif($editar){ 

                                foreach ($produtoDet as $row) {
                                    $id_md5 = $row->id_md5;
                                    $codigo = $row->codigo;
                                    $nome = $row->nome;
                                    $img = $row->img;
                                    $descricao = $row->descricao;
                                    $status = $row->status;
                                    $destaque = $row->destaque;
                                    $dados_tecnicos = $row->dados_tecnicos;

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

                                    $id_marca_md5 = $row->id_marca_md5;
                                    $id_sub_md5 = $row->id_sub_md5;
                                    $id_cat_md5 = $row->id_cat_md5;
                                }
                        ?>
                                  <a href="<?php echo base_url('painel/gerenciar_produtos/'.$id_cat_md5.'/'.$id_sub_md5); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                <h1>Editar Produto</h1>
                                <hr />
                                <form class="form-horizontal" action="<?php echo base_url('painel/altera_produto'); ?>" role="form" id="form_config" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
                                    <div class="form-group">
                                      <label for="codigo" class="col-lg-2 control-label">Código</label>
                                      <div class="col-lg-10">
                                        <input type="text" class="form-control" id="codigo" name="codigo" placeholder="Código" value="<?php echo $codigo; ?>">
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <label for="nome" class="col-lg-2 control-label">Nome</label>
                                      <div class="col-lg-10">
                                        <input type="text" class="form-control" id="nome" name="nome" placeholder="Nome" value="<?php echo $nome; ?>">
                                      </div>
                                    </div>

                                    <?php 
                                      if($marcas){ ?>
                                        <div class="form-group">
                                          <label for="marca" class="col-lg-2 control-label">Marca</label>
                                          <div class="col-lg-6">
                                            <div id="marca_up" class="display-none"><img src="<?php echo base_url('assets/painel/images/icone_load.gif'); ?>"></div>
                                            <select id="marca" name="marca" class="form-control">
                                                <option>Selecione</option>
                                                <?php
                                                  foreach ($marcas as $row) { 
                                                      if($id_marca_md5 == $row->id_md5){ ?>
                                                          <option value="<?php echo $row->id_md5; ?>" selected="selected"><?php echo $row->nome; ?></option>
                                                <?php }else{ ?>
                                                          <option value="<?php echo $row->id_md5; ?>"><?php echo $row->nome; ?></option>
                                                <?php }
                                                    ?>
                                                    
                                          <?php   }
                                                ?>                                              
                                            </select>
                                          </div>
                                          <div class="col-lg-1"><a href="#" onclick="update();"><img src="<?php echo base_url('assets/painel/images/icone_atualizar.png'); ?>"></a></div>
                                          <div class="col-lg-2"><a href="javascript:abrir('<?php echo base_url('painel/marcas'); ?>');" class="btn btn-link">Gerenciar marcas</a></div>
                                        </div>
                               <?php  }else{ ?>
                                          <div class="form-group">
                                          <label for="marca" class="col-lg-2 control-label">Marca</label>
                                          <div class="col-lg-7">
                                            <select id="marca" name="marca" class="form-control">
                                                <option>Nenhuma marca cadastrada</option>
                                            </select>
                                          </div>
                                          <div class="col-lg-1"><a href="#" onclick="update();"><img src="<?php echo base_url('assets/painel/images/icone_atualizar.png'); ?>"></a></div>
                                          <div class="col-lg-2"><a href="javascript:abrir('<?php echo base_url('painel/marcas'); ?>');" class="btn btn-link">Gerenciar marcas</a></div>
                                        </div>
                               <?php  }
                                    ?>


                                    <div class="form-group">
                                      <label for="descricao" class="col-lg-2 control-label">Descrição</label>
                                      <div class="col-lg-10">
                                        <textarea class="form-control" id="summernote" name="content" placeholder="Descrição"><?php echo $descricao; ?></textarea>
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <label for="userfile" class="col-lg-2 control-label">Imagem Principal</label>                                      
                                      <div class="col-lg-2">
                                        <img src="<?php echo base_url('assets/uploads/produtos/'.$id_md5.'/'.$img); ?>" width="128">
                                      </div>
                                      <div class="col-lg-8">
                                        <input type="file" id="userfile" name="userfile">
                                      </div>
                                    </div>
                                    <?php 
                                      if($categorias){ ?>
                                        <div class="form-group">
                                          <label for="categoria" class="col-lg-2 control-label">Categoria</label>
                                          <div class="col-lg-10">
                                            <div id="marca_up" class="display-none"><img src="<?php echo base_url('assets/painel/images/icone_load.gif'); ?>"></div>
                                            <select id="categoria" name="categoria" class="form-control">
                                                <option>Selecione</option>
                                                <?php
                                                  foreach ($categorias as $row) { 
                                                      if($id_cat_md5 == $row->id_md5){ ?>
                                                          <option value="<?php echo $row->id_md5; ?>" selected="selected"><?php echo $row->nome; ?></option>
                                                <?php }else{ ?>
                                                          <option value="<?php echo $row->id_md5; ?>"><?php echo $row->nome; ?></option>
                                                <?php }
                                                    ?>
                                                    
                                          <?php   }
                                                ?>                                               
                                            </select>
                                          </div>                                        
                                        </div>
                               <?php  }else{ ?>
                                          <div class="form-group">
                                          <label for="categoria" class="col-lg-2 control-label">Categoria</label>
                                          <div class="col-lg-10">
                                            <select class="form-control" disabled="disabled" readonly>
                                                <option>Nenhuma categoria cadastrada</option>
                                            </select>
                                          </div>                                        
                                        </div>
                               <?php  }
                                    ?>
                                    <div class="form-group">
                                      <label for="subcategoria" class="col-lg-2 control-label">Sub-categoria</label>
                                      <div class="col-lg-10">
                                        <select id="subcategoria" name="subcategoria" class="form-control">
                                          <option>Selecione</option>
                                                <?php
                                                  foreach ($subcategorias as $row) { 
                                                      if($id_sub_md5 == $row->id_md5){ ?>
                                                          <option value="<?php echo $row->id_md5; ?>" selected="selected"><?php echo $row->nome; ?></option>
                                                <?php }else{ ?>
                                                          <option value="<?php echo $row->id_md5; ?>"><?php echo $row->nome; ?></option>
                                                <?php }
                                                    ?>
                                                    
                                          <?php   }
                                                ?> 
                                        </select>
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
                                      <label for="destaque" class="col-lg-2 control-label">Destaque</label>
                                      <div class="col-lg-10">
                                        <select id="destaque" name="destaque" class="form-control">
                                            <option value="S" <?php echo $selectedDest1; ?>>Sim</option>
                                            <option value="N" <?php echo $selectedDest2; ?>>Não</option>
                                        </select>
                                      </div>
                                    </div>

                                    <div class="form-group">
                                      <label for="dados_tecnicos" class="col-lg-2 control-label">Dados Técnicos</label>
                                      <div class="col-lg-10">
                                        <textarea class="form-control" id="summernote4" name="content4" placeholder="Dados Técnicos"><?php echo $dados_tecnicos; ?></textarea>
                                      </div>
                                    </div>
                                    <hr />
                                    <div class="form-group">
                                      <div class="col-lg-offset-1 col-lg-5" >
                                        <h4><u>Produtos à relacionar</u></h4>
                                        <div style="height: 300px; overflow: auto;">
                                        <?php
                                          foreach ($listaProdutos as $value) { 
                                            $verifica = $this->generico->get_tudo_dois_parametros($value->id_md5,'id_filho_md5',$id_md5,'id_pai_md5','relacionados','');
                                            if(!$verifica){
                                            ?>
                                            <div>
                                              <img src="<?php echo base_url('assets/uploads/produtos/'.$value->id_md5.'/'.$value->img); ?>" width="128">
                                              <?php echo $value->nome; ?> <a class="btn btn-success btn-sm" href="javascript:void(0);" onclick="addRelacionado('<?php echo $value->id_md5; ?>','<?php echo $id_md5; ?>');">Adicionar</a> 
                                              <br /><br />
                                            </div>
                                            
                                   <?php    }
                                          }
                                        ?>
                                        </div>
                                      </div>
                                      <div class="col-lg-offset-1 col-lg-5" id="prodRelacionados">
                                        <h4><u>Produtos relacionados</u></h4>
                                        <div style="height: 200px; overflow: auto;">
                                        <?php
                                          if($produtosRelacionados){
                                            foreach ($produtosRelacionados as $value) { 
                                              $relacionadoDet = $this->generico->get_tudo_parametro($value->id_filho_md5,'id_md5','produtos');
                                              foreach ($relacionadoDet as $key) {
                                                $rel_id_md5 = $key->id_md5;
                                                $rel_img = $key->img;
                                                $rel_nome = $key->nome;
                                              }
                                              ?>
                                              <div>
                                                <img src="<?php echo base_url('assets/uploads/produtos/'.$rel_id_md5.'/'.$rel_img); ?>" width="128">
                                                <?php echo $rel_nome; ?> <a class="btn btn-danger btn-sm" href="javascript:void(0);" onclick="delRelacionado('<?php echo $rel_id_md5; ?>','<?php echo $id_md5; ?>');">Remover</a> 
                                                <br /><br />
                                              </div>
                                              
                                     <?php  }
                                          }else{
                                            echo '<h5>Nenhum produto relacionado</h5>';
                                          }
                                        ?>
                                        </div>
                                      </div>
                                    </div>

                                    <hr />
                                    <div class="form-group">
                                      <div class="col-lg-offset-2 col-lg-10">
                                        <input type="hidden" id="id_md5" name="id_md5" value="<?php echo $id_md5; ?>"/>
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

                                foreach ($produtoDet as $row) {
                                    $id_md5 = $row->id_md5;
                                    $nome = $row->nome;
                                    $id_cat_md5 = $row->id_cat_md5;
                                    $id_sub_md5 = $row->id_sub_md5;
                                }
                        ?>
                                  <a href="<?php echo base_url('painel/gerenciar_produtos/'.$id_cat_md5.'/'.$id_sub_md5); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                <a href="<?php echo base_url('painel/produtos/cadImagem/'.$id_md5); ?>" class="btn btn-success pull-right">Cadastrar nova imagem</a>
                                <h1>Gerenciar Imagens do Produto </h1>
                                <h3><?php echo $nome; ?></h3>
                                <hr />
                                <div class="row" class="boxImg">
                                  <?php
                                    if($imagensProd){
                                        $aux = 0;
                                        foreach ($imagensProd as $value) { 
                                          
                                          ?>
                                        
                                          <div class="col-xs-4" style="padding: 10px;">
                                            <a href="#" class="thumbnail" onclick="excluirImg('<?php echo $value->id; ?>','<?php echo $id_md5;?>');">
                                              <img src="<?php echo base_url('assets/uploads/produtos/'.$id_md5.'/'.$value->img); ?>">
                                            </a>
                                          </div> 
                                                      
                                <?php   }
                                    }
                                  ?>
                                </div>
                    <?php

                            }elseif($imagensCad){ 

                                foreach ($produtoDet as $row) {
                                    $id_md5 = $row->id_md5;
                                    $nome = $row->nome;
                                    $id_cat_md5 = $row->id_cat_md5;
                                    $id_sub_md5 = $row->id_sub_md5;
                                }
                        ?>
                                  <a href="<?php echo base_url('painel/gerenciar_produtos/'.$id_cat_md5.'/'.$id_sub_md5); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                <h1>Cadastrar nova imagem </h1>
                                <h3><?php echo $nome; ?></h3>
                                <hr />
                                <div class="row">
                                  <form class="form-horizontal" action="<?php echo base_url('painel/cadastraImgProd'); ?>" role="form" id="form_cad_img" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
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
                                <a href="<?php echo base_url('painel/subcategorias/'.$id_cat_md5); ?>"><img src="<?php echo base_url('assets/painel/images/icone_voltar.png'); ?>"></a>
                                <hr />
                                <a href="<?php echo base_url('painel/produtos/novo/'.$id_cat_md5.'/'.$id_sub_md5); ?>" class="btn btn-success btn-block">Cadastrar novo Produto</a>
                                <h1>Listagem de Produtos</h1>
                                <div class="clearfix"></div>
                                
                                <hr />
                                <?php if($produtos){ ?>
                                    <table class="table table-striped">
                                        <thead>
                                          <tr>
                                            <th>Código</th>
                                            <th>Imagem</th>
                                            <th>Nome</th>
                                            <th>Descrição</th>
                                            <th>Status</th>
                                            <th>Destaque</th>
                                            <th class="text-center" colspan="4">Ações</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                        <?php                        
                                        foreach ($produtos as $key) {  
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
                                                <td><?php echo $key->codigo; ?></td>
                                                <td><img src="<?php echo base_url('assets/uploads/produtos/'.$key->id_md5.'/'.$key->img); ?>" width="72"></td>
                                                <td><?php echo $key->nome; ?></td>
                                                <td><?php echo htmlspecialchars_decode($key->descricao); ?></td>
                                                <td><?php echo $status; ?></td>
                                                <td><?php echo $destaque; ?></td>
                                                <td class="text-center"><a href="<?php echo base_url('painel/produtos/imagens/'.$key->id_md5); ?>"><img src="<?php echo base_url('assets/painel/images/icone_imagens.png'); ?>"></a></td>
                                                <td class="text-center"><a href="<?php echo base_url('painel/produtos/editar/'.$key->id_md5); ?>"><img src="<?php echo base_url('assets/painel/images/icone_editar.png'); ?>"></a></td>
                                                <td class="text-center"><a href="javascript:void(0);" onclick="duplicar('<?php echo $key->id_md5; ?>', '<?php echo $key->id_cat_md5; ?>', '<?php echo $key->id_sub_md5; ?>')"><img src="<?php echo base_url('assets/painel/images/icone_duplicar.png'); ?>"></a></td>
                                                <td class="text-center"><a href="javascript:void(0);" onclick="excluir('<?php echo $key->id_md5; ?>', '<?php echo $key->id_cat_md5; ?>', '<?php echo $key->id_sub_md5; ?>')"><img src="<?php echo base_url('assets/painel/images/icone_deletar.png'); ?>"></a></td>
                                              </tr>
                                          <?php                           
                                        }
                                       ?>                             
                                          
                                        </tbody>
                                    </table>

                        <?php   }else{ ?>
                                  <h4>Nenhum produto cadastrado</h4>
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

          $('#summernote3').summernote({
            height: 300,   
            focus: false   
          });
          var sHTML = $('#summernote3').code();

          $('#summernote4').summernote({
            height: 300,   
            focus: false   
          });
          var sHTML = $('#summernote4').code();
			  });

            $("#form_config").submit(function(){
                $("#result_config").html('');

                if( $("#codigo").val() == "" ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Informe o código!</strong></div>');   
                    $("#codigo").focus();
                    return false;
                }
                if( $("#nome").val() == "" ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Informe o nome!</strong></div>');   
                    $("#nome").focus();
                    return false;
                }
                if( $("#marca").val() == "Selecione" || $("#marca").val() == "" ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Informe a marca!</strong></div>');   
                    $("#marca").focus();
                    return false;
                }
                if( $("#descricao").val() == "" ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Informe uma descrição!</strong></div>');   
                    $("#descricao").focus();
                    return false;
                }
                if( $("#categoria").val() == "Selecione" || $("#categoria").val() == "" ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Informe a categoria!</strong></div>');   
                    $("#categoria").focus();
                    return false;
                }
                if( $("#subcategoria").val() == "Selecione" || $("#subcategoria").val() == "" ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Informe a sub-categoria!</strong></div>');   
                    $("#subcategoria").focus();
                    return false;
                }                
                if( $("#dados_tecnicos").val() == "" ){
                    $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Informe os dados técnicos!</strong></div>');   
                    $("#dados_tecnicos").focus();
                    return false;
                }
                return true;
            });

            function excluir(id, idMd5, idCat){
                var base_url = "<?php echo base_url(); ?>";
                if(confirm('Deseja realmente excluir este produto?')){
                    $.post(base_url+"painel/exclui_produto",{
                       id_md5: id
                    }, function(config){
                       if(config == 'accept'){                    
                          
                           var novaURL = base_url+'painel/gerenciar_produtos/'+idMd5+'/'+idCat;
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

            function duplicar(id, idMd5, idCat){
                var base_url = "<?php echo base_url(); ?>";
                if(confirm('Deseja realmente duplicar este produto?')){
                    $.post(base_url+"painel/produtos/duplicar",{
                       id_md5: id
                    }, function(config){
                       if(config == 'accept'){                    
                          
                           var novaURL = base_url+'painel/gerenciar_produtos/'+idMd5+'/'+idCat;
                           setTimeout(function(){
                               $(window.document.location).attr("href",novaURL);
                             }, 500);
                       }else{
                           $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Ocorreu um erro ao duplicar produto! Tente novamente.</strong></div>');   
                           $("#result_config").fadeIn();
                       }
                    });
                }
            }

            function excluirImg(id, id_prod){
                var base_url = "<?php echo base_url(); ?>";
                if(confirm('Deseja realmente excluir esta imagem?')){
                    $.post(base_url+"painel/exclui_imagem",{
                       id: id
                    }, function(config){
                       if(config == 'accept'){                    
                          
                           var novaURL = base_url+'painel/produtos/imagens/'+id_prod;
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
            function addRelacionado(idFilho, idPai){
              var base_url = "<?php echo base_url(); ?>";

              $.post(base_url+"painel/cadastra_relacionado",{
                  idFilho: idFilho,
                  idPai: idPai
                   
                }, function(config){
                   if(config == "denied"){
                      $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Este produto já está relacionado!</strong></div>');   
                      $("#result_config").fadeIn();
                   }else if(config == "accept"){ 
                       var novaURL = base_url+'painel/produtos/editar/'+idPai;                         
                       setTimeout(function(){
                         $(window.document.location).attr("href",novaURL);
                       }, 500);
                   }else{
                      $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Ocorreu um erro ao adicionar o produto como relacionado!</strong></div>');   
                      $("#result_config").fadeIn();
                   }
                });
            }
             function delRelacionado(idFilho, idPai){
              var base_url = "<?php echo base_url(); ?>";

              $.post(base_url+"painel/exclui_relacionado",{
                  idFilho: idFilho,
                  idPai: idPai
                   
                }, function(config){
                   if(config == "accept"){ 
                       var novaURL = base_url+'painel/produtos/editar/'+idPai;                         
                       setTimeout(function(){
                         $(window.document.location).attr("href",novaURL);
                       }, 500);
                   }else{
                      $("#result_config").html('<div class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Ocorreu um erro ao adicionar o produto como relacionado!</strong></div>');   
                      $("#result_config").fadeIn();
                   }
                });
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