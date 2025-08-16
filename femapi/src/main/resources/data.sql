SET FOREIGN_KEY_CHECKS=0;

INSERT IGNORE INTO nacionalidade_visitante (id_nacionalidade, nacionalidade) 
VALUES (1, 'Brasileira');

INSERT IGNORE INTO visitante (
  id_visitante, 
  nome_visitante, 
  email_visitante, 
  telefone_visitante, 
  senha_visitante, 
  numdoc_visitante, 
  nacionalidade_visitante_id_nacionalidade
) VALUES (
  1, 
  'João da Silva', 
  'joao.silva@email.com', 
  '68999998888', 
  '123456', 
  '12345678900', 
  1
);

SET FOREIGN_KEY_CHECKS=1;
