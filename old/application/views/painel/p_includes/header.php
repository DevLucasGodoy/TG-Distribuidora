<?php 
$segs = $this->uri->segment_array();
foreach ($segs as $segment)
{
    //echo $segment;
    if($segment == 'home'){
        $classe0 = '';
        $classe1 = '';
        $classe2 = '';
        $classe3 = '';
        $classe4 = '';
        $classe5 = '';
        $classe6 = '';
        $classe7 = '';
    }elseif($segment == 'banners'){
        $classe0 = 'active';
        $classe1 = '';
        $classe2 = '';
        $classe3 = '';
        $classe4 = '';
        $classe5 = '';
        $classe6 = '';
        $classe7 = '';
    }elseif($segment == 'empresa'){
        $classe0 = '';
        $classe1 = 'active';
        $classe2 = '';
        $classe3 = '';
        $classe4 = '';
        $classe5 = '';
        $classe6 = '';
        $classe7 = '';
    }elseif($segment == 'produtos'){
        $classe0 = '';
        $classe1 = '';
        $classe2 = 'active';
        $classe3 = '';
        $classe4 = '';
        $classe5 = '';
        $classe6 = '';
        $classe7 = '';
    }elseif($segment == 'newsletter'){
        $classe0 = '';
        $classe1 = '';
        $classe2 = '';
        $classe3 = 'active';
        $classe4 = '';
        $classe5 = '';
        $classe6 = '';
        $classe7 = '';
    }elseif($segment == 'noticias'){
        $classe0 = '';
        $classe1 = '';
        $classe2 = '';
        $classe3 = '';
        $classe4 = 'active';
        $classe5 = '';
        $classe6 = '';
        $classe7 = '';
    }elseif($segment == 'contato'){
        $classe0 = '';
        $classe1 = '';
        $classe2 = '';
        $classe3 = '';
        $classe4 = '';
        $classe5 = 'active';
        $classe6 = '';
        $classe7 = '';
    }elseif($segment == 'publicidade'){
        $classe0 = '';
        $classe1 = '';
        $classe2 = '';
        $classe3 = '';
        $classe4 = '';
        $classe5 = '';
        $classe6 = '';
        $classe7 = 'active';
    }else{      
        $classe0 = '';
        $classe1 = '';
        $classe2 = '';
        $classe3 = '';
        $classe4 = '';
        $classe5 = '';
        $classe6 = '';
        $classe7 = '';
    }
}
?>
<div class="row">
    <div class="col-xs-12 text-center bg_gradient padding_10 box-radius-bottom">
        <div class="pull-left">
            <a href="<?php echo base_url('painel'); ?>"><img src="<?php echo base_url('assets/painel/images/logo_180.png'); ?>"></a>
        </div>
        <div class="pull-right text-right">
            <nav class="navbar navbar-inverse" role="navigation">

              <!-- Collect the nav links, forms, and other content for toggling -->
              <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav navbar-right">
                  <li class="<?php echo $classe0; ?>"><a href="<?php echo base_url('painel/banners'); ?>">Banners</a></li>
                  <li class="<?php echo $classe2; ?>"><a href="<?php echo base_url('painel/categorias'); ?>">Produtos</a></li>
                  <li class="<?php echo $classe1; ?>"><a href="<?php echo base_url('painel/empresa'); ?>">Empresa</a></li>
                  <li class="<?php echo $classe4; ?>"><a href="<?php echo base_url('painel/noticias'); ?>">Notícias</a></li>
                  <li class="<?php echo $classe5; ?>"><a href="<?php echo base_url('painel/contatos'); ?>">Contatos</a></li>
                  <li class="<?php echo $classe3; ?>"><a href="<?php echo base_url('painel/newsletter'); ?>">Newsletter</a></li>
                  <li><a href="<?php echo base_url('painel/session_destroy'); ?>" class="btn_sair" style="color: #FFF;">SAIR</a></li>
                </ul>
              </div><!-- /.navbar-collapse -->
            </nav>
            <p>Bem vindo <strong><?php echo $this->session->userdata('nome'); ?></strong></p>
        </div>
        <div class="clearfix"></div>
    </div>
</div>