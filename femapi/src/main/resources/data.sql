SET FOREIGN_KEY_CHECKS=0;

-- ===================================================================================
-- 1. Tabelas sem dependências (chaves estrangeiras)
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


-- ===================================================================================
-- 2. Tabelas com dependências básicas (Visitante, Funcionários, etc.)
-- ===================================================================================
-- AVISO: As senhas estão em texto plano. Em produção, use um encoder como o BCrypt!

-- Inserindo Visitantes
INSERT INTO visitante (id_visitante, nome_visitante, email_visitante, telefone_visitante, senha_visitante, nacionalidade_visitante_id_nacionalidade) VALUES
(1, 'Ana Clara Silva', 'ana.silva@email.com', '(68) 99988-7766', 'senha123', 1),
(2, 'John Smith', 'john.smith@email.com', '+1 555-0101', 'password123', 2),
(3, 'Carlos Garcia', 'carlos.garcia@email.com', '+54 9 11 1234-5678', 'contrasena123', 2);

-- Inserindo Administrador (responsável pelo setor de Administração)
INSERT INTO administrador (id_administrador, nome_administrador, email_administrador, senha_administrador, adm_setor_responsavel_id_setor) VALUES
(1, 'Roberto Medeiros', 'roberto.adm@acrevisita.com', 'adm@123', 3);

-- Inserindo Atendente (trabalha na Recepção)
INSERT INTO atendente (id_atendente, nome_atendente, email_atendente, senha_atendente, atendente_setor_responsavel_id_setor) VALUES
(1, 'Mariana Costa', 'mariana.atendente@acrevisita.com', 'atendente@123', 1);

-- Inserindo Coordenador (responsável pela Biblioteca)
INSERT INTO coordenador (id_coordenador, nome_coordenador, email_coordenador, senha_coordenador, coord_setor_responsavel_id_setor) VALUES
(1, 'Felipe Andrade', 'felipe.coord@acrevisita.com', 'coord@123', 2);

-- Inserindo Auditório
INSERT INTO auditorio (id_auditorio, nome_auditorio, disponibilidade, local_auditorio_id_setor) VALUES
(1, 'Auditório Jorge Amado', true, 1); -- Auditório fica na área da Recepção Principal


-- ===================================================================================
-- 3. Tabelas que dependem de Visitante e Setor
-- ===================================================================================

-- Inserindo Documento para alguns visitantes
INSERT INTO doc_visitante (id_documento, tipo, numero, id_visitante) VALUES
(1, 'RG', '1234567 SSP/AC', 1),
(2, 'Passaporte', 'A1B2C3D4', 2);
-- Visitante 3 (Carlos Garcia) não tem documento cadastrado ainda.

-- Inserindo Endereço para um visitante
INSERT INTO endereco_visitante (id_endereco_visitante, cep_visitante, estado_visitante, cidade_visitante, bairro_visitante, rua_visitante, numero_visitante, id_visitante) VALUES
(1, '69900-062', 'Acre', 'Rio Branco', 'Centro', 'Rua Rui Barbosa', '123', 1);

-- Inserindo Feedback de um visitante
INSERT INTO feedback (id_feedback, texto, data_envio, visitante_id_visitante) VALUES
(1, 'A exposição sobre a história do Acre estava incrível! Parabéns!', '2025-08-26', 1);

-- Inserindo Sugestão na Filmoteca
INSERT INTO filmoteca (id_filmoteca, sugestao, visitante_id_visitante) VALUES
(1, 'Gostaria de sugerir o documentário "A Amazônia Desconhecida".', 2);

-- Inserindo Visitas (uma concluída e uma agendada)
INSERT INTO visita (id_visita, data_hora_entrada, data_hora_agendamento, status, visitante_id_visitante, local_id_setor) VALUES
(1, '2025-08-26 14:30:00', null, 'CONCLUIDA', 1, 4), -- Ana visitou a Ala de Exposições
(2, null, '2025-08-28 10:00:00', 'AGENDADA', 2, 2); -- John agendou uma visita à Biblioteca

-- Inserindo Armários
INSERT INTO armario (id_armario, numeracao, visitante_id_visitante) VALUES
(1, 101, 1),      -- Armário 101 ocupado pela Ana
(2, 102, null),   -- Armário 102 livre
(3, 103, null),   -- Armário 103 livre
(4, 104, null);   -- Armário 104 livre

SET FOREIGN_KEY_CHECKS=1;
