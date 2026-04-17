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

<body data-spy="scroll" data-target=".bs-docs-sidebar">


<?php require_once('includes/header.php'); ?>

<section class="breadcrumbs">
    <div class="container">
        <div class="page-header">
            <div class="row">
                <div class="span8">
                    <div><a href="<?php echo base_url('.'); ?>">Home</a> &nbsp;›&nbsp; Produtos</div>
                </div>                
            </div>
        </div>
    </div>
</section>

<!--container-->
<section id="container">
    <div class="container">

        <section id="container">
            <div class="container">

                <!-- Docs nav
                ================================================== -->
                <div class="row">
                    <div class="span3 bs-docs-sidebar">
                        <h3>Categorias</h3>
                        <ul class="nav nav-list bs-docs-sidenav">
                         <?php
                            foreach ($categorias as $value) {  
                                $qtdCategorias = $this->generico->verifica_dado($value->id_md5, 'id_cat_md5', 'produtos');
                                ?>
                                <li class=""><a href="<?php echo base_url('produtos/categoria/'.$value->id_md5); ?>"><i class="icon-chevron-right"></i> <?php echo $value->nome; ?> (<?php echo $qtdCategorias; ?>)</a></li>
                        <?php } ?>
                        </ul>
                    </div>
                    <div class="span9">
                        <section>

                            <?php 
                                $cont = 0;
                                foreach ($produtos as $key) { ?>
                                <article data-id="id-1" data-type="javascript html" class="span2">
                                    <div class="inner-image">
                                         <a href="<?php echo base_url('produtos/detalhes/'.$key->url_produto) ?>">
                                            <img src="<?php echo base_url('assets/uploads/produtos/'.$key->id_md5.'/'.$key->img); ?>" alt="<?php echo $key->nome; ?>">
                                            <span class="frame-overlay"></span>
                                        </a>
                                    </div>
                                    <div class="sliding">
                                        <div class="inner-text">
                                            <a href="<?php echo base_url('produtos/detalhes/'.$key->url_produto) ?>"><?php echo $key->nome; ?></a><br />
                                            <small>Código: <strong><?php echo $key->codigo; ?></strong></small>
                                        </div>
                                    </div>
                                </article>
                       <?php 
                                $cont++;
                                if($cont == 4){
                                    echo '<div class="clearfix"></div><br>';
                                    $cont = 0;
                                }
                            } ?>
                            

                        </section>
                    </div>
                </div>

            </div>
        </section>            
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
