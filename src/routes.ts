import { Request, Response, Router } from "express";
import { CursoController } from "./controller/CursoController";
import { MatriculaController } from "./controller/MatriculaController";
import { AlunoController } from "./controller/AlunoController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Olá, Mundo!" });
});

/* 
* ROTAS PARA MÉDICOS
*/ 
// Rota para listar os cursos
router.get("/listar/cursos", CursoController.todos);
// Rota para cadastrar um novo curso
router.post("/cadastro/curso", CursoController.novo);
// Rota para deletar um novo curso
router.put("/remover/curso/:idCurso", CursoController.remover);
// Rota para atualizar um novo curso
router.put("/atualizar/curso/:idCurso", CursoController.atualizar);


/* 
* ROTAS PARA PACIENTES
*/ 
// Rota para listar os alunos
router.get("/listar/alunos", AlunoController.todos);
// Rota para cadastrar um novo aluno
router.post("/cadastro/aluno", AlunoController.novo);
// Rota para deletar um novo aluno
router.put("/remover/aluno/:idAluno", AlunoController.remover);
// Rota para atualizar um novo aluno
router.put("/atualizar/aluno/:idAluno", AlunoController.atualizar);


/* 
* ROTAS PARA CONSULTAS
*/ 
// Rota para listar as matriculas
router.get("/listar/matricula", MatriculaController.todos);
// Rota para cadastrar uma nova matricula
router.post("/cadastro/matricula", MatriculaController.novo);
// Rota para deltar uma nova matricula
router.put("/remover/matricula/:idMatricula", MatriculaController.remover);
// Rota para atualizar uma nova matricula
router.put("/atualizar/matricula/:idMatricula", MatriculaController.atualizar);



export { router };