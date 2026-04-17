<?php if (! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * @property CI_Loader $load
 * @property CI_Session $session
 * @property CI_Input $input
 * @property CI_DB_active_record $db
 * @property CI_URI $uri
 * @property CI_Email $email
 * @property Generic_model $generico
 */
class Contato extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('generic_model', 'generico');
    }

    public function index()
    {
        $data['main_content'] = 'contato';
        $data['titulo'] = 'TG distribuidora';
        $this->load->view('includes/template', $data);
    }

    public function addContato()
    {

        $nome = trim($this->input->post('nome'));
        $email = trim($this->input->post('email'));
        $assunto = trim($this->input->post('assunto'));
        $msg = trim($this->input->post('msg'));

        if ($nome && $email && $assunto && $msg) {

            $dados = array(
                'nome' => $nome,
                'email' => $email,
                'assunto' => $assunto,
                'msg' => $msg,
                'data_cad' => date('Y-m-d'),
                'id_md5' => md5($email . date('Y-m-d H:i:s'))
            );

            $cadastro = $this->generico->cadastra_dados($dados, 'contato');

            if ($cadastro) {
                echo 'accept';
            } else {
                echo "refused";
            }
        } else {
            echo "refused";
        }
    }

    public function newsletter()
    {

        $email = trim($this->input->post('email'));

        if ($email) {

            $this->db->where('email', $email);
            $query = $this->db->get('newsletter');
            if ($query->num_rows >= 1) {
                echo 'indisponivel';
            } else {
                $dados = array(
                    'email' => $email,
                    'data_cad' => date('Y-m-d')
                );

                $cadastro = $this->generico->cadastra_dados($dados, 'newsletter');

                if ($cadastro) {
                    echo 'accept';
                } else {
                    echo "refused";
                }
            }
        } else {
            echo "refused";
        }
    }
}
