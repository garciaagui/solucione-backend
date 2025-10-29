# Solucione - Backend

> Sistema de gestão de reclamações e suporte ao cidadão

## 📋 Sobre o Projeto

O **Solucione** é uma API REST desenvolvida em Node.js com TypeScript que permite aos cidadãos registrar reclamações sobre problemas urbanos e acompanhar o status de suas solicitações. O sistema oferece um fluxo completo de gestão de reclamações com autenticação, verificação de email e sistema de respostas.

## Repositórios complementares

- Mobile: https://github.com/garciaagui/solucione-mobile
- Infra: https://github.com/garciaagui/solucione-infra

## 🏗️ Arquitetura

### Padrão de Arquitetura

- **Clean Architecture** com separação clara de responsabilidades
- **MVC Pattern** (Model-View-Controller)
- **Repository Pattern** para acesso a dados
- **Service Layer** para lógica de negócio

### Estrutura do Projeto

```
src/
├── controllers/     # Controladores (camada de apresentação)
├── services/        # Serviços (lógica de negócio)
├── models/          # Modelos (acesso a dados)
├── routes/          # Rotas da API
├── middlewares/     # Middlewares customizados
├── validations/     # Validações de entrada
├── schemas/         # Schemas de validação
├── types/           # Definições de tipos TypeScript
├── utils/           # Utilitários e helpers
└── server.ts        # Ponto de entrada da aplicação
```

## 🛠️ Tecnologias

### Backend

- **Node.js 20.17.0** - Runtime JavaScript
- **TypeScript 5.8.3** - Tipagem estática
- **Express.js 5.1.0** - Framework web
- **Prisma 6.9.0** - ORM para banco de dados

### Banco de Dados

- **PostgreSQL** - Banco de dados principal
- **PgAdmin** - Interface de administração

### Autenticação & Segurança

- **JWT** - Tokens de autenticação
- **bcrypt** - Hash de senhas
- **Helmet** - Headers de segurança
- **CORS** - Controle de origem

### Validação & Documentação

- **Joi** - Validação de dados
- **Morgan** - Logs de requisições

### Email

- **Resend** - Serviço de envio de emails

### Containerização

- **Docker** - Containerização da aplicação
- **Docker Compose** - Orquestração de containers

## 📊 Modelo de Dados

### Entidades Principais

#### User (Usuário)

- **Campos**: id, name, email, password, role, avatar, emailVerified, verifyToken
- **Roles**: user, admin, manager
- **Relacionamentos**: One-to-Many com Complaint e Reply

#### Complaint (Reclamação)

- **Campos**: id, title, description, street, neighborhood, zipCode, addressReference, status, images, userId
- **Status**: Aberto, Analise, Andamento, Finalizado, Arquivado
- **Relacionamentos**: Many-to-One com User, One-to-Many com Reply

#### Reply (Resposta)

- **Campos**: id, description, images, userId, complaintId, complaintStatus
- **Relacionamentos**: Many-to-One com User e Complaint

## 🔌 API Endpoints

### Autenticação (`/api/auth`)

- `POST /login` - Login do usuário
- `POST /register` - Registro de novo usuário
- `GET /verify-email` - Verificação de email
- `POST /logout` - Logout do usuário
- `GET /me` - Informações do usuário autenticado

### Reclamações (`/api/complaints`)

- `GET /` - Listar todas as reclamações
- `GET /:id` - Buscar reclamação por ID

## 🔐 Sistema de Autenticação

### Fluxo de Autenticação

1. **Registro**: Usuário se cadastra com email e senha
2. **Verificação**: Email de verificação é enviado
3. **Login**: Após verificação, usuário pode fazer login
4. **JWT**: Token JWT é gerado e armazenado em cookie httpOnly
5. **Middleware**: Todas as rotas protegidas verificam o token

### Segurança

- Senhas hasheadas com bcrypt (salt rounds: 10)
- Cookies httpOnly e secure em produção
- Tokens JWT com expiração
- Validação de entrada com Joi
- Headers de segurança com Helmet

## 🐳 Docker & Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Compila TypeScript
npm run start        # Inicia servidor de produção

# Banco de dados
npm run prisma:generate  # Gera cliente Prisma
npm run prisma:migrate   # Executa migrações

# Docker
npm run docker:start     # Inicia containers
npm run docker:stop      # Para containers
npm run docker:restart   # Reinicia containers
npm run docker:logs      # Exibe logs
npm run docker:clean     # Remove containers e volumes

# Qualidade de código
npm run lint         # Executa ESLint
npm run format       # Formata código com Prettier
```

### Configuração Docker

- **PostgreSQL**: Porta 5432
- **PgAdmin**: Porta 5050 (admin@admin.com / admin)
- **Health Check**: Verificação automática de saúde do banco
- **Volumes**: Persistência de dados
- **Network**: Rede isolada para containers

## 🚀 Como Executar

### Pré-requisitos

- Node.js 20.17.0+
- Docker e Docker Compose
- npm ou yarn

### Instalação

1. Clone o repositório
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   ```bash
   # Crie um arquivo .env com:
   DATABASE_URL="postgresql://user:password@localhost:5432/solucione"
   JWT_SECRET="seu_jwt_secret"
   RESEND_API_KEY="sua_resend_api_key"
   GOOGLE_GEMINI_API_KEY="sua_gemini_api_key"
   FRONTEND_URL="http://localhost:3000"
   API_PORT=3001
   NODE_ENV="development"
   ```

4. Inicie os containers:

   ```bash
   npm run docker:start
   ```

5. Execute as migrações:

   ```bash
   npm run prisma:migrate
   ```

6. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 📁 Estrutura de Arquivos

### Configuração

- `package.json` - Dependências e scripts
- `tsconfig.json` - Configuração TypeScript
- `docker-compose.yml` - Orquestração de containers
- `Dockerfile` - Imagem da aplicação

### Banco de Dados

- `prisma/schema.prisma` - Schema do banco
- `prisma/migrations/` - Migrações do banco
- `docker/postgres/init.sql` - Scripts de inicialização

### Código Fonte

- `src/server.ts` - Servidor Express
- `src/controllers/` - Controladores da API
- `src/services/` - Lógica de negócio
- `src/models/` - Acesso a dados
- `src/routes/` - Definição de rotas
- `src/middlewares/` - Middlewares customizados
- `src/validations/` - Validações de entrada
- `src/types/` - Tipos TypeScript
- `src/utils/` - Utilitários

## 🔧 Funcionalidades

### ✅ Implementadas

- Sistema de autenticação completo (login, registro, verificação de email, logout)
- Gestão de usuários com roles (user, admin, manager)
- Sistema de respostas (modelo Reply implementado)
- Validação de dados com Joi
- Tratamento de erros com middleware customizado
- Logs de requisições com Morgan
- Containerização com Docker
- Estrutura de banco de dados (User, Complaint, Reply)
- Reclamações
