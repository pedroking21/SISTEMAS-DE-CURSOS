CREATE TABLE Aluno (
    id_aluno SERIAL PRIMARY KEY,
	nome VARCHAR (80) NOT NULL,
    cpf VARCHAR (20) UNIQUE NOT NULL,
    telefone VARCHAR (20) NOT NULL,
	email VARCHAR (80),
	data_nascimento DATE,
    endereco VARCHAR (200)
);

ALTER TABLE Aluno ADD COLUMN status_aluno BOOLEAN DEFAULT TRUE;
-- Inserção de exemplo para Aluno
INSERT INTO Aluno (nome, cpf, telefone, email, data_nascimento, endereco)
VALUES 
('João Silva', '123.456.789-00', '(11) 98765-4321', 'joao.silva@email.com', '1990-05-14', 'Rua das Flores, 123, São Paulo, SP'),
('Maria Oliveira', '987.654.321-00', '(21) 99876-5432', 'maria.oliveira@email.com', '1985-10-20', 'Avenida Brasil, 456, Rio de Janeiro, RJ');

-- Criação da tabela Curso
CREATE TABLE Curso (
    id_curso SERIAL PRIMARY KEY,
    curso VARCHAR(255) NOT NULL,
    carga_horaria VARCHAR(50) NOT NULL,
    modalidade VARCHAR(50) NOT NULL,
    local VARCHAR(255) NOT NULL
);

-- Inserção de exemplo para Curso
INSERT INTO Curso (curso, carga_horaria, modalidade, local)
VALUES 
('Matemática Básica', '40 horas', 'Presencial', 'São Paulo - SP'),
('Programação em Python', '60 horas', 'Online', 'Plataforma EAD');

ALTER TABLE Curso ADD COLUMN status_curso BOOLEAN DEFAULT TRUE;

SELECT * FROM matricula

-- Criação da tabela Matricula
CREATE TABLE Matricula (
    id_matricula SERIAL PRIMARY KEY,
    id_aluno INT NOT NULL,
    id_curso INT NOT NULL,
    data_matricula DATE NOT NULL,
    status BOOLEAN NOT NULL
);

-- Inserção de exemplo para Matricula
INSERT INTO Matricula (id_aluno, id_curso, data_matricula, status)
VALUES 
(1, 1, '2025-05-14', TRUE),
(2, 2, '2025-05-14', FALSE);