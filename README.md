# 🛍️ API de Produtos - NestJS

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

> **Uma API RESTful robusta para gerenciamento de produtos, construída com as melhores práticas de desenvolvimento**

## 📖 Índice

- [🌟 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias-utilizadas)
- [🚀 Instalação](#-instalação)
- [🧪 Como Testar](#-testando-com-insomnia--postman)
- [💼 Regras de Negócio](#-regras-de-negócio)
- [🏗️ Arquitetura](#️-estrutura-do-projeto)

---

## 🌟 Sobre o Projeto

Esta API foi desenvolvida seguindo os princípios de **Clean Architecture**, proporcionando uma solução escalável e maintível para o gerenciamento de produtos. Com foco em performance e qualidade de código, utiliza as tecnologias mais modernas do ecossistema Node.js.

## ✨ Funcionalidades

- 🎯 **CRUD Completo** - Criar, listar, buscar, atualizar e deletar produtos
- 🛡️ **Validação Robusta** - Validação de dados com Zod e middleware personalizado
- 🗄️ **Banco de Dados** - PostgreSQL com Prisma ORM para queries otimizadas
- 🐳 **Containerização** - Docker Compose para ambiente de desenvolvimento
- 🏗️ **Arquitetura Limpa** - Clean Architecture para máxima escalabilidade
- 🔄 **Soft Delete** - Exclusão lógica com campo deletedAt
- 📄 **Paginação** - Listagem paginada para melhor performance
- 🔤 **Campo Especial** - Cálculo automático de missingLetter

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| **[NestJS](https://nestjs.com/)** | Framework Node.js progressivo |
| **[Prisma](https://www.prisma.io/)** | ORM moderno para TypeScript |
| **[PostgreSQL](https://www.postgresql.org/)** | Banco de dados relacional |
| **[Zod](https://zod.dev/)** | Validação de schema TypeScript-first |
| **[Docker](https://www.docker.com/)** | Containerização |
| **[TypeScript](https://www.typescriptlang.org/)** | Superset tipado do JavaScript |

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18.x ou superior
- **Docker** & **Docker Compose**
- **npm** ou **yarn**

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

**Este comando irá:**
- 🐳 Inicializar o container PostgreSQL
- 🔄 Executar as migrations do banco
- 🎯 Gerar o cliente Prisma
- 🚀 Iniciar o servidor de desenvolvimento

---

## 🧪 Testando com Insomnia / Postman

### 📝 Criar Produto

```http
POST http://localhost:3000/api/products
Content-Type: application/json
```

```json
{
  "name": "Cadeira Gamer RGB",
  "price": 1299.99,
  "sku": "CAD-GMR-001"
}
```

### 📋 Listar Produtos (com paginação)

```http
GET http://localhost:3000/api/products?page=1&pageSize=10
```

### 🔍 Obter Produto por ID

```http
GET http://localhost:3000/api/products/:id
```

### ✏️ Atualizar Produto

```http
PUT http://localhost:3000/api/products/:id
Content-Type: application/json
```

```json
{
  "name": "Cadeira Gamer RGB Pro",
  "price": 1499.99,
  "sku": "CAD-GMR-002"
}
```

### 🗑️ Deletar Produto

```http
DELETE http://localhost:3000/api/products/:id
```

---

## 💼 Regras de Negócio

| Regra | Descrição |
|-------|-----------|
| 🔤 **missingLetter** | Retorna a primeira letra (a-z) ausente no nome do produto, ou "_" se todas estiverem presentes |
| 🏷️ **SKU único** | Cada produto deve ter um SKU único e obrigatório |
| ✅ **Validação** | Todas as entradas são validadas com Zod |
| 🗑️ **Soft Delete** | Exclusão lógica usando o campo `deletedAt` |

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run start` | Inicia o projeto completo (Docker + Migrations + Servidor) |
| `npm run build` | Compila o TypeScript para JavaScript |
| `npm run db:start` | Inicia apenas o container do PostgreSQL |
| `npm run db:stop` | Para o container do PostgreSQL |
| `npm run db:restart` | Reinicia o container do PostgreSQL |
| `npm run prisma:generate` | Gera o cliente Prisma |

---

## 🏗️ Estrutura do Projeto

```
src/
├── 📁 config/           # Configurações (Prisma, etc.)
│   └── prisma.service.ts
├── 📁 controllers/      # Controladores HTTP
│   └── product.ts
├── 📁 dto/             # Data Transfer Objects
│   └── product/
│       ├── create.ts
│       ├── get.ts
│       └── update.ts
├── 📁 entities/        # Entidades de domínio
│   └── product/
│       └── product.entity.ts
├── 📁 infra/          # Infraestrutura
│   └── http/
│       ├── server.ts
│       └── middleware/
│           └── validate.ts
├── 📁 mappers/        # Mapeadores de dados
│   └── Product.ts
├── 📁 repositories/   # Repositórios de dados
│   └── product/
│       ├── prisma-product.repository.ts
│       └── product.repository.ts
├── 📁 routes/         # Definição de rotas
│   └── product.ts
├── 📁 use-cases/      # Casos de uso (regras de negócio)
│   └── product/
│       ├── create.ts
│       ├── update.ts
│       ├── delete.ts
│       ├── get.ts
│       └── list.ts
└── 📁 utils/          # Utilitários
    └── alphabet.ts
```

---

## ⚠️ Tratamento de Erros

| Status Code | Erro | Descrição |
|-------------|------|-----------|
| **409** | Conflict | SKU duplicado |
| **404** | Not Found | Produto não encontrado |
| **400** | Bad Request | Dados inválidos |
| **500** | Internal Server Error | Erro interno do servidor |

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Fábio Thompson**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Poke-bits)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/fabio-thompson)

---
