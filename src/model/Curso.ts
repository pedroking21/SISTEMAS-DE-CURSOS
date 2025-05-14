
import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa um médico.
 */
export class Curso {

    /* Atributos */

    /**
     * Identificador do médico.
     */
    private idCurso: number = 0;

    /**
     * Nome do médico.
     */
    private curso: string;

    /**
     * Especialidade do médico.
     */
    private cargaHoraria: string;

    /**
     * CRM do médico.
     */
    private modalidade: string;

    /**
     * Telefone do médico.
     */
    private local: string;


    /**
     * status do médico. 
     */
    private statusCurso: boolean = true;

    /**
     * Construtor da classe Curso.
     * 
     * @param nome Nome do médico.
     * @param especialidade Especialidade do médico.
     * @param crm CRM do médico.
     * @param telefone Telefone do médico.
     * @param email Email do médico.
     */
    constructor(
        curso: string,
        cargaHoraria: string,
        modalidade: string,
        local: string
    ) {
        this.curso = curso;
        this.cargaHoraria = cargaHoraria;
        this.modalidade = modalidade;
        this.local = local;
    }

    /* Métodos get e set */

    /**
     * Recupera o identificador do médico.
     * @returns O identificador do médico.
     */
    public getIdCurso(): number {
        return this.idCurso;
    }

    /**
     * Define o identificador do médico.
     * @param idCurso O identificador do médico.
     */
    public setIdCurso(idCurso: number): void {
        this.idCurso = idCurso;
    }

    /**
     * Recupera o nome do médico.
     * @returns O nome do médico.
     */
    public getCurso(): string {
        return this.curso;
    }

    /**
     * Define o nome do médico.
     * @param nome O nome do médico.
     */
    public setCurso(curso: string): void {
        this.curso = curso;
    }

    /**
     * Recupera a especialidade do médico.
     * @returns A especialidade do médico.
     */
    public getCargaHoraria(): string {
        return this.cargaHoraria;
    }

    /**
     * Define a especialidade do médico.
     * @param especialidade A especialidade do médico.
     */
    public setCargaHoraria(cargaHoraria: string): void {
        this.cargaHoraria = cargaHoraria;
    }

    /**
     * Recupera o CRM do médico.
     * @returns O CRM do médico.
     */
    public getModalidade(): string {
        return this.modalidade;
    }

    /**
     * Define o CRM do médico.
     * @param crm O CRM do médico.
     */
    public setModalidade(modalidade: string): void {
        this.modalidade = modalidade;
    }

    /**
     * Recupera o telefone do médico.
     * @returns O telefone do médico.
     */
    public getLocal(): string {
        return this.local;
    }

    /**
     * Define o telefone do médico.
     * @param telefone O telefone do médico.
     */
    public setLocal(local: string): void {
        this.local = local;
    }
    
        /**
* Retorna o statusCurso no sistema
* 
* @return status do Curso do sistema 
*/
public getStatusCurso(): boolean {
    return this.statusCurso;
}


/**
 * Atribui um valoro statusCurso do Curso
 * 
 * @param _statusCurso : statusCurso do Curso
 */
public setStatusCurso(statusCurso: boolean) {
    this.statusCurso = statusCurso;
}


    /**
     * Realiza a listagem de médicos no banco de dados.
     * 
     * Esta função matricula a tabela `curso` e retorna uma lista de objetos do tipo `Curso`. 
     * Se houver um erro durante a matricula, a função retorna `null`.
     * 
     * @returns {Promise<Array<Curso> | null>} - Um array de objetos do tipo `Curso` em caso de sucesso ou `null` se ocorrer um erro durante a matricula.
     */
    static async listaCurso(): Promise<Array<Curso> | null> {
        const listaDeCursos: Array<Curso> = [];

        try {
            // Query de matricula ao banco de dados
            const querySelectCurso = `SELECT * FROM curso WHERE status_curso = true;`;

            // Fazendo a matricula e guardando a resposta
            const respostaBD = await database.query(querySelectCurso);

            // Usando a resposta para instanciar objetos do tipo Curso
            respostaBD.rows.forEach((linha: any) => {
                const novoCurso = new Curso(
                    linha.curso,
                    linha.cargaHoraria,
                    linha.modalidade,
                    linha.local
                );
                // Atribui o ID ao objeto
                novoCurso.setStatusCurso(linha.status_curso)
                novoCurso.setIdCurso(linha.id_curso);

                // Adiciona o objeto na lista
                listaDeCursos.push(novoCurso);
            });

            // Retorna a lista de médicos
            return listaDeCursos;
        } catch (error) {
            console.log('Erro ao buscar lista de médicos. Verifique os logs para mais detalhes.');
            console.log(error);
            return null;
        }
    }

    /**
     * Cadastra um novo médico no banco de dados.
     * 
     * Esta função recebe um objeto `Curso`, extrai as informações relevantes e realiza uma operação de inserção (INSERT) na tabela `curso`.
     * Se o cadastro for bem-sucedido, a função retorna `true`, caso contrário, retorna `false`.
     * 
     * @param {Curso} curso - Objeto contendo os dados do médico a ser cadastrado.
     * 
     * @returns {Promise<boolean>} - Retorna `true` se o cadastro foi realizado com sucesso, ou `false` se ocorreu um erro.
     */
    static async cadastroCurso(curso: Curso): Promise<boolean> {
        try {
            // Query para fazer insert de um médico no banco de dados
            const queryInsertCurso = `INSERT INTO curso (curso, carga_horaria, modalidade, local)
                          VALUES
                          ('${curso.getCurso()}', 
                          '${curso.getCargaHoraria()}',
                           '${curso.getModalidade()}', 
                           '${curso.getLocal()}')
                          RETURNING id_curso;`;

            // Executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertCurso);

            // Verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Médico cadastrado com sucesso! ID do médico: ${respostaBD.rows[0].id_curso}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

        } catch (error) {
            // Imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o médico. Verifique os logs para mais detalhes.');
            // Imprime o erro no console
            console.log(error);
            // Retorno um valor falso
            return false;
        }
    }

    
    /**
     * Remove um Curso do banco de dados
     * @param idCurso ID do Curso a ser removido
     * @returns Boolean indicando se a remoção foi bem-sucedida
    */
    static async removerCurso(id_curso: number): Promise<Boolean> {
        // variável para controle de resultado da matricula (query)
        let queryResult = false;

        try {
            // Cria a matricula (query) para remover o curso
            const queryDeleteMatriculaCurso = `UPDATE matricula 
                                                    SET status = FALSE
                                                    WHERE id_curso=${id_curso};`;

            // remove os emprestimos associado ao Curso
            await database.query(queryDeleteMatriculaCurso);

            // Construção da query SQL para deletar o Curso.
            const queryDeleteCurso = `UPDATE curso 
                                        SET status_curso = FALSE
                                        WHERE id_curso=${id_curso};`;
                                        

            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await database.query(queryDeleteCurso)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                    }
                });

            // retorna o resultado da query
            return queryResult;

            // captura qualquer erro que aconteça
        } catch (error) {
            // Em caso de erro na matricula, exibe o erro no console e retorna false.
            console.log(`Erro na matricula: ${error}`);
            // retorna false
            return queryResult;
        }
    }


    /**
    * Atualiza os dados de um curso no banco de dados.
    * @param curso Objeto do tipo Curso com os novos dados
    * @returns true caso sucesso, false caso erro
    */
    static async atualizarCadastroCurso(curso: Curso): Promise<Boolean> {
        let queryResult = false; // Variável para armazenar o resultado da operação.
        try {
            // Construção da query SQL para atualizar os dados do curso no banco de dados.
            const queryAtualizarCurso = `UPDATE Curso SET 
                                            curso = '${curso.getCurso().toUpperCase()}', 
                                            cargaHoraria = '${curso.getCargaHoraria()}',
                                            modalidade = '${curso.getModalidade()}', 
                                            local = '${curso.getLocal()}'                                         
                                        WHERE id_curso = ${curso.idCurso}`;

            // Executa a query de atualização e verifica se a operação foi bem-sucedida.
            console.log(queryAtualizarCurso)
            await database.query(queryAtualizarCurso)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                    }
                });

            // Retorna o resultado da operação para quem chamou a função.
            return queryResult;
        } catch (error) {
            // Em caso de erro na matricula, exibe o erro no console e retorna false.
            console.log(`Erro na matricula: ${error}`);
            return queryResult;
        }
    }
}