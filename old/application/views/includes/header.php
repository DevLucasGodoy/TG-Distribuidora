<?php 


$classe0 = 'current';
$classe1 = '';
$classe2 = '';
$classe3 = '';
$classe4 = '';

$segs = $this->uri->segment_array();
foreach ($segs as $segment)
{
    if($segment == 'empresa'){
        $classe0 = '';
        $classe1 = 'current';
        $classe2 = '';
        $classe3 = '';
        $classe4 = '';
    }elseif($segment == 'produtos'){
        $classe0 = '';
        $classe1 = '';
        $classe2 = 'current';
        $classe3 = '';
        $classe4 = '';
    }elseif($segment == 'noticias'){
        $classe0 = '';
        $classe1 = '';
        $classe2 = '';
        $classe3 = 'current';
        $classe4 = '';
    }elseif($segment == 'contato'){
        $classe0 = '';
        $classe1 = '';
        $classe2 = '';
        $classe3 = '';
        $classe4 = 'current';
    }
}
?>
<!--top menu-->
<section id="top-menu">
    <div class="container">
        <div class="row">
         </div>
    </div>
</section>

<!--header-->
<header id="header"><meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
    <div class="container">
        <div class="row header-top">
            <div class="span5 logo">
                <a class="logo-img" href="<?php echo base_url('.'); ?>" title="responsive template"><img src="<?php echo base_url('assets/geral/images/logo.png'); ?>" alt="Tabulate"></a>
                
            </div>
            <div class="span7 social-container" >
                <p class="phone hidden-phone"> Fone: (67) 3032-3090 / (67) 3021-3150</p>
                <div class="top-social">
                    <a data-original-title="Facebook" rel="tooltip" data-placement="top" class="facebook"
                       href="https://www.facebook.com/tgdistribuidora/"></a>


                </div>
            </div>
        </div>
        <div class="row header-nav">
           <div class="span12">
                <nav id="menu" class="clearfix">
                    <ul>
                        <li class="<?php echo $classe0; ?>"><a href="<?php echo base_url('.'); ?>"><span class="name">Home</span></a></li>
                        <li class="<?php echo $classe1; ?>"><a href="<?php echo base_url('empresa'); ?>"><span class="name">Empresa</span></a></li>
                        <li class="<?php echo $classe2; ?>"><a href="<?php echo base_url('produtos'); ?>"><span class="name">Produtos</span></a></li>
                        <li class="<?php echo $classe3; ?>"><a href="<?php echo base_url('noticias'); ?>"><span class="name">Noticias</span></a></li>
                        <li class="<?php echo $classe4; ?>"><a href="<?php echo base_url('contato'); ?>"><span class="name">Fale conosco</span></a></li>
                    </ul>
                </nav>
               <form action="<?php echo base_url('produtos/busca') ?>" id="form_busca" method="post" class="top-search pull-right">
                   <input type="text" id="busca" name="busca" placeholder="Informe o nome ou o codigo do produto" class="span3">
                   <button type="submit" class="btn"><i class="icon-search-form"></i></button>
               </form>
            </div>
        </div>
    </div>
</header>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-50371103-1', 'tgdistribuidora.com.br');
  ga('send', 'pageview');

</script>
