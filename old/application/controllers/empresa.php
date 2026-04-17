<?php if (! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * @property CI_Loader $load
 * @property CI_Session $session
 * @property CI_Input $input
 * @property CI_DB_active_record $db
 * @property CI_URI $uri
 * @property Generic_model $generico
 */
class Empresa extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('generic_model', 'generico');
    }

    public function index()
    {

        $empresa = $this->generico->get_tudo('empresa');
        $imagensEmpresa = $this->generico->get_tudo('img_empresa');

        $data['empresa'] = $empresa;
        $data['imagensEmpresa'] = $imagensEmpresa;
        $data['main_content'] = 'empresa';
        $data['titulo'] = 'TG distribuidora';
        $this->load->view('includes/template', $data);
    }
}
