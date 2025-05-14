import { Request, Response } from "express";
import { Curso } from "../model/Curso";

interface CursoDTO {
    curso: string,
    cargaHoraria: string,
    modalidade: string,
    local: string,
}

export class CursoController {
    /**
     * Retorna a lista completa dos médicos.
     * @param req Objeto de entrada da requisição HTTP.
     * @param res Objeto de saída da resposta HTTP.
     * @returns JSON contendo os médicos e o status 200 se bem-sucedido.
     * @throws Retorna um status 400 e uma mensagem caso ocorra uma falha na listagem.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            const listaDeCursos = await Curso.listaCurso();
            return res.status(200).json(listaDeCursos);
        } catch (error) {
            console.log('Falha ao obter a lista de médicos');
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de médicos" });
        }
    }

    /**
     * Controlador responsável por cadastrar um novo médico.
     * @param req Objeto de requisição HTTP, com os dados do médico no formato `CursoDTO`.
     * @param res Objeto de resposta HTTP.
     * @returns Resposta com status 200 em caso de sucesso ou 400 para erro.
     */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            const cursoRecebido: CursoDTO = req.body;

            const novoCurso = new Curso(
                cursoRecebido.curso,
                cursoRecebido.cargaHoraria,
                cursoRecebido.modalidade,
                cursoRecebido.local,
            );

            const respostaClasse = await Curso.cadastroCurso(novoCurso);

            if (respostaClasse) {
                return res.status(200).json({ mensagem: "Médico cadastrado com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar o médico. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            console.log(`Falha no cadastro do médico. ${error}`);
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o médico. Entre em contato com o administrador do sistema." });
        }
    }

        /**
     * Remove um curso.
     * @param req Objeto de requisição HTTP com o ID do curso a ser removido.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
        static async remover(req: Request, res: Response): Promise<any> {
            try {
                const idCurso = parseInt(req.params.idCurso);
                const result = await Curso.removerCurso(idCurso);
                
                if (result) {
                    return res.status(200).json('Curso removido com sucesso');
                } else {
                    return res.status(401).json('Erro ao deletar Curso');
                }
            } catch (error) {
                console.log("Erro ao remover o Curso");
                console.log(error);
                return res.status(500).send("error");
            }
        }
    
        /**
         * Método para atualizar o cadastro de um Curso.
         * 
         * @param req Objeto de requisição do Express, contendo os dados atualizados do Curso
         * @param res Objeto de resposta do Express
         * @returns Retorna uma resposta HTTP indicando sucesso ou falha na atualização
         */
        static async atualizar(req: Request, res: Response): Promise<any> {
            try {
                // Desestruturando objeto recebido pelo front-end
                const dadosRecebidos: CursoDTO = req.body;
                
                // Instanciando objeto Curso
                const curso = new Curso(
                    dadosRecebidos.curso,
                    dadosRecebidos.cargaHoraria,
                    dadosRecebidos.modalidade,
                    dadosRecebidos.local,         
                );
    
                // Define o ID do Curso, que deve ser passado na query string
                curso.setIdCurso(parseInt(req.params.idCurso));
    
                console.log(dadosRecebidos);
    
                // Chama o método para atualizar o cadastro do Curso no banco de dados
                if (await Curso.atualizarCadastroCurso(curso)) {
                    return res.status(200).json({ mensagem: "Curso atualizado com sucesso!" });
                } else {
                    return res.status(400).json('Não foi possível atualizar o Curso no banco de dados');
                }
            } catch (error) {
                // Caso ocorra algum erro, este é registrado nos logs do servidor
                console.error(`Erro no modelo: ${error}`);
                // Retorna uma resposta com uma mensagem de erro
                return res.json({ mensagem: "Erro ao atualizar Curso." });
            }
        }
}


