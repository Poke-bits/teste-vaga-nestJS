# 🛍️ API de Produtos - NestJS

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**Uma API RESTful robusta para gerenciamento de produtos, construída com as melhores práticas de desenvolvimento**

[📖 Documentação](#-sobre-o-projeto) • [🚀 Instalação](#-instalação) • [🧪 Como Testar](#-como-testar) • [📁 Estrutura](#-estrutura-do-projeto)

---

## 📖 Sobre o Projeto

Esta API RESTful foi desenvolvida seguindo os princípios de **Clean Architecture**, proporcionando uma solução escalável e maintível para o gerenciamento de produtos. Com foco em performance, qualidade de código e boas práticas, utiliza as tecnologias mais modernas do ecossistema Node.js.

### ✨ Principais Funcionalidades

🎯 **CRUD Completo** - Criar, listar, buscar, atualizar e deletar produtos  
🛡️ **Validação Robusta** - Validação de dados com Zod e middleware personalizado  
🗄️ **Banco de Dados** - PostgreSQL com Prisma ORM para queries otimizadas  
🐳 **Containerização** - Docker Compose para ambiente de desenvolvimento  
🏗️ **Arquitetura Limpa** - Clean Architecture para máxima escalabilidade  
🔄 **Soft Delete** - Exclusão lógica com campo deletedAt  
📄 **Paginação** - Listagem paginada para melhor performance  
🔤 **Campo Especial** - Cálculo automático de missingLetter  

## 🛠️ Stack Tecnológica

| Tecnologia | Descrição |
|------------|-----------|
| **[NestJS](https://nestjs.com/)** | Framework Node.js progressivo e robusto |
| **[Prisma](https://www.prisma.io/)** | ORM moderno e type-safe para TypeScript |
| **[PostgreSQL](https://www.postgresql.org/)** | Banco de dados relacional confiável |
| **[Zod](https://zod.dev/)** | Validação de schema TypeScript-first |
| **[Docker](https://www.docker.com/)** | Containerização para desenvolvimento |
| **[TypeScript](https://www.typescriptlang.org/)** | JavaScript tipado |

## 📋 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** 18.x ou superior
- **Docker** & **Docker Compose**
- **npm** ou **yarn**
- **Git**

## 🚀 Instalação

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/Poke-bits/teste-vaga-nestJS.git
cd teste-vaga-nestJS
```

### 2️⃣ Instale as dependências
```bash
npm install
```

### 3️⃣ Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/productsdb?schema=public"
PORT=3000
```

### 4️⃣ Execute o projeto
```bash
npm run start
```

> **O que acontece:** 🐳 Inicializa o PostgreSQL → 🔄 Executa migrations → 🎯 Gera cliente Prisma → 🚀 Inicia servidor

**✅ Pronto! A API estará disponível em:** `http://localhost:3000`

---

## 🧪 Como Testar

### 📝 Criar Produto
```http
POST /products
Content-Type: application/json

{
  "name": "Cadeira Gamer RGB",
  "price": 1299.99,
  "sku": "CAD-GMR-001"
}
```

### 📋 Listar Produtos (com paginação)
```http
GET /products?page=1&pageSize=10
```

### 🔍 Buscar Produto por ID
```http
GET /products/{id}
```

### ✏️ Atualizar Produto
```http
PUT /products/{id}
Content-Type: application/json

{
  "name": "Cadeira Gamer RGB Pro",
  "price": 1499.99,
  "sku": "CAD-GMR-002"
}
```

### 🗑️ Deletar Produto
```http
DELETE /products/{id}
```

**Resposta de sucesso:** Status `200` com mensagem de confirmação

---

## 💼 Regras de Negócio

| Campo/Regra | Descrição |
|-------------|-----------|
| 🔤 **missingLetter** | Retorna a primeira letra (a-z) ausente no nome do produto, ou "_" se todas estiverem presentes |
| 🏷️ **SKU único** | Cada produto deve ter um SKU único e obrigatório |
| ✅ **Validação** | Todas as entradas são validadas com Zod |
| 🗑️ **Soft Delete** | Exclusão lógica usando o campo `deletedAt` |

## ⚠️ Códigos de Status HTTP

| Status | Erro | Descrição |
|--------|------|-----------|
| `200` | ✅ Success | Operação realizada com sucesso |
| `201` | ✅ Created | Produto criado com sucesso |
| `400` | ❌ Bad Request | Dados de entrada inválidos |
| `404` | ❌ Not Found | Produto não encontrado |
| `409` | ❌ Conflict | SKU já existe no sistema |
| `500` | ❌ Server Error | Erro interno do servidor |

## 📜 Scripts Disponíveis

| Comando | Função |
|---------|---------|
| `npm run start` | 🚀 Inicia o projeto completo |
| `npm run build` | 🔨 Compila TypeScript |
| `npm run db:start` | 🐳 Inicia PostgreSQL |
| `npm run db:stop` | 🛑 Para PostgreSQL |
| `npm run db:restart` | 🔄 Reinicia PostgreSQL |
| `npm run prisma:generate` | 🎯 Gera cliente Prisma |

## 📁 Estrutura do Projeto

```
src/
├── 🧪 __test__/           # Testes unitários e de integração
│   ├── repository/
│   └── unit/
├── ⚙️  config/            # Configurações (Prisma, etc.)
├── 🔧 constants/          # Constantes da aplicação
├── 🎮 controllers/        # Controladores HTTP
├── 📄 dto/               # Data Transfer Objects
├── 🏗️  entities/          # Entidades de domínio
├── 🔧 infra/             # Camada de infraestrutura
│   ├── http/
│   └── prisma/
├── 🔄 mappers/           # Mapeadores de dados
├── 💾 repositories/      # Repositórios de dados
├── 🎯 use-cases/         # Casos de uso (regras de negócio)
└── 🛠️  utils/            # Utilitários
```

### 🏗️ Arquitetura Clean Architecture

Esta API segue os princípios da Clean Architecture, garantindo:
- **Separação de responsabilidades** clara entre as camadas
- **Independência de frameworks** e bibliotecas externas
- **Testabilidade** alta com injeção de dependências
- **Manutenibilidade** e escalabilidade do código

---

## 👨‍💻 Autor

**Fábio Thompson**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Poke-bits)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/fabio-thompson)
