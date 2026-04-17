<?php
    
    foreach ($empresa as $emp) {
        $tituloEmp = $emp->titulo;
        $textoEmp = $emp->texto;
        $statusEmp = $emp->status;
        $bannerEmp = $emp->banner;
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

        <?php
            if($statusEmp == 'S'){ ?>
                <div class="row">
                    <div class="span12">                
                            <h3 class="widget-title"><?php echo $tituloEmp; ?></h3>
                    </div>
                </div>
                
                <div class="row">
                    <aside id="sidebar" class="pull-left span4">
                        <section class="popular-posts">
                            <div class="media">

                                <img class="media-object"  src="<?php echo base_url('assets/uploads/empresa/'.$bannerEmp); ?>">
                                    <span class="frame-overlay"></span>
                            
                            </div>
                            
                        </section>
                        
                    </aside>
                    <section id="page" class="pull-right span8">
                        <div class="row">
                            <div class="span8">
                                
                                <blockquote>
                                    <p style="text-align: justify;">
                                        <?php echo $textoEmp; ?>
                                    </p>
                                    <small>TG Distribuidora</small>
                                </blockquote>
                            </div>
                        </div>
                        
                    </section>

                </div>
                <hr />
                <div class="row">
                    <div class="span12">
                        <section>
                            <div id="latestwork-sidebar" class="carousel slide">
                                <div class="carousel-inner">
                                 <?php
                                 $cont = 0;
                                    foreach ($imagensEmpresa as $img) { 
                                        if($cont == 0){ $active = 'active'; }else{ $active = ''; }
                                        $cont = $cont + 1;
                                         ?>
                                        <div class="item <?php echo $active; ?>"><img alt="" src="<?php echo base_url('assets/uploads/empresa/fotos/'.$img->img); ?>" alt="photo"></div>
                        <?php
                                    }
                                ?>
                                </div>
                                <a class="carousel-control left" href="#latestwork-sidebar" data-slide="prev"></a>
                                <a class="carousel-control right" href="#latestwork-sidebar" data-slide="next"></a>
                            </div>
                            
                        </section>
                    </div>
                </div>
                
    <?php   }else{ ?>
                <div class="row">
                    <div class="span12">
                    <h1>Página em construção</h1>
                    </div>
                </div>
    <?php
            }
    ?>
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
                <script type="text/javascript">
                        $(document).ready(function(){
                            $('.carousel').carousel({
                                interval: 5000
                            })
                        });
                    </script>
</body>
</html>
