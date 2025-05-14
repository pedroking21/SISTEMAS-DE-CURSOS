import { Request, Response } from "express";
import { Matricula } from "../model/Matricula";

interface MatriculaDTO {
    idAluno: number,
    idCurso: number,
    dataMatricula: Date,
    status: boolean
}

/**
 * A classe `MatriculaController` estende a classe `Matricula` e é responsável por controlar as requisições relacionadas aos Emprestimos.
 * 
 * - Esta classe atua como um controlador dentro de uma API REST, gerenciando as operações relacionadas ao recurso "Emprestimo".
 * - Herdando de `Matricula`, ela pode acessar métodos e propriedades da classe base.
 */
export class MatriculaController extends Matricula {

    /**
    * Lista todos os Matricula.
    * @param req Objeto de requisição HTTP.
    * @param res Objeto de resposta HTTP.
    * @returns Lista de Matricula em formato JSON com status 200 em caso de sucesso.
    * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de Emprestimos.
    */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // acessa a função de listar os Matricula e armazena o resultado
            const listaDeMatricula = await Matricula.listagemMatricula();

            // retorna a lista de Matricula há quem fez a requisição web
            return res.status(200).json(listaDeMatricula);
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de Matricula');

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de Matricula" });
        }
    }

    /**
    * Método controller para cadastrar um novo Matricula.
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um Matricula no corpo da requisição
    * e tenta cadastrar este Matricula no banco de dados utilizando a função `cadastroMatricula`. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do Matricula no formato `EmprestimoDTO`.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
    * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
    */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            const matriculaRecebida: MatriculaDTO = {
                ...req.body,
                idAluno: parseInt(req.body.idAluno), // Conversão direta
                idCurso: parseInt(req.body.idCurso)
            };
    
            const novoMatricula = new Matricula(
                matriculaRecebida.idAluno,
                matriculaRecebida.idCurso,
                matriculaRecebida.dataMatricula,
                matriculaRecebida.status
            );    
            const repostaClasse = await Matricula.cadastroMatricula(novoMatricula);
    
            if (repostaClasse) {
                return res.status(200).json({ mensagem: "Matricula cadastrada com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar a Matricula. Entre em contato com o administrador do sistema." });
            }
    
        } catch (error) {
            console.log(`Erro ao cadastrar um Matricula. ${error}`);
            return res.status(400).json({ mensagem: "Não foi possível cadastrar  Matricula. Entre em contato com o administrador do sistema." });
        }
    }

    static async remover(req: Request, res: Response): Promise<any> {
        console.log("chegou");
        try {
            const idMatricula = parseInt(req.params.idMatricula);
            const result = await Matricula.removerMatricula(idMatricula);

            if (result) {
                return res.status(200).json('Matricula removida com sucesso');
            } else {
                return res.status(401).json('Erro ao deletar a matricula');
            }
        } catch (error) {
            console.log("Erro ao remover a matricula");
            console.log(error);
            return res.status(500).send("error");
        }
    }
    /**
     * Método para atualizar o cadastro de um matricula.
     * 
     * @param req Objeto de requisição do Express, contendo os dados atualizados do matricula
     * @param res Objeto de resposta do Express
     * @returns Retorna uma resposta HTTP indicando sucesso ou falha na atualização
     */
    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            // Desestruturando objeto recebido pelo front-end
            const dadosRecebidos: MatriculaDTO = req.body;

            // Instanciando objeto matricula
            const matricula = new Matricula(
                dadosRecebidos.idAluno,
                dadosRecebidos.idCurso,
                dadosRecebidos.dataMatricula,
                dadosRecebidos.status
            );

            // Define o ID do matricula, que deve ser passado na query string
            matricula.setIdMatricula(parseInt(req.params.idMatricula));
            
            console.log(dadosRecebidos);

            // Chama o método para atualizar o cadastro do matricula no banco de dados
            if (await Matricula.atualizarCadastroMatricula(matricula)) {
                return res.status(200).json({ mensagem: "Matricula atualizada com sucesso!" });
            } else {
                return res.status(400).json('Não foi possível atualizar o matricula no banco de dados');
            }
        } catch (error) {
            // Caso ocorra algum erro, este é registrado nos logs do servidor
            console.error(`Erro no modelo: ${error}`);
            // Retorna uma resposta com uma mensagem de erro
            return res.json({ mensagem: "Erro ao atualizar matricula." });
        }

    }
}

export default MatriculaController;
