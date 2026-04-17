<?php
foreach ($noticia as $key) {
    $resumo = $key->resumo;
    $img = $key->img;
    $titulo_pg = $key->titulo;
    $sub_titulo = $key->sub_titulo;
    $texto = $key->texto;
    $status = $key->status;
    $destaque = $key->destaque;
    $data_cad = $key->data_cad;
    $id_md5 = $key->id_md5;  
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

<body>

<?php require_once('includes/header.php'); ?>


<!--container-->
<section id="container">
    <div class="container">
        
        <div class="row">
            <section id="page-sidebar" class="span12">
                <?php
                        if($noticia){                        
                        ?>
                            <h2><?php echo $titulo_pg; ?></h2>
                            <article class="blog-post">
                                <div class="row">
                                    <div class="span3">
                                        <div class="post-media">
                                            <img src="<?php echo base_url('assets/uploads/noticias/'.$id_md5.'/'.$img); ?>" alt="">
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <p><strong><?php echo $resumo; ?></strong></p>
                                        
                                        <div class="post-content">
                                            <p style="text-align: justify;">
                                             <?php echo htmlspecialchars_decode($texto); ?>
                                            </p>
                                            
                                        </div>
                                        <div class="clearfix"></div><hr><br>
                                        <div class="row">
                                            <div class="span9">
                                             <?php 
                                                if($img_noticia){ ?>
                                                <div id="our-projects" class="carousel bttop">
                                                    <div class="carousel-wrapper">
                                                        <ul class="portfolio" style="width: 1810px; display: block; margin-left: 0px;">
                                                          
                                                         <?php foreach ($img_noticia as $foto) { ?>
                                                                <li style="margin-right: 30px; width: 270px;">
                                                                    <article>
                                                                        <div class="inner-image">
                                                                            <a href="#" onclick="troca('<?php echo $foto->id; ?>');" >
                                                                                <img src="<?php echo base_url('assets/uploads/noticias/'.$foto->noticia_md5.'/'.$foto->img); ?>" >
                                                                                <span class="frame-overlay"></span>
                                                                            </a>
                                                                        </div>
                                                                        
                                                                    </article>
                                                                </li>

                                                            <?php  }
                                                        ?>
                                                        </ul>
                                                    </div>
                                                    <div class="es-nav"><span class="es-nav-prev" style="opacity: 0.5;">Previous</span><span class="es-nav-next" style="opacity: 1;">Next</span></div>
                                                </div>
                                                <?php }else{ ?>
                                                            <h5>Nenhuma foto cadastrada para esta notícia!</h5>
                                                <?php   } ?>
                                                                    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <br /><br />


                    <?php       
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
