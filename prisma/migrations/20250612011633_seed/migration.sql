-- Inserindo usuários
INSERT INTO "users" (name, email, password, role, verified_email, created_at, updated_at) VALUES
  ('João Silva', 'joao@example.com', '$2b$10$bs7J/7bLtDjIk6Iop2xuQuIX4ya0o3QY.o4WVAC0S94tUePLrev3q', 'admin', true, NOW(), NOW()),
  ('Maria Oliveira', 'maria@example.com', '$2b$10$OyuhdHtx0KtfhwRxVnBWV.ujXwiJrUtCDZt13Oty6mg7xityDbH6K', 'admin', true, NOW(), NOW()),
  ('Carlos Santos', 'carlos@example.com', '$2b$10$nTt0xPvcS607UanR86MMWegE/ML9NZDk5.02EQlMEM9FJgtwGfBbW', 'user', true, NOW(), NOW()),
  ('Ana Moares', 'ana@example.com', '$2b$10$Yzq1n4MH2M9s3kACd7LIWeNClUm6FpJf8LKsbqlFksgjGE.GUarCG', 'user', true, NOW(), NOW());

-- Inserindo reclamações
INSERT INTO "complaints" (title, description, neighborhood, street, zip_code, address_reference, status, images, user_id, created_at, updated_at) VALUES
  ('Vazamento de água na rua principal', 'Há um vazamento de água na calçada em frente ao supermercado.', 'Centro', 'Rua Principal', '25.689-420', 'Em frente ao estacionamento da praça', 'Finalizado', ARRAY['https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/vazamento-agua.jpg'], 3, '2025-04-01T12:00:00', NOW()),
  ('Lâmpada queimada no parque', 'Uma das lâmpadas do poste no parque está queimada, deixando a área escura à noite.', 'Vila Nova', 'Rua das Flores', '56.812-350', 'Próximo à esquina', 'Aberto', ARRAY['https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/lampada-queimada.jpg'], 4, '2025-04-02T10:00:00', NOW()),
  ('Bueiro entupido na esquina', 'O bueiro na esquina da Rua das Flores está entupido e causando alagamentos.', 'Jardim América', 'Avenida Central', '12.398-501', NULL, 'Andamento', ARRAY['https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/bueiro-entupido.jpeg'], 4, '2025-04-03T08:00:00', NOW()),
  ('Passeio com buracos na Avenida Central', 'Os buracos no passeio estão representando um perigo para os pedestres.', 'Jardim Botânico', 'Rua das Árvores', '98.145-710', 'Próximo à escola', 'Aberto', ARRAY['https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/passeio-buracos.jpg'], 3, '2025-04-04T15:00:00', NOW()),
  ('Falta de coleta de lixo na Vila dos Pássaros', 'O caminhão de lixo não passa pela Vila dos Pássaros há uma semana.', 'Parque Industrial', 'Rua dos Industriais', '00.150-658', NULL, 'Andamento', ARRAY['https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/coleta-lixo.jpg'], 3, '2025-04-05T14:30:00', NOW());

-- Inserindo respostas
INSERT INTO "replies" (description, images, user_id, complaint_id, complaint_status, created_at, updated_at) VALUES
  ('Problema localizado e o conserto foi agendado para amanhã.', ARRAY[]::VARCHAR(255)[], 2, 1, 'Andamento', '2025-04-06T00:00:00', NOW()),
  ('Após vazamento de água na rua principal, nossa equipe respondeu prontamente, localizou e reparou a fonte, com medidas preventivas para evitar recorrências. Priorizamos a rápida resolução para garantir o bem-estar da comunidade', ARRAY['https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/conserto-vazamento-agua.jpg'], 2, 1, 'Finalizado', '2025-04-08T00:00:00', NOW()),
  ('A equipe de manutenção está trabalhando para resolver o problema.', ARRAY[]::VARCHAR(255)[], 2, 3, 'Andamento', '2025-04-05T00:00:00', NOW()),
  ('O departamento responsável foi informado e em breve traremos uma solução.', ARRAY[]::VARCHAR(255)[], 2, 5, 'Andamento', '2025-04-06T00:00:00', NOW()); 