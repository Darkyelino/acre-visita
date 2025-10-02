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
INSERT INTO auditorio (id_auditorio, nome_auditorio, disponibilidade, id_setor) VALUES
(1, 'Auditório Jorge Amado', true, 3),
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
INSERT INTO feedback (id_feedback, texto, data_envio, id_usuario, id_visita) VALUES
(1, 'A exposição sobre a história do Acre estava incrível! Aprendi muito. Parabéns a todos os envolvidos na curadoria.', '2025-08-10', 1, 1),
(2, 'A biblioteca é um espaço maravilhoso e muito silencioso, perfeito para estudos. O acervo de autores locais é impressionante.', '2025-08-11', 2, 2),
(3, 'O atendimento na administração foi rápido e eficiente. Resolveram meu problema em poucos minutos.', '2025-08-12', 3, 3),
(4, 'A nova ala de exposições temporárias está fantástica. A iluminação valoriza muito as obras. Recomendo!', '2025-08-14', 4, 4),
(5, 'A recepção foi muito cordial. Os atendentes foram simpáticos e me deram todas as informações que eu precisava.', '2025-08-15', 5, 5),
(6, 'Participei de uma oficina na biblioteca e foi uma experiência enriquecedora. Ótima organização.', '2025-08-18', 6, 6),
(7, 'Gostaria de sugerir que houvesse mais opções de acessibilidade para cadeirantes na área administrativa.', '2025-08-20', 7, 7),
(8, 'As obras expostas são de uma sensibilidade única. Fiquei emocionada. Um verdadeiro tesouro cultural.', '2025-08-21', 8, 8),
(9, 'Achei o espaço da recepção um pouco cheio. Talvez reorganizar a fila de entrada pudesse ajudar nos horários de pico.', '2025-08-22', 9, 9),
(10, 'O evento na biblioteca foi muito bem organizado. Espaço limpo e confortável.', '2025-08-25', 10, 10),
(11, 'O processo administrativo para agendamento de grupos escolares poderia ser mais claro no site.', '2025-08-26', 1, 11),
(12, 'Adorei a interatividade das novas instalações na ala de exposições. As crianças se divertiram muito!', '2025-08-28', 2, 12),
(13, 'Fui muito bem recebido na entrada principal. A equipe está de parabéns pelo profissionalismo.', '2025-08-29', 3, 13);

-- Inserindo Sugestão na Filmoteca
INSERT INTO filmoteca (id_filmoteca, sugestao, id_setor, id_usuario) VALUES
(1, 'Gostaria de sugerir o documentário "A Amazônia Desconhecida".', 1, 2), -- John Smith (ID 2)
(2, 'Seria incrível se vocês exibissem o filme "Central do Brasil". É um clássico!', 4, 1), -- Ana Clara para a Ala de Exposições
(3, 'Sugiro o documentário "O Sal da Terra", sobre Sebastião Salgado.', 2, 3), -- Carlos Garcia para a Biblioteca
(4, 'Para as crianças, o filme "O Menino e o Mundo" seria uma ótima pedida.', 4, 4), -- Beatriz Oliveira para a Ala de Exposições
(5, 'Por favor, considerem adicionar a série de documentários "Guerras do Brasil.doc".', 2, 5), -- Lucas Pereira para a Biblioteca
(6, 'Acho que o filme "Bacurau" geraria ótimos debates se exibido aqui.', 1, 6), -- Sofia Rodriguez para a Recepção
(7, 'Sugestão: "Cidade de Deus". Um marco do nosso cinema.', 4, 7), -- Davi Martins para a Ala de Exposições
(8, 'O documentário "Democracia em Vertigem" é essencial para entender a história recente do Brasil.', 2, 8), -- Isabela Souza para a Biblioteca
(9, 'Poderiam passar curtas-metragens de diretores acreanos?', 1, 9), -- Mateo Gonzales para a Recepção
(10, 'Recomendo fortemente o filme "Que Horas Ela Volta?".', 4, 10), -- Laura Fernandes para a Ala de Exposições
(11, 'O documentário "Amazônia Groove" seria muito pertinente para o local.', 2, 1), -- Ana Clara para a Biblioteca
(12, 'Sugiro a exibição de filmes de Charlie Chaplin na Biblioteca, para os mais velhos.', 2, 2), -- John Smith para a Biblioteca
(13, 'Seria interessante ter uma mostra de cinema peruano, considerando a proximidade.', 4, 9), -- Mateo Gonzales para a Ala de Exposições
(14, 'Acho que o filme "Tropa de Elite" seria popular, apesar de polêmico.', 1, 5), -- Lucas Pereira para a Recepção
(15, 'Gostaria de ver "Aquarius" com Sônia Braga na programação.', 4, 8); -- Isabela Souza para a Ala de Exposições

-- Inserindo Visitas (uma concluída e uma agendada)
-- Visitas CONCLUÍDAS (13) - Datas passadas
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (1, '2025-08-10 10:00:00', NULL, 'CONFIRMADA', 1, 1); -- Ana Clara visitou a Recepção
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (2, '2025-08-11 11:30:00', NULL, 'CONFIRMADA', 2, 2); -- John Smith visitou a Biblioteca
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (3, '2025-08-12 14:00:00', '2025-08-12 14:00:00', 'CONFIRMADA', 3, 3); -- Carlos Garcia visitou a Administração
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (4, '2025-08-14 09:00:00', NULL, 'CONFIRMADA', 4, 4); -- Beatriz Oliveira visitou as Exposições
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (5, '2025-08-15 15:20:00', NULL, 'CONFIRMADA', 5, 1); -- Lucas Pereira visitou a Recepção
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (6, '2025-08-18 10:45:00', '2025-08-18 10:45:00', 'CONFIRMADA', 6, 2); -- Sofia Rodriguez visitou a Biblioteca
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (7, '2025-08-20 13:00:00', NULL, 'CONFIRMADA', 7, 3); -- Davi Martins visitou a Administração
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (8, '2025-08-21 16:00:00', NULL, 'CONFIRMADA', 8, 4); -- Isabela Souza visitou as Exposições
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (9, '2025-08-22 11:00:00', NULL, 'CONFIRMADA', 9, 1); -- Mateo Gonzales visitou a Recepção
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (10, '2025-08-25 14:30:00', '2025-08-25 14:30:00', 'CONFIRMADA', 10, 2); -- Laura Fernandes visitou a Biblioteca
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (11, '2025-08-26 09:30:00', NULL, 'CONFIRMADA', 1, 3); -- Ana Clara visitou a Administração
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (12, '2025-08-28 12:00:00', NULL, 'CONFIRMADA', 2, 4); -- John Smith visitou as Exposições
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, usuario_id, local_id_setor) VALUES (13, '2025-08-29 10:00:00', '2025-08-29 10:00:00', 'CONFIRMADA', 3, 1); -- Carlos Garcia visitou a Recepção

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

-- Inserindo 10 armários para o Setor 1: Recepção Principal
INSERT INTO armario (numeracao, usuario_id, setor_id) VALUES
(101, NULL, 1),
(102, NULL, 1),
(103, NULL, 1),
(104, NULL, 1),
(105, NULL, 1),
(106, NULL, 1),
(107, NULL, 1),
(108, NULL, 1),
(109, NULL, 1),
(110, NULL, 1);

-- Inserindo 10 armários para o Setor 2: Biblioteca Central
INSERT INTO armario (numeracao, usuario_id, setor_id) VALUES
(201, NULL, 2),
(202, NULL, 2),
(203, NULL, 2),
(204, NULL, 2),
(205, NULL, 2),
(206, NULL, 2),
(207, NULL, 2),
(208, NULL, 2),
(209, NULL, 2),
(210, NULL, 2);

-- Inserindo 10 armários para o Setor 3: Administração Geral
INSERT INTO armario (numeracao, usuario_id, setor_id) VALUES
(301, NULL, 3),
(302, NULL, 3),
(303, NULL, 3),
(304, NULL, 3),
(305, NULL, 3),
(306, NULL, 3),
(307, NULL, 3),
(308, NULL, 3),
(309, NULL, 3),
(310, NULL, 3);

-- Inserindo 10 armários para o Setor 4: Ala de Exposições Temporárias
INSERT INTO armario (numeracao, usuario_id, setor_id) VALUES
(401, NULL, 4),
(402, NULL, 4),
(403, NULL, 4),
(404, NULL, 4),
(405, NULL, 4),
(406, NULL, 4),
(407, NULL, 4),
(408, NULL, 4),
(409, NULL, 4),
(410, NULL, 4);

-- ===================================================================================
-- 4. Inserindo Reservas no Auditório
-- As reservas agora são feitas por qualquer 'usuario'.
-- ===================================================================================
INSERT INTO reserva_auditorio (nome_evento, data, hora_inicio, hora_fim, observacoes, status, id_usuario, id_auditorio) VALUES
-- Reservas PENDENTES (Aguardando ação do Coordenador/ADM)
('Ensaio do Coral Municipal', '2025-09-18', '19:00:00', '21:00:00', 'Necessário espaço para 30 pessoas.', 'PENDENTE', 4, 1),
('Lançamento do Livro "Crônicas da Floresta"', '2025-09-20', '18:30:00', '20:00:00', 'Mesa para autógrafos e um microfone.', 'PENDENTE', 5, 2),
('Workshop de Fotografia com Celular', '2025-09-22', '09:00:00', '12:00:00', 'Projetor com entrada HDMI.', 'PENDENTE', 6, 3),
('Palestra sobre Seringueiros do Acre', '2025-09-26', '19:00:00', '20:30:00', NULL, 'PENDENTE', 7, 5),
('Reunião de Pais e Mestres - Escola ABC', '2025-09-29', '19:30:00', '21:00:00', 'Apenas cadeiras, sem mesas.', 'PENDENTE', 8, 1),
('Apresentação de Projeto de Software', '2025-10-03', '10:00:00', '11:00:00', NULL, 'PENDENTE', 9, 2),
('Clube de Leitura - Debate Mensal', '2025-10-06', '19:00:00', '20:00:00', 'Círculo de cadeiras.', 'PENDENTE', 10, 2),
('Treinamento de Primeiros Socorros', '2025-10-10', '08:00:00', '17:00:00', 'Espaço livre no palco para demonstrações.', 'PENDENTE', 1, 3),
('Gravação de Podcast Educativo', '2025-10-14', '14:00:00', '16:00:00', 'Sala silenciosa, por favor.', 'PENDENTE', 2, 2),
('Exposição de Arte Digital', '2025-10-20', '19:00:00', '22:00:00', 'Necessita de projetor de alta definição.', 'PENDENTE', 3, 5),

-- Reservas APROVADAS (Auditório ocupado nestes horários)
('Exibição do filme "A Batalha da Borracha"', '2025-09-19', '20:00:00', '22:00:00', NULL, 'APROVADA', 2, 5),
('Contação de Histórias Infantis', '2025-09-21', '10:00:00', '11:00:00', 'Público infantil, cerca de 20 crianças.', 'APROVADA', 3, 3),
('Curso de Extensão Universitária - História da Amazônia', '2025-09-23', '18:00:00', '22:00:00', 'Aulas todas as terças por 1 mês.', 'APROVADA', 4, 2),
('Defesa de Mestrado - Antropologia', '2025-09-27', '14:00:00', '16:00:00', NULL, 'APROVADA', 5, 1),
('Concerto da Orquestra Jovem', '2025-09-30', '20:00:00', '21:30:00', 'Necessário afinar o piano do auditório.', 'APROVADA', 6, 1),
('Palestra Motivacional com Atleta Local', '2025-10-04', '19:00:00', '20:00:00', 'Um copo d''água e um microfone.', 'APROVADA', 7, 3),
('Sarau Poético "Vozes do Norte"', '2025-10-08', '19:30:00', '21:00:00', NULL, 'APROVADA', 8, 5),
('Exibição de Documentário Ambiental', '2025-10-11', '16:00:00', '17:30:00', NULL, 'APROVADA', 9, 5),
('Formatura do Curso de Teatro', '2025-10-15', '19:00:00', '22:00:00', 'Cerimônia de entrega de certificados.', 'APROVADA', 10, 1),
('Conferência Anual de TI', '2025-10-17', '09:00:00', '18:00:00', 'Internet e múltiplos pontos de energia.', 'APROVADA', 1, 1),
('Semana de Arte Moderna - Abertura', '2025-10-22', '19:00:00', '21:00:00', 'Iluminação especial para o palco.', 'APROVADA', 2, 3),

-- Reservas RECUSADAS (Para histórico)
('Festa de Aniversário Privada', '2025-09-24', '19:00:00', '23:00:00', 'Uso para evento particular.', 'RECUSADA', 1, 1),
('Ensaio de Banda de Rock', '2025-09-28', '18:00:00', '22:00:00', 'Volume do som incompatível com o ambiente.', 'RECUSADA', 2, 3),
('Palestra sobre Criptomoedas', '2025-10-02', '19:00:00', '21:00:00', 'Evento com fins lucrativos/venda de curso.', 'RECUSADA', 3, 2),
('Workshop de Culinária', '2025-10-05', '13:00:00', '17:00:00', 'Estrutura do auditório inadequada para a atividade.', 'RECUSADA', 4, 1),
('Feira de Artesanato Local', '2025-10-12', '09:00:00', '18:00:00', 'Duração excede o limite permitido por reserva.', 'RECUSADA', 5, 3),
('Congresso Religioso', '2025-10-18', '08:00:00', '19:00:00', 'Evento desalinhado com o perfil da instituição.', 'RECUSADA', 6, 1),
('Show de Mágica Infantil', '2025-10-25', '15:00:00', '16:00:00', 'Conflito com outro evento já aprovado.', 'RECUSADA', 7, 5),
('Convenção de Vendas - Empresa XYZ', '2025-10-28', '09:00:00', '17:00:00', 'Evento privado, não aberto ao público.', 'RECUSADA', 8, 1),

-- Reservas FINALIZADAS (Eventos que já ocorreram)
('Palestra Inaugural', '2025-08-01', '19:00:00', '21:00:00', 'Evento de abertura do mês cultural.', 'FINALIZADO', 1, 1),
('Reunião de Condomínio Cultural', '2025-08-05', '19:30:00', '20:30:00', NULL, 'FINALIZADO', 10, 2),
('Apresentação de Dança Folclórica', '2025-08-08', '20:00:00', '21:00:00', 'Palco livre.', 'FINALIZADO', 9, 3),
('Curso de Desenho para Iniciantes', '2025-08-10', '09:00:00', '12:00:00', 'Mesas e cadeiras para 20 pessoas.', 'FINALIZADO', 8, 2),
('Cineclube: Clássicos do Cinema Nacional', '2025-08-12', '19:00:00', '22:00:00', NULL, 'FINALIZADO', 7, 5),
('Evento de Caridade "Acre Solidário"', '2025-08-15', '10:00:00', '17:00:00', 'Arrecadação de alimentos.', 'FINALIZADO', 6, 1),
('Palestra "A Fauna do Acre"', '2025-08-18', '19:00:00', '20:00:00', 'Projetor e microfone.', 'FINALIZADO', 5, 3),
('Audiência Pública sobre Meio Ambiente', '2025-08-20', '09:00:00', '13:00:00', 'Mesa para 5 debatedores.', 'FINALIZADO', 4, 1),
('Oficina de Escrita Criativa', '2025-08-22', '14:00:00', '17:00:00', NULL, 'FINALIZADO', 3, 2),
('Lançamento de Produto Regional', '2025-08-25', '19:30:00', '21:00:00', 'Coquetel para convidados.', 'FINALIZADO', 2, 1),
('Recital de Piano', '2025-08-28', '20:00:00', '21:00:00', NULL, 'FINALIZADO', 1, 1),
('Seminário de Educação', '2025-08-30', '08:30:00', '17:30:00', 'Coffee break no intervalo.', 'FINALIZADO', 5, 3),
('Apresentação de TCC - Biologia', '2025-09-01', '10:00:00', '11:00:00', 'Banca com 3 professores.', 'FINALIZADO', 6, 2),
('Mostra de Curtas-Metragens', '2025-09-05', '18:00:00', '22:00:00', NULL, 'FINALIZADO', 7, 5),
('Fórum de Turismo Sustentável', '2025-09-10', '09:00:00', '18:00:00', 'Evento de dia inteiro.', 'FINALIZADO', 8, 1);

SET FOREIGN_KEY_CHECKS=1;