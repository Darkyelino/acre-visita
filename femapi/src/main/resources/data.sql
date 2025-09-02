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
-- Visitantes (IDs 1, 2, 3)
(1, 'Ana Clara Silva', 'ana.silva@email.com', '$2a$10$EAC3i6k8C3134q4oB2.dHeVAmj1nU8Jvu3w2xJr0y65PEgslNFuUm', 'VISITANTE', '(68) 99988-7766', 1, NULL),
(2, 'John Smith', 'john.smith@email.com', '$2a$10$EAC3i6k8C3134q4oB2.dHeVAmj1nU8Jvu3w2xJr0y65PEgslNFuUm', 'VISITANTE', '+1 555-0101', 2, NULL),
(3, 'Carlos Garcia', 'carlos.garcia@email.com', '$2a$10$EAC3i6k8C3134q4oB2.dHeVAmj1nU8Jvu3w2xJr0y65PEgslNFuUm', 'VISITANTE', '+54 9 11 1234-5678', 2, NULL),

-- Funcionários (IDs 4, 5, 6)
(4, 'Roberto Medeiros', 'roberto.adm@acrevisita.com', '$2a$10$EAC3i6k8C3134q4oB2.dHeVAmj1nU8Jvu3w2xJr0y65PEgslNFuUm', 'ADMINISTRADOR', NULL, NULL, 3),
(5, 'Mariana Costa', 'mariana.atendente@acrevisita.com', '$2a$10$EAC3i6k8C3134q4oB2.dHeVAmj1nU8Jvu3w2xJr0y65PEgslNFuUm', 'ATENDENTE', NULL, NULL, 1),
(6, 'Felipe Andrade', 'felipe.coord@acrevisita.com', '$2a$10$EAC3i6k8C3134q4oB2.dHeVAmj1nU8Jvu3w2xJr0y65PEgslNFuUm', 'COORDENADOR', NULL, NULL, 2);


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