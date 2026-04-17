<?php
if(isset($dadosProduto)){
    foreach ($dadosProduto as $value) {
        $nomeProduto = $value->nome;

        $categoria = $this->generico->get_tudo_parametro($value->id_cat_md5,'id_md5','categorias');
        $subcategoria = $this->generico->get_tudo_parametro($value->id_sub_md5,'id_md5','subcategorias');

        foreach ($categoria as $key) {
            $nomeCategoria = $key->nome;
            $id_cat_md5 = $key->id_md5;
        }

        foreach ($subcategoria as $row) {
            $nomeSubCategoria = $row->nome;
            $id_sub_md5 = $row->id_md5;
        }
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
                    foreach ($dadosProduto as $dado) { 
                        $nomeCat = $dado->nome;
                    }
                    ?>
                    <h1> <?php echo $nomeProduto; ?></h1>
                    <div><a href="<?php echo base_url('.'); ?>">Home</a> &nbsp;›&nbsp;<a href="<?php echo base_url('produtos'); ?>">Produtos</a> &nbsp;›&nbsp; <a href="<?php echo base_url('produtos/categoria/'.$id_cat_md5); ?>"><?php echo $nomeCategoria; ?></a> <?php if($subcategoria){ ?> &nbsp;›&nbsp; <a href="<?php echo base_url('produtos/subcategoria/'.$id_sub_md5); ?>"><?php echo $nomeSubCategoria; ?></a> <?php } ?> &nbsp;›&nbsp; <?php echo $nomeCat; ?></div>
                </div>                
            </div>
        </div>
    </div>
</section>

<!--container-->
<section id="container">
    <div class="container">


            <?php
            if($dadosProduto){ 
                foreach ($dadosProduto as $prod) { 
                    $query2 = $this->db->query("SELECT * FROM relacionados WHERE id_pai_md5 = '".$prod->id_md5."'");  
                    $produtosRelacionados = $query2->result();
                    
                    $marca = $this->generico->get_tudo_parametro($prod->id_marca_md5, 'id_md5', 'marcas');
                    foreach ($marca as $mc) {
                        $nomeMarca = $mc->nome;
                    }
                    ?>

                    <div class="row">
                        <div class="span2">

                            <div id="mainslider" class="flexslider ps-slider">                                
                                <div class="flex-viewport" style="overflow: hidden; position: relative; ">
                                    <ul class="slides" >
                                        <li style="float: left; display: block;" class="" id="box_img">
                                            <img src="<?php echo base_url('assets/uploads/produtos/'.$prod->id_md5.'/'.$prod->img); ?>" alt="">
                                        </li>                                        
                                    </ul>
                                </div>
                            </div>

                            

                                

                        </div>
                        <div class="span6">
                            <div class="ps-description">
                                <?php
                                $imgs = $this->generico->get_tudo_parametro($prod->id_md5,'id_prod_md5','img_produtos');
                                ?>
                                <div class="bs-example bs-example-tabs">
                                  <ul id="myTab" class="nav nav-tabs">
                                    <li class="active"><a href="#info" data-toggle="tab">Informações</a></li>
                                    <li class=""><a href="#dadosTec" data-toggle="tab">Dados Técnicos</a></li>
                                    <?php
                                    if(!empty($imgs)){ ?>
                                        <li class=""><a href="#imgs" data-toggle="tab">Imagens</a></li>
                                    <?php
                                    }
                                    ?>
                                    
                                  </ul>
                                  <div id="myTabContent" class="tab-content">
                                    <div class="tab-pane fade active in" id="info">                                      
                                        <h4><?php echo $prod->nome; ?></h4>
                                        <p>Código: <strong><?php echo $prod->codigo; ?></strong><br />
                                        Marca: <strong><?php echo $nomeMarca; ?></strong><br />
                                        <i><?php echo $prod->resumo; ?></i></p>
                                        <p>Descrição:<br /> <?php echo htmlspecialchars_decode($prod->descricao); ?></p>
                                    </div>
                                    <div class="tab-pane fade" id="dadosTec">
                                      <p><i><?php echo htmlspecialchars_decode($prod->dados_tecnicos); ?></i></p>
                                    </div>
                                    <div class="tab-pane fade" id="imgs">
                                        <div id="our-projects" class="carousel bttop">
                                            <div class="carousel-wrapper">
                                                <ul class="portfolio" style="width: 1810px; display: block; margin-left: 0px;">
                                                <?php 
                                                    foreach ($imgs as $foto) { ?>
                                                        <li style="margin-right: 30px; width: 270px;">
                                                            <article>
                                                                <div class="inner-image">
                                                                    <a href="#" onclick="troca('<?php echo $foto->id; ?>');" >
                                                                        <img src="<?php echo base_url('assets/uploads/produtos/'.$foto->id_prod_md5.'/'.$foto->img); ?>" >
                                                                        <span class="frame-overlay"></span>
                                                                    </a>
                                                                </div>
                                                                
                                                            </article>
                                                        </li>

                                                    <?php  }
                                                            ?>
                                                </ul>
                                            </div>
                                        <div class="es-nav"><span class="es-nav-prev" style="opacity: 0.5;">Previous</span><span class="es-nav-next" style="opacity: 1;">Next</span></div></div>
                                    </div>
                                  </div>
                                </div>
                                
                            </div>
                        </div>

                        
                            <ul class="">
                                <?php
                                if(!empty($produtosRelacionados)){
                                    echo '<div class="span4" style="height: 400px; overflow: auto;"><h3>Produtos relacionados</h3>';
                                    foreach ($produtosRelacionados as $row) { 
                                        $relacionadoDet = $this->generico->get_tudo_parametro($row->id_filho_md5,'id_md5','produtos');
                                        foreach ($relacionadoDet as $key) {
                                          $rel_id_md5 = $key->id_md5;
                                          $rel_img = $key->img;
                                          $rel_nome = $key->nome;
                                          $rel_codigo = $key->codigo;   
                                          $url_produto = $key->url_produto;                                     
                                        ?>
                                        <li class="span3">
                                            <div class="service-box">
                                                <a href="<?php echo base_url('produtos/detalhes/'.$url_produto); ?>"><?php echo $key->nome; ?></a>
                                                Código: <strong><small><?php echo $rel_codigo; ?></small></strong>
                                                <a href="<?php echo base_url('produtos/detalhes/'.$url_produto); ?>"><img src="<?php echo base_url('assets/uploads/produtos/'.$rel_id_md5.'/'.$rel_img); ?>" title="<?php echo $rel_img; ?>"  alt="<?php echo $rel_img; ?>"></a>
                                            </div>
                                        </li>
                                        <?php
                                        }
                                   }
                                echo '</div>';
                                }
                            ?>
                            </ul>
                        </div>
                   
                <?php   }

                }else{
                    echo '<h2>Nenhum produto cadastrado</h2>';
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

                function troca(ci){

                    var base_url = "<?php echo base_url(''); ?>";

                    $("#box_img").html("Carregando...");
                     $.post(base_url+"produtos/buscaImg",{
                        ci: ci
                        
                    }, function(busca){
                                               
                        $.each(busca, function(i, item) {
                            img = "<div class='inner-image'>";
                            img += "<a href='"+base_url+"assets/uploads/produtos/"+busca[i].id_prod_md5+"/"+busca[i].img+"' data-rel='prettyPhoto' rel='prettyPhoto'>";
                            img += "<img src='"+base_url+"assets/uploads/produtos/"+busca[i].id_prod_md5+"/"+busca[i].img+"' alt=''>";
                            img += "<span class='frame-overlay'></span></a>"; 
                            img += "</div>";          
                                   

                        });

                        $("#box_img").html("");
                        $("#box_img").html(img);


                    }, "json");

                   
                }
            </script>

    
    
</body>
</html>
