<?php if (! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * @property CI_Loader $load
 * @property CI_Session $session
 * @property CI_Input $input
 * @property CI_DB_active_record $db
 * @property CI_URI $uri
 * @property Generic_model $generico
 */
class Produtos extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('generic_model', 'generico');
    }

    public function index()
    {

        $produtos = $this->generico->get_tudo_dois_parametros('S', 'status', 'S', 'destaque', 'produtos', '');

        $data['produtos'] = $produtos;
        $data['main_content'] = 'produtos';
        $data['titulo'] = 'TG distribuidora';
        $this->load->view('includes/template', $data);
    }

    public function categoria()
    {

        $ci_md5 = $this->uri->segment('3');

        if ($ci_md5) {
            $dadosCat = $this->generico->get_tudo_parametro($ci_md5, 'id_md5', 'categorias');

            if ($dadosCat) {

                $produtosCat = $this->generico->get_tudo_dois_parametros('S', 'status', $ci_md5, 'id_cat_md5', 'produtos', '');

                $data['dadosCat'] = $dadosCat;
                $data['produtosCat'] = $produtosCat;
                $data['main_content'] = 'categoria';
                $data['titulo'] = 'TG distribuidora';
                $this->load->view('includes/template', $data);
            } else {
                $produtosCat = $this->generico->get_tudo_dois_parametros('S', 'status', $ci_md5, 'id_cat_md5', 'produtos', '');

                $data['dadosCat'] = '';
                $data['produtosCat'] = '';
                $data['main_content'] = 'categoria';
                $data['titulo'] = 'TG distribuidora';
                $this->load->view('includes/template', $data);
            }
        } else {
            redirect(base_url('produtos'));
        }
    }

    public function subcategoria()
    {

        $ci_md5 = $this->uri->segment('3');

        if ($ci_md5) {
            $dadosSubCat = $this->generico->get_tudo_parametro($ci_md5, 'id_md5', 'subcategorias');

            if ($dadosSubCat) {

                $produtosSubCat = $this->generico->get_tudo_dois_parametros('S', 'status', $ci_md5, 'id_sub_md5', 'produtos', '');

                $data['dadosSubCat'] = $dadosSubCat;
                $data['produtosSubCat'] = $produtosSubCat;
                $data['main_content'] = 'subcategoria';
                $data['titulo'] = 'TG distribuidora';
                $this->load->view('includes/template', $data);
            } else {
                $produtosCat = $this->generico->get_tudo_dois_parametros('S', 'status', $ci_md5, 'id_sub_md5', 'produtos', '');

                $data['dadosSubCat'] = '';
                $data['produtosSubCat'] = '';
                $data['main_content'] = 'subcategoria';
                $data['titulo'] = 'TG distribuidora';
                $this->load->view('includes/template', $data);
            }
        } else {
            redirect(base_url('produtos'));
        }
    }

    public function detalhes()
    {

        $url_produto = $this->uri->segment('3');

        if ($url_produto) {
            $dadosProduto = $this->generico->get_tudo_parametro($url_produto, 'url_produto', 'produtos');

            if ($dadosProduto) {


                $data['dadosProduto'] = $dadosProduto;
                $data['main_content'] = 'detalhes';
                $data['titulo'] = 'TG distribuidora';
                $this->load->view('includes/template', $data);
            } else {

                $data['dadosProduto'] = '';
                $data['main_content'] = 'detalhes';
                $data['titulo'] = 'TG distribuidora';
                $this->load->view('includes/template', $data);
            }
        } else {
            redirect(base_url('produtos'));
        }
    }

    public function buscaImg()
    {

        $id = trim($this->input->post('ci'));

        $busca = $this->generico->get_tudo_parametro($id, 'id', 'img_produtos');

        echo json_encode($busca);
    }

    public function busca()
    {

        $busca = trim($this->input->post('busca'));

        if ($busca) {

            $buscaLike = $this->db->escape_like_str($busca);

            $query = $this->db->query("SELECT * FROM produtos WHERE codigo LIKE ? ESCAPE '!'", array('%' . $buscaLike . '%'));
            $busca_num = $query->num_rows();
            $busca_result = $query->result();
            if (!$busca_result) {

                $query2 = $this->db->query("SELECT * FROM produtos WHERE nome LIKE ? ESCAPE '!'", array('%' . $buscaLike . '%'));
                $busca_num = $query2->num_rows();
                $busca_result = $query2->result();
            }

            $data['busca_num'] = $busca_num;
            $data['busca_result'] = $busca_result;
            $data['main_content'] = 'busca';
            $data['titulo'] = 'TG distribuidora';
            $this->load->view('includes/template', $data);
        } else {
            redirect(base_url('.'));
        }
    }
}
