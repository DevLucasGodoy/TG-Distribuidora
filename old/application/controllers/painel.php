<?php if (! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * @property CI_Loader $load
 * @property CI_Session $session
 * @property CI_Input $input
 * @property CI_DB_active_record $db
 * @property CI_URI $uri
 * @property CI_Upload $upload
 * @property CI_Image_lib $image_lib
 * @property Generic_model $generico
 */
class Painel extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('generic_model', 'generico');
    }

    public function index()
    {
        if ($this->session->userdata('admin_logado')) {
            //BUSCA OS MODULOS
            $modulos = $this->generico->get_tudo('modulos');

            $data['modulos'] = $modulos;
            $data['main_content'] = 'painel/p_home';
            $data['titulo'] = 'Painel Administrativo TG distribuidora';
            $this->load->view('includes/template', $data);
        } else {
            $data['main_content'] = 'painel/p_login';
            $data['titulo'] = 'Painel Administrativo TG distribuidora';
            $this->load->view('includes/template', $data);
        }
    }

    public function valida_login()
    {

        $email = trim($this->input->post('email'));
        $senha = trim($this->input->post('senha'));


        if ($email && $senha) {
            $this->db->where('email', $email);
            $query = $this->db->get('users');
            if ($query->num_rows() == 1) {

                // ASSIM QUE LOGAR, ARMAZENA OS DADOS PRINCIPAIS
                $row = $query->row_array();
                $senhaHash = isset($row['senha']) ? $row['senha'] : '';
                $senhaLegadaValida = (md5($senha) === $senhaHash);
                $senhaModernaValida = function_exists('password_verify') && password_verify($senha, $senhaHash);

                if (! $senhaLegadaValida && ! $senhaModernaValida) {
                    echo "refused";
                    return;
                }

                $dados['nome'] = $row['nome'];
                $dados['email'] = $row['email'];
                $dados['senha'] = $row['senha'];
                $dados['id_md5'] = $row['id_md5'];

                $usuario_sessao = array(
                    'nome'  => $dados['nome'],
                    'email' => $dados['email'],
                    'senha' => $dados['senha'],
                    'id_md5' => $dados['id_md5'],
                    'admin_logado' => TRUE
                );

                $this->session->set_userdata($usuario_sessao);

                echo "accept";
            } else {
                echo "refused";
            }
        } else {
            echo "refused";
        }
    }

    public function home()
    {
        if ($this->session->userdata('admin_logado')) {

            //BUSCA OS MODULOS
            $modulos = $this->generico->get_tudo('modulos');

            $data['modulos'] = $modulos;
            $data['main_content'] = 'painel/p_home';
            $data['titulo'] = 'Painel Administrativo TG distribuidora';
            $this->load->view('includes/template', $data);
        } else {

            redirect('painel');;
        }
    }

    public function session_destroy()
    {

        $user_data = $this->session->all_userdata();


        foreach ($user_data as $key => $value) {
            if ($key != 'session_id' && $key != 'ip_address' && $key != 'user_agent' && $key != 'last_activity') {
                $this->session->unset_userdata($key);
            }
        }

        //$data['main_content'] = 'logoff';
        //$this->index();
        redirect('painel');
    }

    /************BANNERS************/
    public function banners()
    {
        if ($this->session->userdata('admin_logado')) {

            $uri = $this->uri->segment('3');
            $data['novo'] = false;
            $data['editar'] = false;
            $data['error'] = "";

            if ($uri == 'novo') {
                $data['novo'] = true;
                $data['main_content'] = 'painel/p_banners';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } elseif ($uri == 'editar') {
                $id_md5 = $this->uri->segment('4');

                $bannerDet = $this->generico->get_tudo_parametro($id_md5, 'id_md5', 'banners');
                if ($bannerDet) {
                    $data['bannerDet'] = $bannerDet;
                } else {
                    $data['bannerDet'] = '';
                }

                $data['editar'] = true;
                $data['main_content'] = 'painel/p_banners';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } else {
                $banners = $this->generico->get_tudo('banners');

                $data['banners'] = $banners;
                $data['main_content'] = 'painel/p_banners';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            }
        } else {

            redirect('painel');;
        }
    }

    public function cadastra_banner()
    {
        if ($this->session->userdata('admin_logado')) {


            if (!is_dir('./assets/uploads/banners/')) {
                $caminho = './assets/uploads';
                $pasta = 'banners';
                mkdir($caminho . '/' . $pasta, 0755);
            }

            $config['upload_path'] = './assets/uploads/banners/';
            $config['allowed_types'] = 'gif|jpg|png';
            $config['overwrite'] = FALSE;
            $config['max_size'] = '5000';

            $this->load->library('upload', $config);
            if (!$this->upload->do_upload()) {

                $data['error'] = $this->upload->display_errors('<p class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>', '</p>');
                $data['novo'] = true;
                $data['main_content'] = 'painel/p_banners';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } else {
                //PEGANDO A EXTENSAO DA IMAGEM
                list($width, $height, $type, $attr) = getimagesize($config['upload_path'] . "/" . $this->upload->file_name);

                $titulo = trim($this->input->post('titulo'));
                $descricao = trim($this->input->post('descricao'));
                $status = $this->input->post('status');
                $img = $this->upload->file_name;

                //redimensionando imagem
                $config['source_image'] = $this->upload->upload_path . $this->upload->file_name;
                $config['maintain_ratio'] = FALSE;
                $config['width']  = '1170';
                $config['height']  = '300';

                $this->load->library('image_lib', $config);

                if (!$this->image_lib->resize()) {

                    $data['error'] = $this->upload->display_errors('<p class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>', '</p>');
                    $data['novo'] = true;
                    $data['main_content'] = 'painel/p_banners';
                    $data['titulo'] = 'Painel Administrativo TG distribuidora';
                    $this->load->view('includes/template', $data);
                } else {

                    $dados = array(
                        'img' => $img,
                        'status' => $status,
                        'titulo' => $titulo,
                        'descricao' => $descricao,
                        'id_md5' => md5($img . date('Y-m-d H:i:s'))
                    );

                    $cadastra = $this->generico->cadastra_dados($dados, 'banners');

                    if ($cadastra) {
                        $banners = $this->generico->get_tudo('banners');

                        $data['novo'] = '';
                        $data['editar'] = '';
                        $data['banners'] = $banners;
                        $data['main_content'] = 'painel/p_banners';
                        $data['titulo'] = 'Painel Administrativo TG distribuidora';
                        $this->load->view('includes/template', $data);
                    }
                }
            }
        } else {

            redirect('/painel/login');;
        }
    }

    public function edita_banner()
    {
        $titulo = trim($this->input->post('titulo'));
        $descricao = trim($this->input->post('descricao'));
        $status = $this->input->post('status');
        $id_md5 = $this->input->post('id_md5');

        if ($titulo && $descricao && $status && $id_md5) {

            $dados = array(
                'titulo' => $titulo,
                'descricao' => $descricao,
                'status' => $status
            );

            $atualiza = $this->generico->do_update($dados, array('id_md5' => $id_md5), 'banners', '');
            $banners = $this->generico->get_tudo('banners');

            $data['novo'] = '';
            $data['editar'] = '';
            $data['banners'] = $banners;
            $data['main_content'] = 'painel/p_banners';
            $data['titulo'] = 'Painel Administrativo TG distribuidora';
            $this->load->view('includes/template', $data);
        }
    }

    public function exclui_banner()
    {
        $id_md5 = $this->input->post('id_md5');

        $dados = array('id_md5' => $id_md5);

        $excluir = $this->generico->do_delete('banners', $dados);
        if ($excluir) {
            echo 'accept';
        } else {
            echo 'refused';
        }
    }

    /************PRODUTOS************/
    public function produtos()
    {
        if ($this->session->userdata('admin_logado')) {

            $uri = $this->uri->segment('3');
            $data['novo'] = false;
            $data['editar'] = false;
            $data['error'] = "";
            $data['imagens'] = false;
            $data['imagensProd'] = false;
            $data['imagensCad'] = false;

            if ($uri == 'novo') {
                $id_cat_md5 = $this->uri->segment('4');
                $id_sub_md5 = $this->uri->segment('5');

                $marcas = $this->generico->get_tudo('marcas');
                $categorias = $this->generico->get_tudo('categorias');
                $subcategorias = $this->generico->get_tudo('subcategorias');

                $data['marcas'] = $marcas;
                $data['categorias'] = $categorias;
                $data['subcategorias'] = $subcategorias;
                $data['id_cat_md5'] = $id_cat_md5;
                $data['id_sub_md5'] = $id_sub_md5;
                $data['novo'] = true;
                $data['main_content'] = 'painel/p_produtos';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } elseif ($uri == 'duplicar') {
                $id_md5 = $this->input->post('id_md5');

                $produtoDet = $this->generico->get_tudo_parametro($id_md5, 'id_md5', 'produtos');

                foreach ($produtoDet as $row) {
                    $id = $row->id;
                    $codigo = $row->codigo;
                    $nome = $row->nome;
                    $url_produto = $row->url_produto;
                    $descricao = $row->descricao;
                    $img = $row->img;
                    $id_md5 = $row->id_md5;
                    $id_marca_md5 = $row->id_marca_md5;
                    $id_sub_md5 = $row->id_sub_md5;
                    $id_cat_md5 = $row->id_cat_md5;
                    $dados_tecnicos = $row->dados_tecnicos;
                    $status = $row->status;
                    $destaque = $row->destaque;
                    $resumo = $row->resumo;
                }

                $id_md5_2 = md5(trim($id_md5) . date('Y-m-d H:i:s'));

                if (!is_dir('./assets/uploads/produtos/' . $id_md5_2)) {
                    $caminho = './assets/uploads/produtos';
                    $pasta = $id_md5_2;
                    mkdir($caminho . '/' . $pasta, 0755);
                    copy('./assets/uploads/produtos/' . $id_md5 . '/' . $img, './assets/uploads/produtos/' . $id_md5_2 . '/' . $img);
                }


                $dados = array(
                    'codigo' => $codigo . '_' . $id,
                    'nome' => $nome,
                    'url_produto' => $url_produto . date('H:i:s'),
                    'id_marca_md5' => $id_marca_md5,
                    'descricao' => $descricao,
                    'img' => $img,
                    'id_cat_md5' => $id_cat_md5,
                    'id_sub_md5' => $id_sub_md5,
                    'status' => $status,
                    'destaque' => $destaque,
                    'dados_tecnicos' => $dados_tecnicos,
                    'id_md5' => $id_md5_2
                );

                $cadastra = $this->generico->cadastra_dados($dados, 'produtos');

                if ($cadastra) {
                    echo 'accept';
                    // redirect('painel/gerenciar_produtos/'.$id_cat_md5.'/'.$id_sub_md5);
                }
            } elseif ($uri == 'editar') {
                $id_md5 = $this->uri->segment('4');

                $produtoDet = $this->generico->get_tudo_parametro($id_md5, 'id_md5', 'produtos');
                if ($produtoDet) {
                    $data['produtoDet'] = $produtoDet;
                } else {
                    $data['produtoDet'] = '';
                }
                foreach ($produtoDet as $row) {
                    $id_cat_md5 = $row->id_cat_md5;
                    $id_sub_md5 = $row->id_sub_md5;
                }

                $marcas = $this->generico->get_tudo('marcas');
                $categorias = $this->generico->get_tudo('categorias');
                $subcategorias = $this->generico->get_tudo_parametro($id_cat_md5, 'id_cat_md5', 'subcategorias');

                $query = $this->db->query("SELECT * FROM produtos WHERE id_md5 <> ?", array($id_md5));
                $listaProdutos = $query->result();

                $query2 = $this->db->query("SELECT * FROM relacionados WHERE id_pai_md5 = ?", array($id_md5));
                $produtosRelacionados = $query2->result();

                $data['id_cat_md5'] = $id_cat_md5;
                $data['id_sub_md5'] = $id_sub_md5;
                $data['marcas'] = $marcas;
                $data['categorias'] = $categorias;
                $data['subcategorias'] = $subcategorias;
                $data['listaProdutos'] = $listaProdutos;
                $data['produtosRelacionados'] = $produtosRelacionados;

                $data['editar'] = true;
                $data['main_content'] = 'painel/p_produtos';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } elseif ($uri == 'imagens') {
                $id_md5 = $this->uri->segment('4');

                $produtoDet = $this->generico->get_tudo_parametro($id_md5, 'id_md5', 'produtos');
                if ($produtoDet) {
                    $data['produtoDet'] = $produtoDet;
                } else {
                    $data['produtoDet'] = '';
                }

                $imagensProd = $this->generico->get_tudo_parametro($id_md5, 'id_prod_md5', 'img_produtos');
                if ($imagensProd) {
                    $data['imagensProd'] = $imagensProd;
                } else {
                    $data['imagensProd'] = '';
                }

                $data['imagens'] = true;
                $data['main_content'] = 'painel/p_produtos';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } elseif ($uri == 'cadImagem') {
                $id_md5 = $this->uri->segment('4');

                $produtoDet = $this->generico->get_tudo_parametro($id_md5, 'id_md5', 'produtos');
                if ($produtoDet) {
                    $data['produtoDet'] = $produtoDet;
                } else {
                    $data['produtoDet'] = '';
                }

                $data['imagensCad'] = true;
                $data['main_content'] = 'painel/p_produtos';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } else {
                redirect('painel/categorias');
                break;

                /*$produtos = $this->generico->get_tudo('produtos');  
                                    
                $data['produtos'] = $produtos;   
                $data['main_content'] = 'painel/p_produtos';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);*/
            }
        } else {

            redirect('painel');;
        }
    }

    /************PRODUTOS************/
    public function gerenciar_produtos()
    {
        if ($this->session->userdata('admin_logado')) {

            $id_cat_md5 = $this->uri->segment('3');
            $id_sub_md5 = $this->uri->segment('4');

            $data['novo'] = false;
            $data['editar'] = false;
            $data['error'] = "";
            $data['imagens'] = false;
            $data['imagensProd'] = false;
            $data['imagensCad'] = false;

            if ($id_cat_md5 && $id_sub_md5) {
                $produtos = $this->generico->get_tudo_dois_parametros($id_cat_md5, 'id_cat_md5', $id_sub_md5, 'id_sub_md5', 'produtos', '');

                $data['produtos'] = $produtos;
                $data['id_cat_md5'] = $id_cat_md5;
                $data['id_sub_md5'] = $id_sub_md5;
                $data['main_content'] = 'painel/p_produtos';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } else {
                redirect('painel');;
            }
        } else {
            redirect('painel');;
        }
    }

    public function cadastra_produto()
    {
        if ($this->session->userdata('admin_logado')) {


            $categoria = $this->input->post('categoria');
            $subcategoria = $this->input->post('subcategoria');

            $id_md5 = md5(trim($this->input->post('codigo')) . date('Y-m-d H:i:s'));

            if (!is_dir('./assets/uploads/produtos/' . $id_md5)) {
                $caminho = './assets/uploads/produtos';
                $pasta = $id_md5;
                mkdir($caminho . '/' . $pasta, 0755);
            }

            $config['upload_path'] = './assets/uploads/produtos/' . $id_md5;
            $config['allowed_types'] = 'gif|jpg|png';
            $config['overwrite'] = FALSE;
            $config['max_size'] = '2000';

            $this->load->library('upload', $config);
            if (!$this->upload->do_upload()) {

                $data['error'] = $this->upload->display_errors('<p class="alert alert-dismissable alert-danger">PRODUTO NÃO CADASTRADO!<br><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>', '</p>');
                $marcas = $this->generico->get_tudo('marcas');
                $categorias = $this->generico->get_tudo('categorias');
                $subcategorias = $this->generico->get_tudo('subcategorias');

                $data['id_cat_md5'] = $categoria;
                $data['id_sub_md5'] = $subcategoria;
                $data['marcas'] = $marcas;
                $data['categorias'] = $categorias;
                $data['subcategorias'] = $subcategorias;
                $data['novo'] = true;
                $data['main_content'] = 'painel/p_produtos';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } else {
                //PEGANDO A EXTENSAO DA IMAGEM
                list($width, $height, $type, $attr) = getimagesize($config['upload_path'] . "/" . $this->upload->file_name);


                //redimensionando imagem
                $config['source_image'] = $this->upload->upload_path . $this->upload->file_name;
                $config['maintain_ratio'] = FALSE;
                $config['width']  = '400';
                $config['height']  = '400';

                $this->load->library('image_lib', $config);

                if (!$this->image_lib->resize()) {
                    $data['error'] = $this->upload->display_errors('<p class="alert alert-dismissable alert-danger">PRODUTO NÃO CADASTRADO!<br><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>', '</p>');
                    $marcas = $this->generico->get_tudo('marcas');
                    $categorias = $this->generico->get_tudo('categorias');
                    $subcategorias = $this->generico->get_tudo('subcategorias');

                    $data['id_cat_md5'] = $categoria;
                    $data['id_sub_md5'] = $subcategoria;
                    $data['marcas'] = $marcas;
                    $data['categorias'] = $categorias;
                    $data['subcategorias'] = $subcategorias;
                    $data['novo'] = true;
                    $data['main_content'] = 'painel/p_produtos';
                    $data['titulo'] = 'Painel Administrativo TG distribuidora';
                    $this->load->view('includes/template', $data);
                } else {

                    /*CRIA A URL DO PRODUTO*/
                    $table = array(
                        'Š' => 'S',
                        'š' => 's',
                        'Đ' => 'Dj',
                        'đ' => 'dj',
                        'Ž' => 'Z',
                        'ž' => 'z',
                        'Č' => 'C',
                        'č' => 'c',
                        'Ć' => 'C',
                        'ć' => 'c',
                        'À' => 'A',
                        'Á' => 'A',
                        'Â' => 'A',
                        'Ã' => 'A',
                        'Ä' => 'A',
                        'Å' => 'A',
                        'Æ' => 'A',
                        'Ç' => 'C',
                        'È' => 'E',
                        'É' => 'E',
                        'Ê' => 'E',
                        'Ë' => 'E',
                        'Ì' => 'I',
                        'Í' => 'I',
                        'Î' => 'I',
                        'Ï' => 'I',
                        'Ñ' => 'N',
                        'Ò' => 'O',
                        'Ó' => 'O',
                        'Ô' => 'O',
                        'Õ' => 'O',
                        'Ö' => 'O',
                        'Ø' => 'O',
                        'Ù' => 'U',
                        'Ú' => 'U',
                        'Û' => 'U',
                        'Ü' => 'U',
                        'Ý' => 'Y',
                        'Þ' => 'B',
                        'ß' => 'Ss',
                        'à' => 'a',
                        'á' => 'a',
                        'â' => 'a',
                        'ã' => 'a',
                        'ä' => 'a',
                        'å' => 'a',
                        'æ' => 'a',
                        'ç' => 'c',
                        'è' => 'e',
                        'é' => 'e',
                        'ê' => 'e',
                        'ë' => 'e',
                        'ì' => 'i',
                        'í' => 'i',
                        'î' => 'i',
                        'ï' => 'i',
                        'ð' => 'o',
                        'ñ' => 'n',
                        'ò' => 'o',
                        'ó' => 'o',
                        'ô' => 'o',
                        'õ' => 'o',
                        'ö' => 'o',
                        'ø' => 'o',
                        'ù' => 'u',
                        'ú' => 'u',
                        'û' => 'u',
                        'ý' => 'y',
                        'ý' => 'y',
                        'þ' => 'b',
                        'ÿ' => 'y',
                        'Ŕ' => 'R',
                        'ŕ' => 'r',
                    );
                    // Traduz os caracteres em $string, baseado no vetor $table
                    $string = strtr($this->input->post('nome') . ' - ' . date('h:i:s'), $table);
                    // converte para minúsculo
                    $string = strtolower($string);
                    // remove caracteres indesejáveis (que não estão no padrão)
                    $string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
                    // Remove múltiplas ocorrências de hífens ou espaços
                    $string = preg_replace("/[\s-]+/", " ", $string);
                    // Transforma espaços e underscores em hífens
                    $string = preg_replace("/[\s_]/", "-", $string);
                    // retorna a string
                    $url_produto = $string;

                    $codigo = trim($this->input->post('codigo'));
                    $nome = trim($this->input->post('nome'));
                    $marca = $this->input->post('marca');
                    $descricao = htmlspecialchars($this->input->post('content2'));
                    $img = $this->upload->file_name;
                    $status = $this->input->post('status');
                    $destaque = $this->input->post('destaque');
                    $dados_tecnicos = htmlspecialchars($this->input->post('content3'));

                    $dados = array(
                        'codigo' => $codigo,
                        'nome' => $nome,
                        'url_produto' => $url_produto,
                        'id_marca_md5' => $marca,
                        'descricao' => $descricao,
                        'img' => $img,
                        'id_cat_md5' => $categoria,
                        'id_sub_md5' => $subcategoria,
                        'status' => $status,
                        'destaque' => $destaque,
                        'dados_tecnicos' => $dados_tecnicos,
                        'id_md5' => $id_md5
                    );

                    $cadastra = $this->generico->cadastra_dados($dados, 'produtos');

                    if ($cadastra) {
                        /*$data['novo'] = false;
                        $data['editar'] = false;
                        $data['imagens'] = false;
                        $data['imagensCad'] = false;
                        $data['error'] = "";
                        $produtos = $this->generico->get_tudo('produtos');  
                                    
                        $data['produtos'] = $produtos;   
                        $data['main_content'] = 'painel/p_produtos';
                        $data['titulo'] = 'Painel Administrativo TG distribuidora';
                        $this->load->view('includes/template', $data);*/
                        redirect('painel/gerenciar_produtos/' . $categoria . '/' . $subcategoria);
                    }
                }
            }

            // }


        } else {

            redirect('/painel/login');;
        }
    }

    public function cria_url()
    {
        /*CRIA A URL DO PRODUTO*/
        $table = array(
            'Š' => 'S',
            'š' => 's',
            'Đ' => 'Dj',
            'đ' => 'dj',
            'Ž' => 'Z',
            'ž' => 'z',
            'Č' => 'C',
            'č' => 'c',
            'Ć' => 'C',
            'ć' => 'c',
            'À' => 'A',
            'Á' => 'A',
            'Â' => 'A',
            'Ã' => 'A',
            'Ä' => 'A',
            'Å' => 'A',
            'Æ' => 'A',
            'Ç' => 'C',
            'È' => 'E',
            'É' => 'E',
            'Ê' => 'E',
            'Ë' => 'E',
            'Ì' => 'I',
            'Í' => 'I',
            'Î' => 'I',
            'Ï' => 'I',
            'Ñ' => 'N',
            'Ò' => 'O',
            'Ó' => 'O',
            'Ô' => 'O',
            'Õ' => 'O',
            'Ö' => 'O',
            'Ø' => 'O',
            'Ù' => 'U',
            'Ú' => 'U',
            'Û' => 'U',
            'Ü' => 'U',
            'Ý' => 'Y',
            'Þ' => 'B',
            'ß' => 'Ss',
            'à' => 'a',
            'á' => 'a',
            'â' => 'a',
            'ã' => 'a',
            'ä' => 'a',
            'å' => 'a',
            'æ' => 'a',
            'ç' => 'c',
            'è' => 'e',
            'é' => 'e',
            'ê' => 'e',
            'ë' => 'e',
            'ì' => 'i',
            'í' => 'i',
            'î' => 'i',
            'ï' => 'i',
            'ð' => 'o',
            'ñ' => 'n',
            'ò' => 'o',
            'ó' => 'o',
            'ô' => 'o',
            'õ' => 'o',
            'ö' => 'o',
            'ø' => 'o',
            'ù' => 'u',
            'ú' => 'u',
            'û' => 'u',
            'ý' => 'y',
            'ý' => 'y',
            'þ' => 'b',
            'ÿ' => 'y',
            'Ŕ' => 'R',
            'ŕ' => 'r',
        );

        $produtos = $this->generico->get_tudo('produtos');

        foreach ($produtos as $value) {
            $nome = $value->nome;

            // Traduz os caracteres em $string, baseado no vetor $table
            $string = strtr($nome . ' - ' . date('h:i:s'), $table);
            // converte para minúsculo
            $string = strtolower($string);
            // remove caracteres indesejáveis (que não estão no padrão)
            $string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
            // Remove múltiplas ocorrências de hífens ou espaços
            $string = preg_replace("/[\s-]+/", " ", $string);
            // Transforma espaços e underscores em hífens
            $string = preg_replace("/[\s_]/", "-", $string);
            // retorna a string
            $url_produto = $string;

            $dados = array(
                'url_produto' => $url_produto,
            );

            $this->generico->do_update($dados, array('id_md5' => $value->id_md5), 'produtos', '');
        }
    }

    public function cadastraImgProd()
    {
        if ($this->session->userdata('admin_logado')) {

            $id_md5 = trim($this->input->post('id_md5'));

            if (!is_dir('./assets/uploads/produtos/' . $id_md5)) {
                $caminho = './assets/uploads/produtos';
                $pasta = $id_md5;
                mkdir($caminho . '/' . $pasta, 0755);
            }

            $config['upload_path'] = './assets/uploads/produtos/' . $id_md5;
            $config['allowed_types'] = 'gif|jpg|png';
            $config['overwrite'] = FALSE;
            $config['max_size'] = '2000';

            $this->load->library('upload', $config);
            if (!$this->upload->do_upload()) {

                $data['error'] = $this->upload->display_errors('<p class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>', '</p>');

                $produtoDet = $this->generico->get_tudo_parametro($id_md5, 'id_md5', 'produtos');
                if ($produtoDet) {
                    $data['produtoDet'] = $produtoDet;
                } else {
                    $data['produtoDet'] = '';
                }

                $data['imagensCad'] = true;
                $data['main_content'] = 'painel/p_produtos';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } else {
                //PEGANDO A EXTENSAO DA IMAGEM
                list($width, $height, $type, $attr) = getimagesize($config['upload_path'] . "/" . $this->upload->file_name);


                //redimensionando imagem
                $config['source_image'] = $this->upload->upload_path . $this->upload->file_name;

                $this->load->library('image_lib', $config);

                $img = $this->upload->file_name;

                $dados = array(
                    'img' => $img,
                    'id_prod_md5' => $id_md5
                );

                $cadastra = $this->generico->cadastra_dados($dados, 'img_produtos');

                if ($cadastra) {
                    redirect(base_url('painel/produtos/imagens/' . $id_md5));
                }
            }
        } else {

            redirect('/painel/login');;
        }
    }


    public function altera_produto()
    {
        if ($this->session->userdata('admin_logado')) {


            $categoria = $this->input->post('categoria');
            $subcategoria = $this->input->post('subcategoria');

            $id_md5 = trim($this->input->post('id_md5'));

            if (!is_dir('./assets/uploads/produtos/' . $id_md5)) {
                $caminho = './assets/uploads/produtos';
                $pasta = $id_md5;
                mkdir($caminho . '/' . $pasta, 0755);
            }

            $config['upload_path'] = './assets/uploads/produtos/' . $id_md5;
            $config['allowed_types'] = 'gif|jpg|png';
            $config['overwrite'] = FALSE;
            $config['max_size'] = '2000';

            $this->load->library('upload', $config);
            if (!$this->upload->do_upload()) {

                $codigo = trim($this->input->post('codigo'));
                $nome = trim($this->input->post('nome'));
                $marca = $this->input->post('marca');
                $descricao = htmlspecialchars($this->input->post('content'));
                $status = $this->input->post('status');
                $destaque = $this->input->post('destaque');
                $dados_tecnicos = htmlspecialchars($this->input->post('content4'));

                $dados = array(
                    'codigo' => $codigo,
                    'nome' => $nome,
                    'id_marca_md5' => $marca,
                    'descricao' => $descricao,
                    'id_cat_md5' => $categoria,
                    'id_sub_md5' => $subcategoria,
                    'status' => $status,
                    'destaque' => $destaque,
                    'dados_tecnicos' => $dados_tecnicos
                );

                $atualiza = $this->generico->do_update($dados, array('id_md5' => $id_md5), 'produtos', '');

                /*$data['novo'] = false;
                $data['editar'] = false;
                $data['imagens'] = false;
                $data['imagensCad'] = false;
                $data['error'] = "";
                $produtos = $this->generico->get_tudo('produtos');  
                            
                $data['produtos'] = $produtos;   
                $data['main_content'] = 'painel/p_produtos';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);*/

                redirect('painel/gerenciar_produtos/' . $categoria . '/' . $subcategoria);
            } else {
                //PEGANDO A EXTENSAO DA IMAGEM
                list($width, $height, $type, $attr) = getimagesize($config['upload_path'] . "/" . $this->upload->file_name);


                //redimensionando imagem
                $config['source_image'] = $this->upload->upload_path . $this->upload->file_name;
                $config['maintain_ratio'] = FALSE;
                $config['width']  = '400';
                $config['height']  = '400';

                $this->load->library('image_lib', $config);

                if (!$this->image_lib->resize()) {
                    $data['error'] = $this->upload->display_errors('<p class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>', '</p>');

                    $id_md5 = $this->uri->segment('4');

                    $produtoDet = $this->generico->get_tudo_parametro($id_md5, 'id_md5', 'produtos');
                    if ($produtoDet) {
                        $data['produtoDet'] = $produtoDet;
                    } else {
                        $data['produtoDet'] = '';
                    }
                    foreach ($produtoDet as $row) {
                        $id_cat_md5 = $row->id_cat_md5;
                    }

                    /*$marcas = $this->generico->get_tudo('marcas'); 
                    $categorias = $this->generico->get_tudo('categorias');                
                    $subcategorias = $this->generico->get_tudo_parametro($id_cat_md5,'id_cat_md5','subcategorias');  
                                        
                    $data['marcas'] = $marcas;  
                    $data['categorias'] = $categorias; 
                    $data['subcategorias'] = $subcategorias;   

                    $data['editar'] = true;    
                    $data['imagens'] = false;
                    $data['imagensCad'] = false;          
                    $data['main_content'] = 'painel/p_produtos';
                    $data['titulo'] = 'Painel Administrativo TG distribuidora';*/

                    redirect('painel/gerenciar_produtos/' . $categoria . '/' . $subcategoria);
                } else {


                    $codigo = trim($this->input->post('codigo'));
                    $nome = trim($this->input->post('nome'));
                    $marca = $this->input->post('marca');
                    $descricao = htmlspecialchars($this->input->post('content'));
                    $img = $this->upload->file_name;
                    $status = $this->input->post('status');
                    $dados_tecnicos = $this->input->post('dados_tecnicos');

                    $dados = array(
                        'codigo' => $codigo,
                        'nome' => $nome,
                        'id_marca_md5' => $marca,
                        'descricao' => $descricao,
                        'img' => $img,
                        'id_cat_md5' => $categoria,
                        'id_sub_md5' => $subcategoria,
                        'status' => $status,
                        'dados_tecnicos' => $dados_tecnicos
                    );

                    $atualiza = $this->generico->do_update($dados, array('id_md5' => $id_md5), 'produtos', '');

                    /*$data['novo'] = false;
                    $data['editar'] = false;
                    $data['imagens'] = false;
                    $data['imagensCad'] = false;
                    $data['error'] = "";
                    $produtos = $this->generico->get_tudo('produtos');  
                                
                    $data['produtos'] = $produtos;   
                    $data['main_content'] = 'painel/p_produtos';
                    $data['titulo'] = 'Painel Administrativo TG distribuidora';
                    $this->load->view('includes/template', $data);*/

                    redirect('painel/gerenciar_produtos/' . $categoria . '/' . $subcategoria);
                }
            }

            // }


        } else {

            redirect('/painel/login');;
        }
    }

    public function exclui_produto()
    {
        $id_md5 = $this->input->post('id_md5');

        $dados = array('id_md5' => $id_md5);

        $excluir = $this->generico->do_delete('produtos', $dados);
        if ($excluir) {
            echo 'accept';
        } else {
            echo 'refused';
        }
    }

    public function exclui_imagem()
    {
        $id = $this->input->post('id');

        $dados = array('id' => $id);

        $excluir = $this->generico->do_delete('img_produtos', $dados);
        if ($excluir) {
            echo 'accept';
        } else {
            echo 'refused';
        }
    }

    public function cadastra_relacionado()
    {

        $idFilho = $this->input->post('idFilho');
        $idPai = $this->input->post('idPai');

        $verifica = $this->generico->get_tudo_dois_parametros($idFilho, 'id_filho_md5', $idPai, 'id_pai_md5', 'relacionados', '');
        if ($verifica) {
            echo 'denied';
        } else {
            $dados = array(
                'id_filho_md5' => $idFilho,
                'id_pai_md5' => $idPai
            );
            $cadastra = $this->generico->cadastra_dados($dados, 'relacionados');
            if ($cadastra) {
                echo 'accept';
            } else {
                echo 'refused';
            }
        }
    }

    public function exclui_relacionado()
    {

        $idFilho = $this->input->post('idFilho');
        $idPai = $this->input->post('idPai');

        $dados = array(
            'id_filho_md5' => $idFilho,
            'id_pai_md5' => $idPai
        );

        $excluir = $this->generico->do_delete('relacionados', $dados);

        if ($excluir) {
            echo 'accept';
        } else {
            echo 'refused';
        }
    }

    /************CATEGORIAS************/
    public function categorias()
    {
        if ($this->session->userdata('admin_logado')) {

            $uri = $this->uri->segment('3');
            $data['novo'] = false;
            $data['editar'] = false;
            $data['error'] = "";

            if ($uri == 'novo') {
                $data['novo'] = true;
                $data['main_content'] = 'painel/p_categorias';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } elseif ($uri == 'editar') {
                $id_md5 = $this->uri->segment('4');

                $categoriaDet = $this->generico->get_tudo_parametro($id_md5, 'id_md5', 'categorias');
                if ($categoriaDet) {
                    $data['categoriaDet'] = $categoriaDet;
                } else {
                    $data['categoriaDet'] = '';
                }

                $data['editar'] = true;
                $data['main_content'] = 'painel/p_categorias';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } else {
                $categorias = $this->generico->get_tudo('categorias');

                $data['categorias'] = $categorias;
                $data['main_content'] = 'painel/p_categorias';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            }
        } else {

            redirect('painel');;
        }
    }

    public function cadastra_categoria()
    {

        $nome = $this->input->post('nome');

        $dados = array(
            'nome' => $nome,
            'id_md5' => md5($nome . date('Y-m-d H:i:s'))
        );
        $cadastra = $this->generico->cadastra_dados($dados, 'categorias');
        if ($cadastra) {
            echo 'accept';
        } else {
            echo 'refused';
        }
    }

    public function edita_categoria()
    {
        $nome = trim($this->input->post('nome'));
        $id_md5 = $this->input->post('id_md5');

        if ($nome && $id_md5) {

            $dados = array(
                'nome' => $nome
            );

            $atualiza = $this->generico->do_update($dados, array('id_md5' => $id_md5), 'categorias', '');
            if ($atualiza) {
                echo 'accept';
            } else {
                echo 'refused';
            }
        }
    }

    public function exclui_categoria()
    {
        $id_md5 = $this->input->post('id_md5');

        //VERIFICA SE HÁ PRODUTOS CADASTRADOS PARA ESSA CATEGORIA
        $verificaCat = $this->generico->get_tudo_parametro($id_md5, 'id_cat_md5', 'produtos');
        if ($verificaCat) {
            echo 'produtos';
        } else {
            //VERIFICA SE HÁ SUB-CATEGORIAS CADASTRADOS PARA ESSA CATEGORIA
            $verificaCat2 = $this->generico->get_tudo_parametro($id_md5, 'id_cat_md5', 'subcategorias');
            if ($verificaCat2) {
                echo 'subcategorias';
            } else {
                //EXCLUI A CATEGORIA
                $dadosCat = array('id_md5' => $id_md5);
                $excluir = $this->generico->do_delete('categorias', $dadosCat);

                if ($excluir) {
                    echo 'accept';
                } else {
                    echo 'refused';
                }
            }
        }
    }

    /************SUB-CATEGORIAS************/
    public function subcategorias()
    {
        if ($this->session->userdata('admin_logado')) {

            $id_categoria = $this->uri->segment('3');

            $data['novo'] = false;
            $data['editar'] = false;
            $data['error'] = "";

            if ($id_categoria) {


                $uri = $this->uri->segment('4');

                if ($uri == 'novo') {
                    $data['novo'] = true;
                    $categoria = $this->generico->get_tudo_parametro($id_categoria, 'id_md5', 'categorias');
                    $data['categoria'] = $categoria;

                    $subcategorias = $this->generico->get_tudo_parametro($id_categoria, 'id_cat_md5', 'subcategorias');
                    $data['subcategorias'] = $subcategorias;

                    $data['main_content'] = 'painel/p_subcategorias';
                    $data['titulo'] = 'Painel Administrativo TG distribuidora';
                    $this->load->view('includes/template', $data);
                } elseif ($uri == 'editar') {

                    $id_subcategoria = $this->uri->segment('5');

                    $data['editar'] = true;
                    $categoria = $this->generico->get_tudo_parametro($id_categoria, 'id_md5', 'categorias');
                    $data['categoria'] = $categoria;

                    $subcategoriaDet = $this->generico->get_tudo_parametro($id_subcategoria, 'id_md5', 'subcategorias');
                    $data['subcategoriaDet'] = $subcategoriaDet;

                    $data['main_content'] = 'painel/p_subcategorias';
                    $data['titulo'] = 'Painel Administrativo TG distribuidora';
                    $this->load->view('includes/template', $data);
                } else {
                    $categoria = $this->generico->get_tudo_parametro($id_categoria, 'id_md5', 'categorias');
                    $data['categoria'] = $categoria;

                    $subcategorias = $this->generico->get_tudo_parametro($id_categoria, 'id_cat_md5', 'subcategorias');
                    $data['subcategorias'] = $subcategorias;

                    $data['main_content'] = 'painel/p_subcategorias';
                    $data['titulo'] = 'Painel Administrativo TG distribuidora';
                    $this->load->view('includes/template', $data);
                }
            } else {
                $categorias = $this->generico->get_tudo('categorias');

                $data['categorias'] = $categorias;
                $data['main_content'] = 'painel/p_categorias';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            }
        } else {

            redirect('painel');;
        }
    }

    public function cadastra_subcategoria()
    {

        $nome = $this->input->post('nome');
        $id_cat_md5 = $this->input->post('id_cat_md5');

        $dados = array(
            'nome' => $nome,
            'id_md5' => md5($nome . date('Y-m-d H:i:s')),
            'id_cat_md5' => $id_cat_md5
        );
        $cadastra = $this->generico->cadastra_dados($dados, 'subcategorias');
        if ($cadastra) {
            echo 'accept';
        } else {
            echo 'refused';
        }
    }

    public function edita_subcategoria()
    {
        $nome = trim($this->input->post('nome'));
        $id_md5 = $this->input->post('id_md5');
        $id_cat_md5 = $this->input->post('id_cat_md5');

        if ($nome && $id_md5 && $id_cat_md5) {

            $dados = array(
                'nome' => $nome
            );

            $atualiza = $this->generico->do_update($dados, array('id_md5' => $id_md5, 'id_cat_md5' => $id_cat_md5), 'subcategorias', '');
            if ($atualiza) {
                echo 'accept';
            } else {
                echo 'refused';
            }
        }
    }

    public function exclui_subcategoria()
    {
        $id_md5 = $this->input->post('id_md5');

        //VERIFICA SE HÁ PRODUTOS CADASTRADOS PARA ESSA SUBCATEGORIA
        $verificaSub = $this->generico->get_tudo_parametro($id_md5, 'id_sub_md5', 'produtos');
        if ($verificaSub) {
            echo 'produtos';
        } else {
            //EXCLUI A SUBCATEGORIA
            $dados = array('id_md5' => $id_md5);
            $excluir = $this->generico->do_delete('subcategorias', $dados);

            if ($excluir) {
                echo 'accept';
            } else {
                echo 'refused';
            }
        }
    }


    public function busca_subcategorias()
    {

        $id_cat_md5 = $this->input->post('id_cat');

        $query = $this->db->query("SELECT nome, id_md5 FROM subcategorias WHERE id_cat_md5 = ?", array($id_cat_md5));
        $numRow = $query->num_rows;
        if ($query->num_rows > 0) {

            $subcategorias = $query->result();

            echo json_encode($subcategorias);
        } else {
            echo 0;
        }
    }


    /************MARCAS************/
    public function marcas()
    {
        if ($this->session->userdata('admin_logado')) {

            $uri = $this->uri->segment('3');
            $data['novo'] = false;
            $data['editar'] = false;
            $data['error'] = "";

            if ($uri == 'novo') {
                $data['novo'] = true;
                $data['main_content'] = 'painel/p_marcas';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } elseif ($uri == 'editar') {
                $id_md5 = $this->uri->segment('4');

                $marcaDet = $this->generico->get_tudo_parametro($id_md5, 'id_md5', 'marcas');
                if ($marcaDet) {
                    $data['marcaDet'] = $marcaDet;
                } else {
                    $data['marcaDet'] = '';
                }

                $data['editar'] = true;
                $data['main_content'] = 'painel/p_marcas';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } else {
                $marcas = $this->generico->get_tudo('marcas');

                $data['marcas'] = $marcas;
                $data['main_content'] = 'painel/p_marcas';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            }
        } else {

            redirect('painel');;
        }
    }

    public function cadastra_marca()
    {

        $nome = $this->input->post('nome');

        $dados = array(
            'nome' => $nome,
            'id_md5' => md5($nome . date('Y-m-d H:i:s'))
        );
        $cadastra = $this->generico->cadastra_dados($dados, 'marcas');
        if ($cadastra) {
            echo 'accept';
        } else {
            echo 'refused';
        }
    }

    public function edita_marca()
    {
        $nome = trim($this->input->post('nome'));
        $id_md5 = $this->input->post('id_md5');

        if ($nome && $id_md5) {

            $dados = array(
                'nome' => $nome
            );

            $atualiza = $this->generico->do_update($dados, array('id_md5' => $id_md5), 'marcas', '');
            if ($atualiza) {
                echo 'accept';
            } else {
                echo 'refused';
            }
        }
    }

    public function exclui_marca()
    {
        $id_md5 = $this->input->post('id_md5');

        //VERIFICA SE HÁ PRODUTOS CADASTRADOS PARA ESSA MARCA
        $verificaMarca = $this->generico->get_tudo_parametro($id_md5, 'id_md5', 'produtos');
        if ($verificaMarca) {
            echo 'produtos';
        } else {
            //EXCLUI A MARCA
            $dadosCat = array('id_md5' => $id_md5);
            $excluir = $this->generico->do_delete('marcas', $dadosCat);

            if ($excluir) {
                echo 'accept';
            } else {
                echo 'refused';
            }
        }
    }

    public function atualiza_marcas()
    {
        //$query = $this->db->get('marcas'); 
        $query = $this->db->query('SELECT nome, id_md5 FROM marcas');
        $numRow = $query->num_rows;
        if ($query->num_rows > 0) {

            $marcas = $query->result();

            echo json_encode($marcas);
        } else {
            echo 0;
        }
    }



    /************EMPRESA************/
    public function empresa()
    {
        if ($this->session->userdata('admin_logado')) {

            $data['imagensCad'] = false;
            $data['editar'] = true;

            $uri = $this->uri->segment('3');

            if ($uri == 'cadImagem') {

                $data['imagensCad'] = true;
                $data['editar'] = false;
            }

            $dados = $this->generico->get_tudo('empresa');
            $imagens = $this->generico->get_tudo('img_empresa');

            $data['error'] = false;
            $data['dados'] = $dados;
            $data['imagens'] = $imagens;
            $data['main_content'] = 'painel/p_empresa';
            $data['titulo'] = 'Painel Administrativo TG distribuidora';
            $this->load->view('includes/template', $data);
        } else {

            redirect('painel');;
        }
    }

    public function altera_empresa()
    {
        if ($this->session->userdata('admin_logado')) {

            if (!is_dir('./assets/uploads/empresa/')) {
                $caminho = './assets/uploads';
                $pasta = 'empresa';
                mkdir($caminho . '/' . $pasta, 0755);
            }

            $config['upload_path'] = './assets/uploads/empresa/';
            $config['allowed_types'] = 'gif|jpg|png';
            $config['overwrite'] = FALSE;
            $config['max_size'] = '2000';

            $this->load->library('upload', $config);
            if (!$this->upload->do_upload()) {

                $titulo = trim($this->input->post('titulo'));
                $texto = $this->input->post('texto');
                $status = $this->input->post('status');

                $dados = array(
                    'titulo' => $titulo,
                    'texto' => $texto,
                    'status' => $status
                );

                $atualiza = $this->generico->do_update($dados, array('id' => '1'), 'empresa', '');

                $dados = $this->generico->get_tudo('empresa');
                $imagens = $this->generico->get_tudo('img_empresa');

                $data['editar'] = true;
                $data['error'] = '<p class="alert alert-dismissable alert-success"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Atualizado com sucesso!</p>';
                $data['dados'] = $dados;
                $data['imagens'] = $imagens;
                $data['main_content'] = 'painel/p_empresa';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } else {
                //PEGANDO A EXTENSAO DA IMAGEM
                list($width, $height, $type, $attr) = getimagesize($config['upload_path'] . "/" . $this->upload->file_name);


                //redimensionando imagem
                $config['source_image'] = $this->upload->upload_path . $this->upload->file_name;
                $config['maintain_ratio'] = TRUE;

                $this->load->library('image_lib', $config);

                if (!$this->image_lib->resize()) {
                    $data['error'] = $this->upload->display_errors('<p class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>', '</p>');

                    $dados = $this->generico->get_tudo('empresa');
                    $imagens = $this->generico->get_tudo('img_empresa');

                    $data['editar'] = true;
                    $data['dados'] = $dados;
                    $data['imagens'] = $imagens;
                    $data['main_content'] = 'painel/p_empresa';
                    $data['titulo'] = 'Painel Administrativo TG distribuidora';
                    $this->load->view('includes/template', $data);
                } else {

                    $img = $this->input->post('img');
                    if ($img) {
                        unlink('./assets/uploads/empresa/' . $img);
                    }


                    $titulo = trim($this->input->post('titulo'));
                    $texto = $this->input->post('texto');
                    $status = $this->input->post('status');
                    $banner = $this->upload->file_name;

                    $dados = array(
                        'titulo' => $titulo,
                        'texto' => $texto,
                        'status' => $status,
                        'banner' => $banner
                    );


                    $atualiza = $this->generico->do_update($dados, array('id' => '1'), 'empresa', '');

                    $dados = $this->generico->get_tudo('empresa');
                    $imagens = $this->generico->get_tudo('img_empresa');

                    $data['editar'] = true;
                    $data['error'] = '<p class="alert alert-dismissable alert-success"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Atualizado com sucesso!</p>';
                    $data['dados'] = $dados;
                    $data['imagens'] = $imagens;
                    $data['main_content'] = 'painel/p_empresa';
                    $data['titulo'] = 'Painel Administrativo TG distribuidora';
                    $this->load->view('includes/template', $data);
                }
            }
        } else {

            redirect('/painel/login');;
        }
    }

    public function cadastraImgEmpresa()
    {
        if ($this->session->userdata('admin_logado')) {

            if (!is_dir('./assets/uploads/empresa/fotos')) {
                $caminho = './assets/uploads/empresa';
                $pasta = 'fotos';
                mkdir($caminho . '/' . $pasta, 0755);
            }

            $config['upload_path'] = './assets/uploads/empresa/fotos';
            $config['allowed_types'] = 'gif|jpg|png';
            $config['overwrite'] = FALSE;
            $config['max_size'] = '2000';

            $this->load->library('upload', $config);
            if (!$this->upload->do_upload()) {

                $data['error'] = $this->upload->display_errors('<p class="alert alert-dismissable alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>', '</p>');

                $data['imagensCad'] = true;
                $data['editar'] = false;

                $data['main_content'] = 'painel/p_empresa';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } else {
                //PEGANDO A EXTENSAO DA IMAGEM
                list($width, $height, $type, $attr) = getimagesize($config['upload_path'] . "/" . $this->upload->file_name);


                //redimensionando imagem
                $config['source_image'] = $this->upload->upload_path . $this->upload->file_name;
                $config['maintain_ratio'] = FALSE;
                $config['width']  = '1170';
                $config['height']  = '550';

                $this->load->library('image_lib', $config);

                $img = $this->upload->file_name;

                $dados = array(
                    'img' => $img
                );

                $cadastra = $this->generico->cadastra_dados($dados, 'img_empresa');

                if ($cadastra) {
                    redirect(base_url('painel/empresa/'));
                }
            }
        } else {

            redirect('/painel/login');;
        }
    }

    public function exclui_imagem_empresa()
    {
        $id = $this->input->post('id');
        $img = $this->input->post('img');

        if ($img) {
            unlink('./assets/uploads/empresa/fotos/' . $img);
        }


        $dados = array('id' => $id);

        $excluir = $this->generico->do_delete('img_empresa', $dados);
        if ($excluir) {
            echo 'accept';
        } else {
            echo 'refused';
        }
    }


    /*************NOTICIAS************/
    public function noticias()
    {
        if ($this->session->userdata('admin_logado')) {


            $uri = $this->uri->segment('3');


            if ($uri == 'cad_imagem') {

                $uri_id_md5 = $this->uri->segment('4');
                if ($uri_id_md5) {
                    $data['id_md5'] = $uri_id_md5;
                    $data['imagensCad'] = TRUE;
                    $data['novo'] = false;
                    $data['editar'] = false;
                    $data['imagens'] = false;
                    $data['error'] = false;
                    $data['main_content'] = 'painel/p_noticias';
                    $data['titulo'] = 'Painel Administrativo TG distribuidora';
                    $this->load->view('includes/template', $data);
                } else {
                    $noticias = $this->generico->get_tudo('noticias');

                    $data['noticias'] = $noticias;
                    $data['novo'] = false;
                    $data['editar'] = false;
                    $data['imagens'] = false;
                    $data['imagensCad'] = false;
                    $data['main_content'] = 'painel/p_noticias';
                    $data['titulo'] = 'Painel Administrativo TG distribuidora';
                    $this->load->view('includes/template', $data);
                }
            } elseif ($uri == 'imagens') {

                $uri_id_md5 = $this->uri->segment('4');
                if ($uri_id_md5) {

                    $query = $this->generico->get_tudo_parametro($uri_id_md5, 'id_md5', 'noticias');
                    if ($query) {
                        $data['noticia'] = $query;
                    }
                    $query = $this->generico->get_tudo_parametro($uri_id_md5, 'noticia_md5', 'img_noticia');
                    if ($query) {
                        $data['imagensNoticia'] = $query;
                    } else {
                        $data['imagensNoticia'] = '';
                    }
                    $data['id_md5'] = $uri_id_md5;

                    $data['novo'] = false;
                    $data['editar'] = false;
                    $data['imagens'] = true;

                    $data['main_content'] = 'painel/p_noticias';
                    $data['titulo'] = 'Painel Administrativo TG distribuidora';
                    $this->load->view('includes/template', $data);
                } else {
                    $noticias = $this->generico->get_tudo('noticias');

                    $data['noticias'] = $noticias;
                    $data['novo'] = false;
                    $data['editar'] = false;
                    $data['imagens'] = false;
                    $data['imagensCad'] = false;
                    $data['main_content'] = 'painel/p_noticias';
                    $data['titulo'] = 'Painel Administrativo TG distribuidora';
                    $this->load->view('includes/template', $data);
                }
            } elseif ($uri == 'novo') {

                // Array com as configurações pra essa instância do CKEditor ( você pode ter mais de uma )
                /* $data['ckeditor_texto1'] = array
                    (
                        //id da textarea a ser substituída pelo CKEditor
                        'id'   => 'texto1',
             
                        // caminho da pasta do CKEditor relativo a pasta raiz do CodeIgniter
                        'path' => '/ckeditor',
                        
                        
                        
                        // configurações opcionais
                        'config' => array
                        (
                            'toolbar' => "Full",
                            'filebrowserBrowseUrl'      => base_url().'ckeditor/ckfinder/ckfinder.html',
                            'filebrowserImageBrowseUrl' => base_url().'ckeditor/ckfinder/ckfinder.html?Type=Images',
                            'filebrowserFlashBrowseUrl' => base_url().'ckeditor/ckfinder/ckfinder.html?Type=Flash',
                            'filebrowserUploadUrl'      => base_url().'ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
                            'filebrowserImageUploadUrl' => base_url().'ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',
                            'filebrowserFlashUploadUrl' => base_url().'ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash'
                        )
                    );*/


                $data['novo'] = true;
                $data['error'] = false;
                $data['main_content'] = 'painel/p_noticias';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } elseif ($uri == 'editar') {
                $uri_id_md5 = $this->uri->segment('4');

                $this->db->where('id_md5', $uri_id_md5);
                $query = $this->db->get('noticias');
                if ($query->num_rows >= 1) {
                    foreach ($query->result_array() as $row) {
                        $data['resumo'] = $row['resumo'];
                        $data['img'] = $row['img'];
                        $data['tituloNoticia'] = $row['titulo'];
                        $data['sub_titulo'] = $row['sub_titulo'];
                        $data['texto'] = $row['texto'];
                        $data['status'] = $row['status'];
                        $data['destaque'] = $row['destaque'];
                        $data['id_md5'] = $row['id_md5'];
                    }

                    // Array com as configurações pra essa instância do CKEditor ( você pode ter mais de uma )
                    /*$data['ckeditor_texto1'] = array
                        (
                            //id da textarea a ser substituída pelo CKEditor
                            'id'   => 'texto1',
                 
                            // caminho da pasta do CKEditor relativo a pasta raiz do CodeIgniter
                            'path' => '/ckeditor',
                            
                            
                            
                            // configurações opcionais
                            'config' => array
                            (
                                'toolbar' => "Full",
                                'filebrowserBrowseUrl'      => base_url().'ckeditor/ckfinder/ckfinder.html',
                                'filebrowserImageBrowseUrl' => base_url().'ckeditor/ckfinder/ckfinder.html?Type=Images',
                                'filebrowserFlashBrowseUrl' => base_url().'ckeditor/ckfinder/ckfinder.html?Type=Flash',
                                'filebrowserUploadUrl'      => base_url().'ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
                                'filebrowserImageUploadUrl' => base_url().'ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',
                                'filebrowserFlashUploadUrl' => base_url().'ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash'
                            )
                        );*/

                    $data['novo'] = false;
                    $data['editar'] = true;
                    $data['error'] = false;
                    $data['main_content'] = 'painel/p_noticias';
                    $data['titulo'] = 'Painel Administrativo TG distribuidora';
                    $this->load->view('includes/template', $data);
                } else {
                    $noticias = $this->generico->get_tudo('noticias');

                    $data['noticias'] = $noticias;
                    $data['main_content'] = 'painel/p_noticias';
                    $data['titulo'] = 'Painel Administrativo TG distribuidora';
                    $this->load->view('includes/template', $data);
                }
            } else {
                $noticias = $this->generico->get_tudo('noticias');

                $data['noticias'] = $noticias;
                $data['novo'] = false;
                $data['editar'] = false;
                $data['imagens'] = false;
                $data['imagensCad'] = false;
                $data['main_content'] = 'painel/p_noticias';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            }
        } else {
            redirect('/painel/login');
        }
    }

    public function cadastra_noticia()
    {
        if ($this->session->userdata('admin_logado')) {


            $id_md5 = md5(trim($this->input->post('titulo')) . date('Y-m-d H:i:s'));

            if (!is_dir('./assets/uploads/noticias/' . $id_md5)) {
                $caminho = './assets/uploads/noticias';
                $pasta = $id_md5;
                mkdir($caminho . '/' . $pasta, 0755);
            }

            $config['upload_path'] = './assets/uploads/noticias/' . $id_md5;
            $config['allowed_types'] = 'gif|jpg|png';
            $config['overwrite'] = FALSE;
            $config['max_size'] = '2000';

            $this->load->library('upload', $config);
            if (!$this->upload->do_upload()) {

                $titulo_pg = trim($this->input->post('titulo'));
                $img = 'no_img';
                $destaque = $this->input->post('destaque');
                $status = $this->input->post('status');
                $resumo = $this->input->post('resumo');
                $texto = $this->input->post('texto');

                $dados = array(
                    'resumo' => $resumo,
                    'img' => $img,
                    'titulo' => $titulo_pg,
                    'texto' => $texto,
                    'status' => $status,
                    'destaque' => $destaque,
                    'data_cad' => date('Y-m-d'),
                    'id_md5' => $id_md5
                );

                $cadastra = $this->generico->cadastra_dados($dados, 'noticias');

                if ($cadastra) {
                    $noticias = $this->generico->get_tudo('noticias');

                    $data['noticias'] = $noticias;
                    $data['novo'] = false;
                    $data['editar'] = false;
                    $data['imagens'] = false;
                    $data['imagensCad'] = false;
                    $data['main_content'] = 'painel/p_noticias';
                    $data['titulo'] = 'Painel Administrativo TG distribuidora';
                    $this->load->view('includes/template', $data);
                }
            } else {
                //PEGANDO A EXTENSAO DA IMAGEM
                list($width, $height, $type, $attr) = getimagesize($config['upload_path'] . "/" . $this->upload->file_name);


                //redimensionando imagem
                $config['source_image'] = $this->upload->upload_path . $this->upload->file_name;
                $config['maintain_ratio'] = TRUE;
                $config['width']  = '600';
                $config['height']  = '450';

                $this->load->library('image_lib', $config);

                if (!$this->image_lib->resize()) {

                    $data['error'] = $this->upload->display_errors('<p class="alert alert-error">', '</p>');

                    $this->db->where('id_md5', $id_md5);
                    $query = $this->db->get('noticias');
                    if ($query->num_rows >= 1) {
                        foreach ($query->result_array() as $row) {
                            $data['resumo'] = $row['resumo'];
                            $data['img'] = $row['img'];
                            $data['tituloNoticia'] = $row['titulo'];
                            $data['sub_titulo'] = $row['sub_titulo'];
                            $data['texto'] = $row['texto'];
                            $data['status'] = $row['status'];
                            $data['destaque'] = $row['destaque'];
                            $data['id_md5'] = $row['id_md5'];
                        }

                        $data['novo'] = false;
                        $data['editar'] = true;
                        $data['main_content'] = 'painel/p_noticias';
                        $data['titulo'] = 'Painel Administrativo TG distribuidora';
                        $this->load->view('includes/template', $data);
                    }
                } else {


                    $titulo_pg = trim($this->input->post('titulo'));
                    $img = $this->upload->file_name;
                    $destaque = $this->input->post('destaque');
                    $status = $this->input->post('status');
                    $resumo = $this->input->post('resumo');
                    $texto = htmlspecialchars($this->input->post('content'));

                    $dados = array(
                        'resumo' => $resumo,
                        'img' => $img,
                        'titulo' => $titulo_pg,
                        'texto' => $texto,
                        'status' => $status,
                        'destaque' => $destaque,
                        'data_cad' => date('Y-m-d'),
                        'id_md5' => $id_md5
                    );

                    $cadastra = $this->generico->cadastra_dados($dados, 'noticias');

                    if ($cadastra) {
                        $noticias = $this->generico->get_tudo('noticias');

                        $data['noticias'] = $noticias;
                        $data['novo'] = false;
                        $data['editar'] = false;
                        $data['imagens'] = false;
                        $data['imagensCad'] = false;
                        $data['main_content'] = 'painel/p_noticias';
                        $data['titulo'] = 'Painel Administrativo TG distribuidora';
                        $this->load->view('includes/template', $data);
                    }
                }
            }
        } else {

            redirect('/painel/login');;
        }
    }

    public function edita_noticia()
    {
        if ($this->session->userdata('admin_logado')) {

            $id_md5 = $this->input->post('id_md5');

            $config['upload_path'] = './assets/uploads/noticias/' . $id_md5;
            $config['allowed_types'] = 'gif|jpg|png';
            $config['overwrite'] = FALSE;
            $config['max_size'] = '2000';

            $this->load->library('upload', $config);
            if (!$this->upload->do_upload()) {
                $titulo_pg = trim($this->input->post('titulo'));
                $destaque = $this->input->post('destaque');
                $status = $this->input->post('status');
                $resumo = $this->input->post('resumo');
                $texto = htmlspecialchars($this->input->post('content2'));

                $dados = array(
                    'resumo' => $resumo,
                    'titulo' => $titulo_pg,
                    'texto' => $texto,
                    'status' => $status,
                    'destaque' => $destaque,
                    'data_cad' => date('Y-m-d')
                );

                $atualiza = $this->generico->do_update($dados, array('id_md5' => $id_md5), 'noticias', '');

                if ($atualiza) {
                    $noticias = $this->generico->get_tudo('noticias');

                    $data['noticias'] = $noticias;
                    $data['novo'] = false;
                    $data['editar'] = false;
                    $data['imagens'] = false;
                    $data['imagensCad'] = false;
                    $data['main_content'] = 'painel/p_noticias';
                    $data['titulo'] = 'Painel Administrativo TG distribuidora';
                    $this->load->view('includes/template', $data);
                }
            } else {

                //PEGANDO A EXTENSAO DA IMAGEM
                list($width, $height, $type, $attr) = getimagesize($config['upload_path'] . "/" . $this->upload->file_name);


                $imagem = trim($this->input->post('imagem'));
                unlink('./assets/uploads/noticias/' . $id_md5 . '/' . $imagem);

                //redimensionando imagem
                $config['source_image'] = $this->upload->upload_path . $this->upload->file_name;
                $config['maintain_ratio'] = TRUE;
                $config['width']  = '600';
                $config['height']  = '450';

                $this->load->library('image_lib', $config);

                if (!$this->image_lib->resize()) {
                    $data['error'] = $this->upload->display_errors('<p class="alert alert-error">', '</p>');

                    $this->db->where('id_md5', $id_md5);
                    $query = $this->db->get('noticias');
                    if ($query->num_rows >= 1) {
                        foreach ($query->result_array() as $row) {
                            $data['resumo'] = $row['resumo'];
                            $data['img'] = $row['img'];
                            $data['tituloNoticia'] = $row['titulo'];
                            $data['sub_titulo'] = $row['sub_titulo'];
                            $data['texto'] = $row['texto'];
                            $data['status'] = $row['status'];
                            $data['destaque'] = $row['destaque'];
                            $data['id_md5'] = $row['id_md5'];
                        }

                        $data['novo'] = false;
                        $data['editar'] = true;
                        $data['main_content'] = 'painel/p_noticias';
                        $data['titulo'] = 'Painel Administrativo TG distribuidora';
                        $this->load->view('includes/template', $data);
                    }
                } else {


                    $titulo_pg = trim($this->input->post('titulo'));
                    $img = $this->upload->file_name;
                    $destaque = $this->input->post('destaque');
                    $status = $this->input->post('status');
                    $resumo = $this->input->post('resumo');
                    $texto = $this->input->post('texto');

                    $dados = array(
                        'resumo' => $resumo,
                        'img' => $img,
                        'titulo' => $titulo_pg,
                        'texto' => $texto,
                        'status' => $status,
                        'destaque' => $destaque
                    );

                    $atualiza = $this->generico->do_update($dados, array('id_md5' => $id_md5), 'noticias', '');

                    if ($atualiza) {
                        $noticias = $this->generico->get_tudo('noticias');

                        $data['noticias'] = $noticias;
                        $data['novo'] = false;
                        $data['editar'] = false;
                        $data['imagens'] = false;
                        $data['imagensCad'] = false;
                        $data['main_content'] = 'painel/p_noticias';
                        $data['titulo'] = 'Painel Administrativo TG distribuidora';
                        $this->load->view('includes/template', $data);
                    }
                }
            }


            // }


        } else {

            redirect('/painel/login');;
        }
    }

    public function cad_imagem()
    {
        if ($this->session->userdata('admin_logado')) {


            $id_md5 = trim($this->input->post('id_md5'));

            if (!is_dir('./assets/uploads/noticias/' . $id_md5)) {
                $caminho = './assets/uploads/noticias';
                $pasta = $id_md5;
                mkdir($caminho . '/' . $pasta, 0755);
            }

            $config['upload_path'] = './assets/uploads/noticias/' . $id_md5;
            $config['allowed_types'] = 'gif|jpg|png';
            $config['overwrite'] = FALSE;
            $config['max_size'] = '2000';

            $this->load->library('upload', $config);
            if (!$this->upload->do_upload()) {

                $data['id_md5'] = $id_md5;
                $data['imagensCad'] = TRUE;
                $data['novo'] = false;
                $data['editar'] = false;
                $data['imagens'] = false;
                $data['error'] = $this->upload->display_errors('<p class="alert alert-error">', '</p>');
                $data['main_content'] = 'painel/p_noticias';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } else {
                //PEGANDO A EXTENSAO DA IMAGEM
                list($width, $height, $type, $attr) = getimagesize($config['upload_path'] . "/" . $this->upload->file_name);

                $img = $this->upload->file_name;

                $dados = array(
                    'img' => $img,
                    'noticia_md5' => $id_md5
                );

                $cadastra = $this->generico->cadastra_dados($dados, 'img_noticia');

                $query = $this->generico->get_tudo_parametro($id_md5, 'id_md5', 'noticias');
                if ($query) {
                    $data['noticia'] = $query;
                }
                $query = $this->generico->get_tudo_parametro($id_md5, 'noticia_md5', 'img_noticia');
                if ($query) {
                    $data['imagensNoticia'] = $query;
                } else {
                    $data['imagensNoticia'] = '';
                }
                $data['id_md5'] = $id_md5;

                $data['novo'] = false;
                $data['editar'] = false;
                $data['imagens'] = true;

                $data['main_content'] = 'painel/p_noticias';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            }

            // }


        } else {

            redirect('/painel/login');;
        }
    }


    public function exclui_noticia()
    {
        $id_md5 = $this->input->post('id_md5');

        $dados = array('id_md5' => $id_md5);

        $excluir = $this->generico->do_delete('noticias', $dados);
        if ($excluir) {
            $dadosImg = array('noticia_md5' => $id_md5);

            $excluir = $this->generico->do_delete('img_noticia', $dadosImg);
            echo 'accept';
        } else {
            echo 'refused';
        }
    }


    public function exclui_imagem_noticia()
    {
        $noticia_md5 = $this->input->post('noticia_md5');
        $id = $this->input->post('id');

        $dados = array('noticia_md5' => $noticia_md5, 'id' => $id);

        $excluir = $this->generico->do_delete('img_noticia', $dados);
        if ($excluir) {
            echo 'accept';
        } else {
            echo 'refused';
        }
    }

    /************CONTATOS************/
    public function contatos()
    {
        if ($this->session->userdata('admin_logado')) {


            $uri = $this->uri->segment('3');

            if ($uri == 'visualizar') {
                $id_md5 = $this->uri->segment('4');

                $contatoDet = $this->generico->get_tudo_parametro($id_md5, 'id_md5', 'contato');

                if ($contatoDet) {

                    $dados = array(
                        'status' => 'S'
                    );

                    $atualiza = $this->generico->do_update($dados, array('id_md5' => $id_md5), 'contato', '');
                }

                $data['contatoDet'] = $contatoDet;
                $data['main_content'] = 'painel/p_contatos';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } else {
                $contatos = $this->generico->get_tudo('contato');

                $data['contatos'] = $contatos;
                $data['contatoDet'] = FALSE;
                $data['main_content'] = 'painel/p_contatos';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            }
        } else {

            redirect('painel');;
        }
    }

    /************NEWSLETTER************/
    public function newsletter()
    {
        if ($this->session->userdata('admin_logado')) {


            $uri = $this->uri->segment('3');

            if ($uri == 'visualizar') {
                $id_md5 = $this->uri->segment('4');

                $contatoDet = $this->generico->get_tudo_parametro($id_md5, 'id_md5', 'contato');

                if ($contatoDet) {

                    $dados = array(
                        'status' => 'S'
                    );

                    $atualiza = $this->generico->do_update($dados, array('id_md5' => $id_md5), 'contato', '');
                }

                $data['contatoDet'] = $contatoDet;
                $data['main_content'] = 'painel/p_contatos';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            } else {
                $newsletter = $this->generico->get_tudo('newsletter');

                $data['newsletter'] = $newsletter;
                $data['main_content'] = 'painel/p_newsletter';
                $data['titulo'] = 'Painel Administrativo TG distribuidora';
                $this->load->view('includes/template', $data);
            }
        } else {

            redirect('painel');;
        }
    }
}
