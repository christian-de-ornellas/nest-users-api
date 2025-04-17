# 🧑‍💻 Nest Users API

Este projeto é uma API REST para gerenciamento de usuários, desenvolvida com [NestJS](https://nestjs.com) seguindo os princípios da **Clean Architecture**. O código está organizado de forma a manter separação clara entre regras de negócio, casos de uso, controladores e infraestrutura.

🔗 Repositório: [christian-de-ornellas/nest-users-api](https://github.com/christian-de-ornellas/nest-users-api)

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/)
- [Clean Architecture](https://blog.cleancoder.com/)
- [Docker](https://www.docker.com/) (opcional)
- [Redis](https://redis.io/) (para cache e escalabilidade futura)

---

## 📁 Estrutura de Pastas (Clean Architecture)

```bash
src/
├── application/                      # Camada de domínio (entidades e casos de uso)
│   ├── tokens/
│   └── use-cases/
├── infratructure/                     # Implementações técnicas (ORM, banco, cache, etc.)
│   ├── database/
│   ├── prisma/
│   └── cache/
├── domain/                       # Casos de uso orquestrados (application service)
│   └── entities/
    └── repositories/
├── interfaces/              # Camada web (controllers, DTOs, validation)
│   └── controllers/
    └── dtos/
├── main.ts                    # Ponto de entrada da aplicação
```

---

## ⚙️ Execução da database com docker (opcional)
```bash
docker-compose up
```

## ⚙️ Instalação e Execução

### 1. Clone o projeto

```bash
git clone https://github.com/christian-de-ornellas/nest-users-api.git
cd nest-users-api
```

### 2. Instale as dependências

```bash
npm install
ou 
yarn
```

### 3. Configure o banco de dados

Crie um arquivo `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/nest_users_api"
```

### 4. Gere o banco com Prisma

```bash
npx prisma migrate dev --name init
```

### 5. Inicie o servidor

```bash
npm run start:dev
```

A API estará disponível em:  
📍 http://localhost:3000

---

## 📖 Documentação da API (Swagger)

Acesse a documentação interativa:

📄 http://localhost:3000/api

---

## ✅ Funcionalidades da API

- 🔍 Listar todos os usuários
- 👤 Buscar usuário por ID
- ➕ Criar novo usuário
- ✏️ Atualizar usuário existente
- 🗑️ Excluir usuário

---

## 🧪 Testes

```bash
npm run test:e2e
ou
yarn test:e2e
```

---

## 📦 Build para Produção

```bash
npm run build
```

---

## ☁️ Deploy com Docker

```bash
docker-compose up --build
```

---

## 📚 Referências

- [NestJS Clean Architecture Example](https://docs.nestjs.com/recipes)
- [Prisma Docs](https://www.prisma.io/docs)
- [DDD com Node.js](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/)

---

Feito com 💻 por [@christian-de-ornellas](https://github.com/christian-de-ornellas)