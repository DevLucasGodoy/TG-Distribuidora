<?php
if(isset($dadosSubCat)){
    foreach ($dadosSubCat as $value) {
        $categoria = $this->generico->get_tudo_parametro($value->id_cat_md5,'id_md5','categorias');
        foreach ($categoria as $key) {
            $nomeCategoria = $key->nome;
            $id_cat_md5 = $key->id_md5;
        }
        $nomeSubCategoria = $value->nome;
        $id_sub_md5 = $value->id_md5;
    }
}
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
                    <?php
                    foreach ($dadosSubCat as $dado) { 
                        $nomeCat = $dado->nome;
                    }
                    ?>
                    <div><a href="<?php echo base_url('.'); ?>">Home</a> &nbsp;›&nbsp;<a href="<?php echo base_url('produtos'); ?>">Produtos</a> &nbsp;›&nbsp; <a href="<?php echo base_url('produtos/categoria/'.$id_cat_md5); ?>"><?php echo $nomeCategoria; ?></a> &nbsp;›&nbsp; <?php echo $nomeCat; ?></div>
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
                        <h3>Sub-categorias</h3>
                        <ul class="nav nav-list bs-docs-sidenav">
                         <?php
                            foreach ($categoria as $value) {  
                                $subCategorias = $this->generico->get_tudo_parametro($value->id_md5, 'id_cat_md5', 'subcategorias');

                                foreach ($subCategorias as $row) { ?>
                                    <li class=""><a href="<?php echo base_url('produtos/subcategoria/'.$row->id_md5); ?>"><i class="icon-chevron-right"></i> <?php echo $row->nome; ?></a></li>
                        <?php   }
                                ?>
                                
                        <?php } ?>
                        </ul>
                    </div>
                    <div class="span9">

                            <?php 
                                $cont = 0;
                                foreach ($produtosSubCat as $key) { ?>
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
