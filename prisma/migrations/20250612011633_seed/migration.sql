-- Inserindo usuários com UUIDs específicos para manter as referências
DO $$ 
DECLARE
    user1_id UUID := 'dcad425c-4b9b-4412-b51d-e08d0d856705';
    user2_id UUID := 'f13e14a3-5f0f-456f-a4b9-d7305b6001ba';
    user3_id UUID := 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13';
    user4_id UUID := 'f2b4afc1-3f9d-41ee-a8ab-eb6cbdb8da0e';
    complaint1_id UUID := '1d9547e7-8d94-4271-8c88-a2c1eaf77c3b';
    complaint2_id UUID := 'd300fbda-37eb-453f-9fca-ac602496ca67';
    complaint3_id UUID := 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13';
    complaint4_id UUID := 'ce1d3a0d-0ffa-45d0-8b6a-58094f4dfbee';
    complaint5_id UUID := '4dd6b15c-a576-4631-bb30-22f71b068d2b';
BEGIN
    -- Inserindo usuários
    INSERT INTO "users" (id, name, email, password, role, verified_email, created_at, updated_at) VALUES
    (user1_id, 'João Silva', 'joao@example.com', '$2b$10$bs7J/7bLtDjIk6Iop2xuQuIX4ya0o3QY.o4WVAC0S94tUePLrev3q', 'admin', true, NOW(), NOW()),
    (user2_id, 'Maria Oliveira', 'maria@example.com', '$2b$10$OyuhdHtx0KtfhwRxVnBWV.ujXwiJrUtCDZt13Oty6mg7xityDbH6K', 'admin', true, NOW(), NOW()),
    (user3_id, 'Carlos Santos', 'carlos@example.com', '$2b$10$nTt0xPvcS607UanR86MMWegE/ML9NZDk5.02EQlMEM9FJgtwGfBbW', 'user', true, NOW(), NOW()),
    (user4_id, 'Ana Moares', 'ana@example.com', '$2b$10$Yzq1n4MH2M9s3kACd7LIWeNClUm6FpJf8LKsbqlFksgjGE.GUarCG', 'user', true, NOW(), NOW());

    -- Inserindo reclamações
    INSERT INTO "complaints" (id, title, description, neighborhood, street, zip_code, address_reference, status, images, user_id, created_at, updated_at) VALUES
    (complaint1_id, 'Vazamento de água na rua principal', 'Há um vazamento de água na calçada em frente ao supermercado.', 'Centro', 'Rua Principal', '25.689-420', 'Em frente ao estacionamento da praça', 'Finalizado', ARRAY['https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/vazamento-agua.jpg'], user3_id, '2025-10-01T12:00:00', NOW()),
    (complaint2_id, 'Lâmpada queimada no parque', 'Uma das lâmpadas do poste no parque está queimada, deixando a área escura à noite.', 'Vila Nova', 'Rua das Flores', '56.812-350', 'Próximo à esquina', 'Aberto', ARRAY['https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/lampada-queimada.jpg'], user4_id, '2025-10-02T10:00:00', NOW()),
    (complaint3_id, 'Bueiro entupido na esquina', 'O bueiro na esquina da Rua das Flores está entupido e causando alagamentos.', 'Jardim América', 'Avenida Central', '12.398-501', NULL, 'Andamento', ARRAY['https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/bueiro-entupido.jpeg'], user4_id, '2025-10-03T08:00:00', NOW()),
    (complaint4_id, 'Passeio com buracos na Avenida Central', 'Os buracos no passeio estão representando um perigo para os pedestres.', 'Jardim Botânico', 'Rua das Árvores', '98.145-710', 'Próximo à escola', 'Aberto', ARRAY['https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/passeio-buracos.jpg'], user3_id, '2025-10-04T15:00:00', NOW()),
    (complaint5_id, 'Falta de coleta de lixo na Vila dos Pássaros', 'O caminhão de lixo não passa pela Vila dos Pássaros há uma semana.', 'Parque Industrial', 'Rua dos Industriais', '00.150-658', NULL, 'Andamento', ARRAY['https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/coleta-lixo.jpg'], user3_id, '2025-10-05T14:30:00', NOW());

    -- Inserindo respostas
    INSERT INTO "replies" (description, images, user_id, complaint_id, complaint_status, created_at, updated_at) VALUES
    ('Problema localizado e o conserto foi agendado para amanhã.', ARRAY[]::VARCHAR(255)[], user2_id, complaint1_id, 'Andamento', '2025-10-06T09:00:00', NOW()),
    ('Após vazamento de água na rua principal, nossa equipe respondeu prontamente, localizou e reparou a fonte, com medidas preventivas para evitar recorrências. Priorizamos a rápida resolução para garantir o bem-estar da comunidade', ARRAY['https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/conserto-vazamento-agua.jpg'], user2_id, complaint1_id, 'Finalizado', '2025-10-08T11:30:00', NOW()),
    ('A equipe de manutenção está trabalhando para resolver o problema.', ARRAY[]::VARCHAR(255)[], user2_id, complaint3_id, 'Andamento', '2025-10-05T16:00:00', NOW()),
    ('O departamento responsável foi informado e em breve traremos uma solução.', ARRAY[]::VARCHAR(255)[], user2_id, complaint5_id, 'Andamento', '2025-10-06T13:45:00', NOW());
END $$; 