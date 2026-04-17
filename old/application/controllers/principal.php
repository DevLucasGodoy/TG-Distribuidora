<?php if (! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * @property CI_Loader $load
 * @property CI_Session $session
 * @property CI_Input $input
 * @property CI_DB_active_record $db
 * @property CI_URI $uri
 * @property Generic_model $generico
 */
class Principal extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('generic_model', 'generico');
    }

    public function index()
    {
        $banners = $this->generico->get_tudo_parametro('S', 'status', 'banners');

        $destaques = $this->generico->get_tudo_dois_parametros('S', 'status', 'S', 'destaque', 'produtos', '');

        $data['banners'] = $banners;
        $data['destaques'] = $destaques;
        $data['main_content'] = 'principal';
        $data['titulo'] = 'TG distribuidora';
        $this->load->view('includes/template', $data);
    }
}
