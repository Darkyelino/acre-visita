SET FOREIGN_KEY_CHECKS=0;

-- ===================================================================================
-- 1. TABELAS SEM DEPENDÊNCIAS (Nacionalidade, Setor, Auditório)
-- Nenhuma alteração aqui.
-- ===================================================================================

-- Inserindo Nacionalidades
INSERT INTO nacionalidade_visitante (id_nacionalidade, nacionalidade) VALUES
(1, 'Brasileira'),
(2, 'Estrangeira');

-- Inserindo Setores
INSERT INTO setor (id_setor, nome_setor, tipo_setor) VALUES
(1, 'Recepção Principal', 'MUSEU'),
(2, 'Biblioteca Central', 'BIBLIOTECA'),
(3, 'Administração Geral', 'ADMINISTRATIVO'),
(4, 'Ala de Exposições Temporárias', 'MUSEU');

-- Inserindo Auditório
INSERT INTO auditorio (id_auditorio, nome_auditorio, disponibilidade, local_auditorio_id_setor) VALUES
(1, 'Auditório Jorge Amado', true, 1),
(2, 'Sala Chico Mendes', true, 2),
(3, 'Anfiteatro Ziraldo', true, 4),
(4, 'Auditório Clarice Lispector', false, 1),
(5, 'Sala de Projeção Galvez', true, 4);


-- ===================================================================================
-- 2. NOVA TABELA UNIFICADA 'USUARIO'
-- As tabelas Administrador, Atendente, Coordenador e Visitante foram removidas.
-- As senhas agora são hashes BCrypt. A senha para todos os usuários abaixo é "senha123".
-- ===================================================================================

INSERT INTO usuario (id, nome, email, senha, papel, telefone, id_nacionalidade, id_setor) VALUES
-- Visitantes (10 no total)
(1, 'Ana Clara Silva', 'ana.silva@email.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'VISITANTE', '(68) 99988-7766', 1, NULL),
(2, 'John Smith', 'john.smith@email.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'VISITANTE', '+1 555-0101', 2, NULL),
(3, 'Carlos Garcia', 'carlos.garcia@email.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'VISITANTE', '+54 9 11 1234-5678', 2, NULL),
(4, 'Beatriz Oliveira', 'beatriz.oliveira@email.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'VISITANTE', '(68) 98877-6655', 1, NULL),
(5, 'Lucas Pereira', 'lucas.pereira@email.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'VISITANTE', '(68) 97766-5544', 1, NULL),
(6, 'Sofia Rodriguez', 'sofia.rodriguez@email.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'VISITANTE', '+591 6 1234-5678', 2, NULL),
(7, 'Davi Martins', 'davi.martins@email.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'VISITANTE', '(68) 96655-4433', 1, NULL),
(8, 'Isabela Souza', 'isabela.souza@email.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'VISITANTE', '(68) 95544-3322', 1, NULL),
(9, 'Mateo Gonzales', 'mateo.gonzales@email.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'VISITANTE', '+51 9 1234-5678', 2, NULL),
(10, 'Laura Fernandes', 'laura.fernandes@email.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'VISITANTE', '(68) 94433-2211', 1, NULL),

-- Administradores (10 no total)
(11, 'Roberto Medeiros', 'roberto.adm@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ADMINISTRADOR', NULL, NULL, 3),
(12, 'Sandra Nunes', 'sandra.adm@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ADMINISTRADOR', NULL, NULL, 3),
(13, 'Ricardo Alves', 'ricardo.adm@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ADMINISTRADOR', NULL, NULL, 3),
(14, 'Fernanda Lima', 'fernanda.adm@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ADMINISTRADOR', NULL, NULL, 3),
(15, 'Gustavo Barbosa', 'gustavo.adm@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ADMINISTRADOR', NULL, NULL, 3),
(16, 'Patrícia Barros', 'patricia.adm@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ADMINISTRADOR', NULL, NULL, 3),
(17, 'Marcelo Rocha', 'marcelo.adm@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ADMINISTRADOR', NULL, NULL, 3),
(18, 'Vanessa Dias', 'vanessa.adm@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ADMINISTRADOR', NULL, NULL, 3),
(19, 'Tiago Pinto', 'tiago.adm@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ADMINISTRADOR', NULL, NULL, 3),
(20, 'Juliana Castro', 'juliana.adm@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ADMINISTRADOR', NULL, NULL, 3),

-- Atendentes (10 no total)
(21, 'Mariana Costa', 'mariana.atendente@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ATENDENTE', NULL, NULL, 1),
(22, 'Carlos Eduardo', 'carlos.atendente@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ATENDENTE', NULL, NULL, 1),
(23, 'Leticia Farias', 'leticia.atendente@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ATENDENTE', NULL, NULL, 4),
(24, 'Bruno Gomes', 'bruno.atendente@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ATENDENTE', NULL, NULL, 1),
(25, 'Amanda Azevedo', 'amanda.atendente@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ATENDENTE', NULL, NULL, 4),
(26, 'Rafael Moraes', 'rafael.atendente@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ATENDENTE', NULL, NULL, 1),
(27, 'Gabriela Neves', 'gabriela.atendente@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ATENDENTE', NULL, NULL, 1),
(28, 'Vinicius Ramos', 'vinicius.atendente@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ATENDENTE', NULL, NULL, 4),
(29, 'Larissa Ribeiro', 'larissa.atendente@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ATENDENTE', NULL, NULL, 1),
(30, 'Eduardo Carvalho', 'eduardo.atendente@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'ATENDENTE', NULL, NULL, 1),

-- Coordenadores (10 no total)
(31, 'Felipe Andrade', 'felipe.coord@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'COORDENADOR', NULL, NULL, 2),
(32, 'Camila Santos', 'camila.coord@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'COORDENADOR', NULL, NULL, 4),
(33, 'Daniel Moreira', 'daniel.coord@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'COORDENADOR', NULL, NULL, 2),
(34, 'Renata Monteiro', 'renata.coord@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'COORDENADOR', NULL, NULL, 4),
(35, 'Leonardo Ferreira', 'leonardo.coord@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'COORDENADOR', NULL, NULL, 2),
(36, 'Clara Cunha', 'clara.coord@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'COORDENADOR', NULL, NULL, 4),
(37, 'André Correia', 'andre.coord@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'COORDENADOR', NULL, NULL, 2),
(38, 'Tatiana Melo', 'tatiana.coord@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'COORDENADOR', NULL, NULL, 4),
(39, 'Sérgio Teixeira', 'sergio.coord@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'COORDENADOR', NULL, NULL, 2),
(40, 'Helena Viana', 'helena.coord@acrevisita.com', '$2a$12$IZOv3J8HrSLJT8qH.YzgB.sdlO5v0Ichs1p45TNekGUMGgXSp5FGK', 'COORDENADOR', NULL, NULL, 4);

-- ===================================================================================
-- 3. TABELAS DEPENDENTES
-- As chaves estrangeiras que apontavam para 'visitante' agora apontam para 'usuario'.
-- ATENÇÃO: Verifique se suas entidades Java (DocVisitante, Feedback, etc.) também foram
-- atualizadas para se relacionarem com 'Usuario' em vez de 'Visitante'.
-- ===================================================================================

-- Inserindo Documento para alguns usuários
-- A coluna 'id_visitante' foi renomeada para 'usuario_id'
INSERT INTO doc_visitante (id_documento, tipo, numero, usuario_id) VALUES
(1, 'RG', '1234567 SSP/AC', 1), -- Ana Clara (ID 1)
(2, 'Passaporte', 'A1B2C3D4', 2); -- John Smith (ID 2)

-- Inserindo Endereço para um usuário
-- AVISO: A entidade 'EnderecoVisitante' também precisa ser refatorada para usar 'Usuario'
INSERT INTO endereco_visitante (id_endereco_visitante, cep_visitante, estado_visitante, cidade_visitante, bairro_visitante, rua_visitante, numero_visitante, usuario_id) VALUES
(1, '69900-062', 'Acre', 'Rio Branco', 'Centro', 'Rua Rui Barbosa', '123', 1); -- Ana Clara (ID 1)

-- Inserindo Feedback de um usuário
INSERT INTO feedback (id_feedback, texto, data_envio, usuario_id) VALUES
(1, 'A exposição sobre a história do Acre estava incrível! Parabéns!', '2025-08-26', 1); -- Ana Clara (ID 1)

-- Inserindo Sugestão na Filmoteca
INSERT INTO filmoteca (id_filmoteca, sugestao, usuario_id) VALUES
(1, 'Gostaria de sugerir o documentário "A Amazônia Desconhecida".', 2); -- John Smith (ID 2)

-- Inserindo Visitas (uma concluída e uma agendada)
-- Visitas CONCLUÍDAS (13) - Datas passadas
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (1, '2025-08-10 10:00:00', NULL, 'CONCLUIDA', 1, 1); -- Ana Clara visitou a Recepção
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (2, '2025-08-11 11:30:00', NULL, 'CONCLUIDA', 2, 2); -- John Smith visitou a Biblioteca
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (3, '2025-08-12 14:00:00', '2025-08-12 14:00:00', 'CONCLUIDA', 3, 3); -- Carlos Garcia visitou a Administração
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (4, '2025-08-14 09:00:00', NULL, 'CONCLUIDA', 4, 4); -- Beatriz Oliveira visitou as Exposições
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (5, '2025-08-15 15:20:00', NULL, 'CONCLUIDA', 5, 1); -- Lucas Pereira visitou a Recepção
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (6, '2025-08-18 10:45:00', '2025-08-18 10:45:00', 'CONCLUIDA', 6, 2); -- Sofia Rodriguez visitou a Biblioteca
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (7, '2025-08-20 13:00:00', NULL, 'CONCLUIDA', 7, 3); -- Davi Martins visitou a Administração
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (8, '2025-08-21 16:00:00', NULL, 'CONCLUIDA', 8, 4); -- Isabela Souza visitou as Exposições
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (9, '2025-08-22 11:00:00', NULL, 'CONCLUIDA', 9, 1); -- Mateo Gonzales visitou a Recepção
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (10, '2025-08-25 14:30:00', '2025-08-25 14:30:00', 'CONCLUIDA', 10, 2); -- Laura Fernandes visitou a Biblioteca
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (11, '2025-08-26 09:30:00', NULL, 'CONCLUIDA', 1, 3); -- Ana Clara visitou a Administração
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (12, '2025-08-28 12:00:00', NULL, 'CONCLUIDA', 2, 4); -- John Smith visitou as Exposições
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (13, '2025-08-29 10:00:00', '2025-08-29 10:00:00', 'CONCLUIDA', 3, 1); -- Carlos Garcia visitou a Recepção

-- Visitas AGENDADAS (13) - Datas futuras
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (14, NULL, '2025-09-10 10:00:00', 'AGENDADA', 4, 2); -- Beatriz Oliveira agendou visita à Biblioteca
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (15, NULL, '2025-09-11 14:00:00', 'AGENDADA', 5, 3); -- Lucas Pereira agendou visita à Administração
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (16, NULL, '2025-09-12 09:30:00', 'AGENDADA', 6, 4); -- Sofia Rodriguez agendou visita às Exposições
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (17, NULL, '2025-09-15 11:00:00', 'AGENDADA', 7, 1); -- Davi Martins agendou visita à Recepção
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (18, NULL, '2025-09-16 16:00:00', 'AGENDADA', 8, 2); -- Isabela Souza agendou visita à Biblioteca
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (19, NULL, '2025-09-18 10:00:00', 'AGENDADA', 9, 3); -- Mateo Gonzales agendou visita à Administração
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (20, NULL, '2025-09-20 15:00:00', 'AGENDADA', 10, 4); -- Laura Fernandes agendou visita às Exposições
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (21, NULL, '2025-09-22 13:30:00', 'AGENDADA', 1, 1); -- Ana Clara agendou visita à Recepção
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (22, NULL, '2025-09-23 10:30:00', 'AGENDADA', 2, 2); -- John Smith agendou visita à Biblioteca
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (23, NULL, '2025-09-25 14:00:00', 'AGENDADA', 3, 3); -- Carlos Garcia agendou visita à Administração
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (24, NULL, '2025-09-28 09:00:00', 'AGENDADA', 4, 4); -- Beatriz Oliveira agendou visita às Exposições
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (25, NULL, '2025-10-01 11:00:00', 'AGENDADA', 5, 1); -- Lucas Pereira agendou visita à Recepção
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (26, NULL, '2025-10-02 15:30:00', 'AGENDADA', 6, 2); -- Sofia Rodriguez agendou visita à Biblioteca

-- Visitas CONFIRMADAS (EM_ANDAMENTO) (13) - Datas de hoje
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (27, '2025-09-07 09:05:00', NULL, 'CONFIRMADA', 7, 3); -- Davi Martins entrou na Administração
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (28, '2025-09-07 09:15:00', '2025-09-07 09:15:00', 'CONFIRMADA', 8, 4); -- Isabela Souza confirmou agendamento nas Exposições
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (29, '2025-09-07 10:00:00', NULL, 'CONFIRMADA', 9, 1); -- Mateo Gonzales entrou na Recepção
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (30, '2025-09-07 10:30:00', NULL, 'CONFIRMADA', 10, 2); -- Laura Fernandes entrou na Biblioteca
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (31, '2025-09-07 11:00:00', '2025-09-07 11:00:00', 'CONFIRMADA', 1, 3); -- Ana Clara confirmou agendamento na Administração
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (32, '2025-09-07 11:45:00', NULL, 'CONFIRMADA', 2, 4); -- John Smith entrou nas Exposições
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (33, '2025-09-07 13:00:00', NULL, 'CONFIRMADA', 3, 1); -- Carlos Garcia entrou na Recepção
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (34, '2025-09-07 13:20:00', '2025-09-07 13:20:00', 'CONFIRMADA', 4, 2); -- Beatriz Oliveira confirmou agendamento na Biblioteca
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (35, '2025-09-07 14:00:00', NULL, 'CONFIRMADA', 5, 3); -- Lucas Pereira entrou na Administração
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (36, '2025-09-07 14:10:00', NULL, 'CONFIRMADA', 6, 4); -- Sofia Rodriguez entrou nas Exposições
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (37, '2025-09-07 15:00:00', '2025-09-07 15:00:00', 'CONFIRMADA', 7, 1); -- Davi Martins confirmou agendamento na Recepção
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (38, '2025-09-07 15:05:00', NULL, 'CONFIRMADA', 8, 2); -- Isabela Souza entrou na Biblioteca
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (39, '2025-09-07 16:00:00', NULL, 'CONFIRMADA', 9, 3); -- Mateo Gonzales entrou na Administração

-- Visitas CANCELADAS (13) - Datas variadas
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (40, NULL, '2025-09-08 10:00:00', 'CANCELADA', 10, 4); -- Laura Fernandes cancelou visita às Exposições
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (41, NULL, '2025-09-09 11:00:00', 'CANCELADA', 1, 1); -- Ana Clara cancelou visita à Recepção
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (42, NULL, '2025-09-10 13:00:00', 'CANCELADA', 2, 2); -- John Smith cancelou visita à Biblioteca
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (43, NULL, '2025-09-11 14:30:00', 'CANCELADA', 3, 3); -- Carlos Garcia cancelou visita à Administração
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (44, NULL, '2025-09-13 10:00:00', 'CANCELADA', 4, 4); -- Beatriz Oliveira cancelou visita às Exposições
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (45, NULL, '2025-09-14 16:00:00', 'CANCELADA', 5, 1); -- Lucas Pereira cancelou visita à Recepção
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (46, NULL, '2025-08-20 10:00:00', 'CANCELADA', 6, 2); -- Sofia Rodriguez teve visita cancelada no passado
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (47, NULL, '2025-08-22 11:30:00', 'CANCELADA', 7, 3); -- Davi Martins teve visita cancelada no passado
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (48, NULL, '2025-09-17 14:00:00', 'CANCELADA', 8, 4); -- Isabela Souza cancelou visita às Exposições
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (49, NULL, '2025-09-19 09:00:00', 'CANCELADA', 9, 1); -- Mateo Gonzales cancelou visita à Recepção
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (50, NULL, '2025-09-21 15:00:00', 'CANCELADA', 10, 2); -- Laura Fernandes cancelou visita à Biblioteca
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (51, NULL, '2025-09-24 10:00:00', 'CANCELADA', 1, 3); -- Ana Clara cancelou visita à Administração
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (52, NULL, '2025-09-26 12:00:00', 'CANCELADA', 2, 4); -- John Smith cancelou visita às Exposições

-- Inserindo Armários
INSERT INTO armario (id_armario, numeracao, usuario_id) VALUES
(1, 101, 1),      -- Armário 101 ocupado pela Ana
(2, 102, null),   -- Armário 102 livre
(3, 103, null),   -- Armário 103 livre
(4, 104, null);   -- Armário 104 livre

-- ===================================================================================
-- 4. Inserindo Reservas no Auditório
-- As reservas agora são feitas por qualquer 'usuario'.
-- ===================================================================================
INSERT INTO reserva_auditorio (nome_evento, data, hora_inicio, hora_fim, observacoes, status, usuario_id, auditorio_id) VALUES
('Palestra de Abertura: A História do Acre', '2025-09-05', '19:00:00', '21:00:00', 'Projetor e 2 microfones.', 'APROVADA', 1, 1),
('Oficina de Cerâmica Indígena', '2025-09-10', '14:00:00', '17:00:00', NULL, 'APROVADA', 2, 1),
('Reunião Anual da Associação de Historiadores', '2025-09-12', '09:00:00', '12:00:00', 'Mesa de centro e água.', 'PENDENTE', 3, 1),
('Seminário sobre Sustentabilidade na Amazônia', '2025-09-25', '09:00:00', '17:00:00', 'Transmissão ao vivo necessária.', 'PENDENTE', 1, 1);
-- ... (as outras reservas podem ser adicionadas da mesma forma, usando os IDs 1, 2 ou 3)

SET FOREIGN_KEY_CHECKS=1;