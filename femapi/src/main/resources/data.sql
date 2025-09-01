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
(1, 'Auditório Jorge Amado', true, 1), -- Auditório fica na área da Recepção Principal
(2, 'Sala Chico Mendes', true, 2),        -- Sala de reuniões/projeções na Biblioteca Central
(3, 'Anfiteatro Ziraldo', true, 4),        -- Espaço multiuso na Ala de Exposições
(4, 'Auditório Clarice Lispector', false, 1), -- Outro auditório na recepção, em manutenção
(5, 'Sala de Projeção Galvez', true, 4);     -- Sala menor na Ala de Exposições, com nome histórico do Acre


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

-- ===================================================================================
-- 4. Inserindo Reservas no Auditório (versão expandida)
-- ===================================================================================
-- Status possíveis: 'PENDENTE', 'APROVADA', 'RECUSADA'

INSERT INTO reserva_auditorio (nome_evento, data, hora_inicio, hora_fim, observacoes, status, visitante_id, auditorio_id) VALUES
-- Eventos APROVADOS
('Palestra de Abertura: A História do Acre', '2025-09-05', '19:00:00', '21:00:00', 'Projetor e 2 microfones.', 'APROVADA', 1, 1),
('Oficina de Cerâmica Indígena', '2025-09-10', '14:00:00', '17:00:00', NULL, 'APROVADA', 2, 1),
('Sarau de Poesias Regionais', '2025-09-18', '20:00:00', '22:00:00', NULL, 'APROVADA', 2, 1),
('Apresentação Teatral Escolar', '2025-10-01', '10:00:00', '11:30:00', 'Grupo de 40 alunos.', 'APROVADA', 3, 1),
('Curso de Libras Básico', '2025-10-04', '09:00:00', '12:00:00', 'Flip chart e canetas.', 'APROVADA', 1, 1),
('Clube do Livro: Discussão sobre autores acreanos', '2025-10-08', '19:30:00', '21:00:00', NULL, 'APROVADA', 2, 1),
('Exibição de Curta Metragens Locais', '2025-10-20', '18:00:00', '22:00:00', NULL, 'APROVADA', 1, 1),
('Conferência de Imprensa sobre nova exposição', '2025-10-22', '10:00:00', '11:00:00', 'Credenciamento de jornalistas na entrada.', 'APROVADA', 3, 1),
('Workshop de Roteiro para Cinema', '2025-11-05', '13:00:00', '18:00:00', NULL, 'APROVADA', 1, 1),
('Apresentação de TCC - Arqueologia Amazônica', '2025-11-10', '09:30:00', '11:00:00', 'Banca examinadora presente.', 'APROVADA', 2, 1),
('Treinamento Interno da Equipe do Museu', '2025-11-17', '08:00:00', '12:00:00', 'Uso exclusivo para funcionários.', 'APROVADA', 1, 1),

-- Eventos PENDENTES
('Reunião Anual da Associação de Historiadores', '2025-09-12', '09:00:00', '12:00:00', 'Mesa de centro e água.', 'PENDENTE', 3, 1),
('Seminário sobre Sustentabilidade na Amazônia', '2025-09-25', '09:00:00', '17:00:00', 'Transmissão ao vivo necessária. Aguardando viabilidade técnica.', 'PENDENTE', 1, 1),
('Palestra com Autor Convidado Internacional', '2025-10-15', '19:00:00', '20:30:00', 'Venda de livros no local. Verificar regras.', 'PENDENTE', 3, 1),
('Audição para Peça de Teatro "Vozes da Floresta"', '2025-11-12', '18:00:00', '22:00:00', 'Iluminação especial necessária. Orçamento em análise.', 'PENDENTE', 2, 1),

-- Eventos RECUSADOS
-- Motivo: Conflito de data e horário com a Oficina de Cerâmica (ID 2).
('Exibição do documentário "Ciclo da Borracha"', '2025-09-10', '15:00:00', '17:00:00', 'Sistema de som 5.1.', 'RECUSADA', 1, 1),
-- Motivo: Evento de dia inteiro, fora do escopo de atividades culturais do local.
('Evento Corporativo TechAcre', '2025-09-22', '08:00:00', '18:00:00', 'Evento privado com catering externo.', 'RECUSADA', 3, 1),
-- Motivo: Evento particular (festa de aniversário) não permitido nas políticas do auditório.
('Festa de Aniversário Infantil', '2025-10-25', '15:00:00', '18:00:00', 'Decoração temática e buffet.', 'RECUSADA', 3, 1),
-- Motivo: Conflito de horário com a Apresentação Teatral Escolar (ID 4)
('Ensaio Musical', '2025-10-01', '11:00:00', '13:00:00', 'Necessário isolamento acústico', 'RECUSADA', 2, 1),
-- Motivo: Confraternização de empresa, considerado evento privado e inadequado para o espaço.
('Celebração de Fim de Ano da Empresa XYZ', '2025-12-15', '19:00:00', '23:00:00', 'Serviço de buffet e banda ao vivo.', 'RECUSADA', 2, 1);

SET FOREIGN_KEY_CHECKS=1;
