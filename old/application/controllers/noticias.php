<?php if (! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * @property CI_Loader $load
 * @property CI_Session $session
 * @property CI_Input $input
 * @property CI_DB_active_record $db
 * @property CI_URI $uri
 * @property Generic_model $generico
 */
class Noticias extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('generic_model', 'generico');
    }

    public function index()
    {
        $noticias = $this->generico->get_tudo_dois_parametros('S', 'status', 'N', 'destaque', 'noticias', '');
        $noticiasDest = $this->generico->get_tudo_dois_parametros('S', 'status', 'S', 'destaque', 'noticias', '');

        $data['noticiasDest'] = $noticiasDest;
        $data['noticias'] = $noticias;
        $data['main_content'] = 'noticias';
        $data['titulo'] = 'TG distribuidora';
        $this->load->view('includes/template', $data);
    }

    public function detalhes()
    {
        $id_md5 = $this->uri->segment('3');

        if ($id_md5) {
            $noticia = $this->generico->get_tudo_dois_parametros('S', 'status', $id_md5, 'id_md5', 'noticias', '');

            if ($noticia) {

                $img_noticia = $this->generico->get_tudo_parametro($id_md5, 'noticia_md5', 'img_noticia');

                $data['noticia'] = $noticia;
                $data['img_noticia'] = $img_noticia;
                $data['main_content'] = 'detalhes_noticia';
                $data['titulo'] = 'TG distribuidora';
                $this->load->view('includes/template', $data);
            } else {
                redirect('noticias');
            }
        } else {
            redirect('noticias');
        }
    }
}
