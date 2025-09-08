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
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES
(1, '2025-08-26 14:30:00', null, 'CONCLUIDA', 1, 4), -- Ana visitou a Ala de Exposições
(2, null, '2025-09-02 10:00:00', 'AGENDADA', 2, 2); -- John agendou uma visita à Biblioteca

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