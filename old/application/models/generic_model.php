<?php if (! defined('BASEPATH')) exit('No direct script access allowed');

/*
 * FUNÇÕES GENÉRICAS UTILIZADAS NO SMART FOOD
 * */

class Generic_model extends CI_Model
{

	// Passando data do banco "AAAA-MM-DD" para "DD/MM/AAAA"
	function mostraData($data)
	{
		if ($data != NULL) {
			return (substr($data, 8, 2) . '/' . substr($data, 5, 2) . '/' . substr($data, 0, 4));
		} else {
			return '';
		}
	}

	// Passando data do banco "AAAA-MM-DD HH-MM-SS" para "DD/MM/AAAA às HH-MM-SS"
	function mostraData_Hora($data)
	{
		if ($data != NULL) {
			return (substr($data, 8, 2) . '/' . substr($data, 5, 2) . '/' . substr($data, 0, 4) . ' às ' . substr($data, 11, 8));
		} else {
			return '';
		}
	}

	//funcao que lista dados cadastrados usando DISTINCT
	public function busca_dados_DISTINCT($campo, $tabela)
	{
		if ($campo != NULL && $tabela != NULL) {
			$this->db->distinct();
			$this->db->select($campo);
			$query = $this->db->get($tabela);
			return $query->result();
		}
	}

	//Função genérica para buscar quantidade de dados usando DISTINCT e passando parametro
	public function busca_dados_DISTINCT_parametro($campo1, $dado, $campo2, $tabela)
	{
		if ($campo1 != NULL && $dado != NULL && $campo2 != NULL && $tabela != NULL) {
			$this->db->distinct();
			$this->db->select($campo1);
			$this->db->where($campo2, $dado);
			$query = $this->db->get($tabela);
			return $query->num_rows();
		}
	}

	//Função genérica para buscar quantidade de dados usando DISTINCT e passando parametro (retorna RESULT() )
	public function busca_dados_DISTINCT_parametro_result($campo1, $dado, $campo2, $tabela)
	{
		if ($campo1 != NULL && $dado != NULL && $campo2 != NULL && $tabela != NULL) {
			$this->db->distinct();
			$this->db->select($campo1);
			$this->db->where($campo2, $dado);
			$query = $this->db->get($tabela);
			return $query->result();
		}
	}

	//Pega todos os dados da tabela
	public function get_tudo($tabela)
	{
		if ($tabela != NULL) {
			$query = $this->db->get($tabela);
			return $query->result();
		}
	}

	//Pega todos os dados da tabela
	public function get_tudo_order_by($campo_ordem, $ordem, $tabela)
	{
		if ($tabela != NULL) {
			$this->db->order_by($campo_ordem, $ordem);
			$query = $this->db->get($tabela);
			return $query->result();
		}
	}

	//Pega todos os dados da tabela (retorna RESULT())
	public function get_tudo_parametro($dado, $campo, $tabela)
	{
		if ($dado != NULL && $campo != NULL && $tabela != NULL) {
			$query = $this->db->get_where($tabela, array($campo => $dado));
			return $query->result();
		}
	}

	//Pega todos os dados da tabela (retorna RESULT())
	public function get_tudo_parametro_order_by($dado, $campo, $campo_ordem, $ordem, $tabela)
	{
		if ($dado != NULL && $campo != NULL && $tabela != NULL) {
			$this->db->where($campo, $dado);
			$this->db->order_by($campo_ordem, $ordem);
			$query = $this->db->get($tabela);
			return $query->result();
		}
	}

	//Pega todos os dados da tabela (retorna ROW())
	public function get_tudo_parametro_row($dado, $campo, $tabela)
	{
		if ($dado != NULL && $campo != NULL && $tabela != NULL) {
			$query = $this->db->get_where($tabela, array($campo => $dado));
			return $query->row();
		}
	}

	//Pega todos os dados da tabela conforme DOIS parametros passados (retorna result())
	/*
	 * A VARIAVEL RETORNO SIGNIFICA QUE A BUSCA NECESSITA RETORNAR APENAS UM CAMPO ESPECIFICO DA TABELA
	 * */
	public function get_tudo_dois_parametros($dado1, $campo1, $dado2, $campo2, $tabela, $retorno)
	{
		if ($dado1 != NULL && $campo1 != NULL && $dado2 != NULL && $campo2 != NULL && $tabela != NULL) {
			$this->db->where($campo1, $dado1);
			$this->db->where($campo2, $dado2);
			$query = $this->db->get($tabela);
			if ($retorno) {
				foreach ($query->result() as $row) {
					echo $row->$retorno;
				}
			} else {
				return $query->result();
			}
		}
	}

	//Pega todos os dados da tabela conforme DOIS parametros passados (retorna result())
	/*
	 * A VARIAVEL RETORNO SIGNIFICA QUE A BUSCA NECESSITA RETORNAR APENAS UM CAMPO ESPECIFICO DA TABELA
	 * */
	public function get_tudo_tres_parametros($dado1, $campo1, $dado2, $campo2, $dado3, $campo3, $tabela, $retorno)
	{
		if ($dado1 != NULL && $campo1 != NULL && $dado2 != NULL && $campo2 != NULL && $dado3 != NULL && $campo3 != NULL && $tabela != NULL) {
			$this->db->where($campo1, $dado1);
			$this->db->where($campo2, $dado2);
			$this->db->where($campo3, $dado3);
			$query = $this->db->get($tabela);
			if ($retorno) {
				foreach ($query->result() as $row) {
					echo $row->$retorno;
				}
			} else {
				return $query->result();
			}
		}
	}

	//Pega todos os dados da tabela usando BETWEEN conforme DOIS parametros passados (retorna result())
	/*
	 * A VARIAVEL RETORNO SIGNIFICA QUE A BUSCA NECESSITA RETORNAR APENAS UM CAMPO ESPECIFICO DA TABELA
	 * */
	public function get_tudo_between($campo, $dado1, $dado2, $tabela)
	{
		if ($campo != NULL && $dado1 != NULL && $dado2 != NULL && $tabela != NULL) {
			$this->db->where($campo . ' >=', $dado1);
			$this->db->where($campo . ' <=', $dado2);
			$query = $this->db->get($tabela);
			if ($query) {
				return $query->result();
			} else {
				return FALSE;
			}
		}
	}

	public function get_parametro_imagem($dado, $campo, $tabela, $retorno)
	{
		if ($dado != NULL && $campo != NULL && $tabela != NULL && $retorno != NULL) {
			if ($query = $this->db->get_where($tabela, array($campo => $dado))) {
				foreach ($query->result_array() as $row) {
					$img = $row[$retorno];
				}
				return $img;
			} else {
				return FALSE;
			}
		}
	}



	//Verifica se existe dado no banco conforme parametro passado (retorna num_rows())
	public function verifica_dado($dado, $campo, $tabela)
	{
		if ($dado != NULL && $campo != NULL && $tabela != NULL) {
			$query = $this->db->get_where($tabela, array($campo => $dado));
			return $query->num_rows();
		}
	}

	//Verifica se existe dado no banco conforme DOIS parametros passados (retorna num_rows())
	public function verifica_dado_dois_parametros($dado1, $campo1, $dado2, $campo2, $tabela)
	{
		if ($dado1 != NULL && $campo1 != NULL && $dado2 != NULL && $campo2 != NULL && $tabela != NULL) {
			$this->db->where($campo1, $dado1);
			$this->db->where($campo2, $dado2);
			$query = $this->db->get($tabela);
			return $query->num_rows();
		}
	}

	//Verifica se existe dado no banco conforme TRES parametros passados (retorna num_rows())
	public function verifica_dado_tres_parametros($dado1, $campo1, $dado2, $campo2, $dado3, $campo3, $tabela)
	{
		if ($dado1 != NULL && $campo1 != NULL && $dado2 != NULL && $campo2 != NULL && $tabela != NULL) {
			$this->db->where($campo1, $dado1);
			$this->db->where($campo2, $dado2);
			$this->db->where($campo3, $dado3);
			$query = $this->db->get($tabela);
			return $query->num_rows();
		}
	}

	//Função genérica de cadastro de dados em Array
	public function cadastra_dados($dados = NULL, $tabela = NULL)
	{
		if ($dados != NULL && $tabela != NULL) {
			if ($this->db->insert($tabela, $dados)) {
				return TRUE;
			} else {
				return FALSE;
			}
		}
	}
	//fim função genérica de cadastro de dados em Array

	//Atualizar dados
	public function do_update($dados = NULL, $condicao = NULL, $tabela = NULL, $flag = NULL)
	{
		if ($dados != NULL && $condicao != NULL) {
			if ($this->db->update($tabela, $dados, $condicao)) {
				return true;
			} else {
				return false;
			}
		}
	}

	/*
	 * DELETAR DADOS
	 * */
	public function do_delete($tabela = NULL, $dados = NULL)
	{
		if ($tabela != NULL && $dados != NULL) {
			if ($this->db->delete($tabela, $dados)) {
				return TRUE;
			} else {
				return FALSE;
			}
		} else {
			return FALSE;
		}
	}
}
