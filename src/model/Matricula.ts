import { DatabaseModel } from "./DatabaseModel";

// Armazena o pool de conexões com o banco de dados
const database = new DatabaseModel().pool;

/**
 * Classe que representa uma Matricula.
 */
export class Matricula {

    /* Atributos */

    /**
     * Identificador da matricula.
     */
    private idMatricula: number = 0;

  
    /**
     * Número da sala de atendimento.
     */
    private idAluno: number;

    /**
     * Número da sala de atendimento.
     */
    private idCurso: number;

    /**
     * Número da sala de atendimento.
     */
    private dataMatricula: Date;

    /**
     * Status da matricula (por exemplo, "agendada", "realizada", etc.).
     */
    private status: boolean = true;

    /**
     * Construtor da classe Matricula.
     * 
     * @param nome Nome do paciente.
     * @param data Data da matricula.
     * @param hora Hora da matricula.
     * @param diagnostico Diagnóstico realizado.
     * @param receita Receita médica fornecida.
     * @param salaAtendimento Sala de atendimento.
     
     */
    constructor(
        idAluno: number,
        idCurso: number,
        dataMatricula: Date,
        status: boolean        
    ) {
        this.idAluno = idAluno;
        this.idCurso = idCurso;
        this.dataMatricula = dataMatricula;
        this.status = status;
    }


    /* Métodos get e set */

    /**
     * Recupera o identificador da matricula.
     * @returns O identificador da matricula.
     */
    public getIdMatricula(): number {
        return this.idMatricula;
    }

    /**
     * Define o identificador da matricula.
     * @param idMatricula O identificador da matricula.
     */
    public setIdMatricula(idMatricula: number): void {
        this.idMatricula = idMatricula;
    }


    /**
 * Recupera o identificador da matricula.
 * @returns O identificador da matricula.
 */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Define o identificador da matricula.
     * @param idMatricula O identificador da matricula.
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    /**
* Recupera o identificador da matricula.
* @returns O identificador da matricula.
*/
    public getIdCurso(): number {
        return this.idCurso;
    }

    /**
     * Define o identificador da matricula.
     * @param idMatricula O identificador da matricula.
     */
    public setIdCurso(idCurso: number): void {
        this.idCurso = idCurso;
    }

    /**
     * Recupera o nome do paciente.
     * @returns O nome do paciente.
     */
    public getDataMatricula(): Date {
        return this.dataMatricula;
  
    }

    /**
     * Define o nome do paciente.
     * @param nome O nome do paciente.
     */
    public setDataMatricula(dataMatricula: Date): void {
        this.dataMatricula = dataMatricula;
    }

    /**
     * Recupera a data da matricula.
     * @returns A data da matricula.
     */
    public getStatus(): boolean {
        return this.status;
    }

public setStatus(status: boolean): void {
    this.status = status;
}

/**
* Busca e retorna uma lista de Matricula do banco de dados.
* @returns Um array de objetos do tipo `Matricula` em caso de sucesso ou `null` se ocorrer um erro durante a matricula.
* 
* - A função realiza uma matricula SQL para obter todas as informações da tabela "Matricula".
* - Os dados retornados do banco de dados são usados para instanciar objetos da classe `Matricula`.
* - Cada Matricula é adicionado a uma lista que será retornada ao final da execução.
* - Se houver falha na matricula ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
*/
static async listagemMatricula(): Promise<Array<Matricula> | null> {
        // objeto para armazenar a lista de Matricula
        const listaDeMatricula: Array<Matricula> = [];

        try {
            // query de matricula ao banco de dados
            const querySelectMatricula = `SELECT * FROM matricula WHERE status = true;`;

            // fazendo a matricula e guardando a resposta
            const respostaBD = await database.query(querySelectMatricula);

            // usando a resposta para instanciar um objeto do tipo Matricula
            respostaBD.rows.forEach((linha: any) => {
                // instancia (cria) objeto Matricula
                const novoMatricula = new Matricula(
                    linha.idAluno,
                    linha.idCurso,
                    linha.dataMatricula,
                    linha.status
                );

                // atribui o ID objeto
                novoMatricula.setIdMatricula(linha.id_matricula);
                novoMatricula.setIdAluno(linha.idAluno);

                // adiciona o objeto na lista
                listaDeMatricula.push(novoMatricula);

                console.log(novoMatricula)
            });

            // retorna a lista de Matricula
            return listaDeMatricula;
        } catch (error) {
            console.log('Erro ao buscar lista de Matricula');
            return null;
        }
    }

    /**
     * Realiza o cadastro de um Matricula no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Matricula` e insere seus dados (marca, modelo, ano e cor)
     * na tabela `Matricula` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Matricula} matricula - Objeto contendo os dados do Matricula que será cadastrado. O objeto `Matricula`
     *                        deve conter os métodos `getMarca()`, `getModelo()`, `getAno()` e `getCor()`
     *                        que retornam os respectivos valores do Matricula.
     * @returns {Promise<boolean>} - Retorna `true` se o Matricula foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
    static async cadastroMatricula(matricula: Matricula): Promise<boolean> {
        try {
            // query para fazer insert de um Matricula no banco de dados
            const queryInsertMatricula = `INSERT INTO Matricula (id_aluno, id_curso, data_matricula, status)
                                        VALUES ( 
                                            '${matricula.getIdAluno()}',
                                            '${matricula.getIdCurso()}',
                                            '${matricula.getDataMatricula()}',
                                            '${matricula.getStatus()}'
                                            )
                                               RETURNING id_matricula;`;

            console.log(queryInsertMatricula);

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertMatricula);

            console.log(respostaBD)

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Matricula cadastrado com sucesso! ID da Matricula: ${respostaBD.rows[0].id_matricula}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o Matricula. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }

    /**
         * Remove um matricula do banco de dados.
         * 
         * A função realiza a desativação do matricula e suas matriculas associadas no banco de dados.
         * 
         * @param id_matricula Identificador único do matricula a ser removido
         * @returns {Promise<boolean>} Retorna true se a operação foi bem-sucedida, e false em caso de erro.
         */
    static async removerMatricula(id_matricula: number): Promise<Boolean> {
        let queryResult = false;

        try {
            // Atualiza o status da matricula para indicar que o Matricula não está mais ativo
            const queryDeleteMatricula = `UPDATE matricula 
                                                    SET status_matricula_registro = FALSE
                                                    WHERE id_matricula=${id_matricula};`;

            // Executa a atualização de status do Matricula
            await database.query(queryDeleteMatricula)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Operação bem-sucedida
                    }
                });

            return queryResult; // Retorna o resultado da operação

        } catch (error) {
            console.log(`Erro na matricula: ${error}`);
            return queryResult; // Retorna false em caso de erro
        }
    }

    /**
     * Atualiza os dados de um Matricula no banco de dados.
     * 
     * @param matricula Objeto do tipo Matricula com os novos dados
     * @returns {boolean} Retorna true em caso de sucesso, false em caso de erro
     */
    static async atualizarCadastroMatricula(matricula: Matricula): Promise<Boolean> {
        let queryResult = false; // Variável para armazenar o resultado da operação.

        try {
            // Matricula SQL para atualizar os dados do paciente
            const queryAtualizarMatricula = `UPDATE matricula
                                                SET id_aluno = ${matricula.getIdAluno()},
                                                    id_curso = ${matricula.getIdCurso()},
                                                    data_matricula = '${matricula.getDataMatricula()}',
                                                    status = ${matricula.getStatus()}                                                                                            
                                                WHERE id_matricula=${matricula.idMatricula};`;

            // Executa a matricula de atualização
            console.log(queryAtualizarMatricula);
            await database.query(queryAtualizarMatricula)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Operação bem-sucedida
                    }
                });

            return queryResult; // Retorna o resultado da operação

        } catch (error) {
            console.log(`Erro na matricula: ${error}`);
            return queryResult; // Retorna false em caso de erro
        }
    }
}

