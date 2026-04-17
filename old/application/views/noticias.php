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

<body>

<?php require_once('includes/header.php'); ?>


<!--container-->
<section id="container">
    <div class="container">
        
        <div class="row">
            <section id="page-sidebar" class="span12">
                <?php
                if($noticias || $noticiasDest){ 
                        if($noticiasDest){
                                echo '<h2>Notícias em destaque</h2><hr />';
                                foreach ($noticiasDest as $dest) { ?>
                                    <article class="blog-post">
                                        <div class="row">
                                            <div class="span3">
                                                <div class="post-media">
                                                    <img src="<?php echo base_url('assets/uploads/noticias/'.$dest->id_md5.'/'.$dest->img); ?>" alt="">
                                                </div>
                                            </div>
                                            <div class="span9">
                                                <h3 class="post-title"><a href="<?php echo base_url('noticias/detalhes/'.$dest->id_md5); ?>"><?php echo $dest->titulo; ?></a></h3>
                                                
                                                <div class="post-content">
                                                    <p style="text-align: justify;">
                                                        <?php echo $dest->resumo; ?>
                                                    </p>
                                                    <p><a href="<?php echo base_url('noticias/detalhes/'.$dest->id_md5); ?>" class="btn btn-large btn-welcome"><i class="icon-chevron-right"></i>Continue lendo</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                    <br /><br />
                                    
                        <?php   }
                        } 
                        if($noticias){                        
                                echo '<h2>Notícias</h2><hr />';
                                foreach ($noticias as $value) { ?>
                                    <article class="blog-post">
                                        <div class="row">
                                            <div class="span3">
                                                <div class="post-media">
                                                    <img src="<?php echo base_url('assets/uploads/noticias/'.$value->id_md5.'/'.$value->img); ?>" alt="">
                                                </div>
                                            </div>
                                            <div class="span9">
                                                <h3 class="post-title"><a href="<?php echo base_url('noticias/detalhes/'.$value->id_md5); ?>"><?php echo $value->titulo; ?></a></h3>
                                                
                                                <div class="post-content">
                                                    <p style="text-align: justify;">
                                                        <?php echo $value->resumo; ?>
                                                    </p>
                                                    <p><a href="<?php echo base_url('noticias/detalhes/'.$value->id_md5); ?>" class="btn btn-large btn-welcome"><i class="icon-chevron-right"></i>Continue lendo</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>

                                    <br /><br />
                    <?php       }
                        }
                    }else{ 
                        echo '<h2>Nenhuma notícia cadastrada</h2>';                        
                    }
                    ?>
                
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
