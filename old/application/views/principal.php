<?php

$categorias = $this->generico->get_tudo_order_by('nome', 'ASC', 'categorias');
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

<!--slider-->
<?php 
    if($banners){ ?>
        <section id="slider">
            <div class="container">
                <div class="row">
                    <div class="span12">
                        <div id="mainslider" class="flexslider">
                            <ul class="slides">
                                <?php 
                                    foreach ($banners as $row) { ?>
                                        <li>
                                            <img alt="" src="<?php echo base_url('assets/uploads/banners/'.$row->img); ?>" alt="" />
                                            
                                        </li>
                            <?php   }
                                ?>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
<?php } ?>

<!--container-->
<section id="container">
    <div class="container">
        <div class="row">
      
        <aside id="sidebar" class="pull-left span3">
            
            <section>
                <h3 class="widget-title">Produtos</h3>
                <div class="accordion" id="accordion2">
                    <?php 
                    if($categorias){ 
                        foreach ($categorias as $value) { 
                            $subCategorias = $this->generico->get_tudo_parametro($value->id_md5, 'id_cat_md5', 'subcategorias');
                            ?>
                            <div class="accordion-group">
                                <div class="accordion-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#<?php echo $value->id_md5; ?>">
                                        <i class="icon-plus icon-white"></i>
                                        <?php echo $value->nome; ?>
                                    </a>
                                </div>
                                <?php
                                if($subCategorias){ ?>
                                    <div id="<?php echo $value->id_md5; ?>" class="accordion-body collapse">
                                        <div class="accordion-inner">
                                            <ul class="icons ul-list-2">
                                                <?php 
                                                    foreach ($subCategorias as $key) { ?>
                                                        <li><a href="<?php echo base_url('produtos/subcategoria/'.$key->id_md5); ?>"><?php echo $key->nome; ?></a></li>
                                            <?php   }
                                                ?>
                                            </ul>
                                        </div>
                                    </div>
                         <?php  }
                                ?>
                                
                            </div>
                <?php    }                        
                    }
                    ?>
                </div>
            </section>            

            </aside>
            
            <section class="span9 filtrable clearfix">
                <?php  if($destaques){ 
                                $cont = 0;
                          foreach ($destaques as $row) { ?>
                            <article data-id="id-1" data-type="javascript html" class="span2">
                                <div class="inner-image">
                                    <a href="<?php echo base_url('produtos/detalhes/'.$row->url_produto) ?>" >
                                        <img src="<?php echo base_url('assets/uploads/produtos/'.$row->id_md5.'/'.$row->img); ?>" title="<?php echo $row->nome; ?>" alt="<?php echo $row->nome; ?>" width="400" height="400">
                                        <span class="frame-overlay"></span>
                                    </a>
                                </div>
                                <div class="sliding">
                                    <div class="inner-text">
                                        <span class="title"><a href="<?php echo base_url('produtos/detalhes/'.$row->url_produto) ?>" ><?php echo $row->nome; ?></a></span>
                                    </div>
                                </div>
                            </article>
                <?php     
                                $cont++;
                                if($cont == 4){
                                    echo '<div class="clearfix"></div><br>';
                                    $cont = 0;
                                }
                            } 
                      } ?>
                
            </section>
            
            </div>
            
    </div>
</section>

<?php require_once('includes/meta_footer.php'); ?> 

<?php require_once('includes/footer.php'); ?>

    
    <script type="text/javascript">
                $(document).ready(function(){
                    $('#our-projects').elastislide({
                        imageW : 270,
                        border : 0,
                        minItems : 1,
                        margin : 30
                    });
                });
            </script>
             <script type="text/javascript">
                    $(document).ready(function(){
                        $('#testimonial').elastislide({
                            imageW  : 740,
                            margin  : 30
                        });
                    });
                </script>
</body>
</html>
