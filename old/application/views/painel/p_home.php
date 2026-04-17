<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><?php echo $titulo; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="<?php echo base_url('assets/painel/css/normalize.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('assets/painel/css/bootstrap.css'); ?>" rel="stylesheet"/>
    <link href="<?php echo base_url('assets/painel/css/painel.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('assets/painel/css/bruno_framework.css'); ?>" rel="stylesheet">

    
     <!--[if lt IE 8]>
      <div style=' clear: both; text-align:center; position: relative;'>
          <a href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home?ocid=ie6_countdown_bannercode">
              <img src="http://storage.ie6countdown.com/assets/100/images/banners/warning_bar_0000_us.jpg" border="0" height="42" width="820" alt="You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today." />
          </a>
      </div>
      <![endif]-->

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
       
    </head>
    <body>       
            
        <div class="geral">
            <div class="container">                

                <?php 
                  require_once('p_includes/header.php');
                ?>

                <div class="row">
                    <div class="col-xs-12 text-center box-shadow padding_20 margin_top_30 margin_bottom_30 color_1">
                        <?php 
                          
                          foreach ($modulos as $key) {                           
                            ?>
                              <div class="box-shadow-2 box_painel bg_1 color_2 bold">
                                <?php echo $key->nome; ?><br />
                                <a href="<?php echo base_url($key->link); ?>"><img src="<?php echo base_url('assets/painel/images/icones/'.$key->id.'.png'); ?>"></a>
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
        <script src="<?php echo base_url('assets/geral/js/jquery.js'); ?>"></script>
        <script src="<?php echo base_url('assets/geral/js/bootstrap.js'); ?>"></script>
       
    </body>
</html>