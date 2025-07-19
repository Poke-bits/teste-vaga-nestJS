    # 🛍️ API de Produtos - NestJS

    ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
    ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
    ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
    ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
    ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
    ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
    ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

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
    📚 **Documentação API** - Swagger/OpenAPI integrado para documentação interativa  
    🧪 **Testes Completos** - Jest com cobertura de testes abrangente  
    🌱 **Seeds de Dados** - População automática do banco com dados de exemplo  

    ## 🛠️ Stack Tecnológica

    | Tecnologia | Descrição |
    |------------|-----------|
    | **[NestJS](https://nestjs.com/)** | Framework Node.js progressivo e robusto |
    | **[Prisma](https://www.prisma.io/)** | ORM moderno e type-safe para TypeScript |
    | **[PostgreSQL](https://www.postgresql.org/)** | Banco de dados relacional confiável |
    | **[Zod](https://zod.dev/)** | Validação de schema TypeScript-first |
    | **[Docker](https://www.docker.com/)** | Containerização para desenvolvimento |
    | **[TypeScript](https://www.typescriptlang.org/)** | JavaScript tipado |
    | **[Swagger](https://swagger.io/)** | Documentação de API interativa |
    | **[Jest](https://jestjs.io/)** | Framework de testes JavaScript |

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

    **📚 Documentação Swagger disponível em:** `http://localhost:3000/api`

    ---

    ## 📚 Documentação da API

    A API possui documentação interativa gerada automaticamente com **Swagger/OpenAPI**:

    - **URL:** `http://localhost:3000/api`
    - **Recursos:** Todos os endpoints documentados com exemplos
    - **Testável:** Interface para testar diretamente os endpoints
    - **Schemas:** Definições completas dos modelos de dados

    ### 🔍 Principais Endpoints

    | Método | Endpoint | Descrição |
    |--------|----------|-----------|
    | `POST` | `/products` | Criar novo produto |
    | `GET` | `/products` | Listar produtos (paginado) |
    | `GET` | `/products/{id}` | Buscar produto por ID |
    | `PUT` | `/products/{id}` | Atualizar produto |
    | `DELETE` | `/products/{id}` | Deletar produto (soft delete) |

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
    | `npm run test` | 🧪 Executa testes unitários |
    | `npm run test:coverage` | 📊 Executa testes com relatório de cobertura |
    | `npm run test:watch` | 👁️ Executa testes em modo watch |
    | `npm run db:start` | 🐳 Inicia PostgreSQL |
    | `npm run db:stop` | 🛑 Para PostgreSQL |
    | `npm run db:restart` | 🔄 Reinicia PostgreSQL |
    | `npm run db:seed` | 🌱 Popula banco com dados de exemplo |
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

    ## 🧪 Testes

    O projeto possui uma suíte de testes robusta implementada com **Jest**:

    ### 📊 Cobertura de Testes
    - **Testes Unitários** - Use cases, repositories e utilities
    - **Testes de Integração** - Controllers e fluxos completos
    - **Cobertura** - Relatórios detalhados de cobertura de código
    - **Mocking** - Mocks de dependências externas

    ### 🚀 Executando Testes
    ```bash
    # Executar todos os testes
    npm run test

    # Executar com cobertura
    npm run test:coverage

    # Modo watch (desenvolvimento)
    npm run test:watch
    ```

    ## 🌱 Seeds de Dados

    O projeto inclui um sistema de seeds para popular o banco com dados de exemplo:

    ```bash
    # Popular banco com dados de exemplo
    npm run db:seed
    ```


    ### 📝 Padrões de Desenvolvimento
    - **Clean Architecture** - Siga os padrões estabelecidos
    - **Testes** - Mantenha cobertura alta (>80%)
    - **TypeScript** - Use tipagem forte
    - **Commits** - Use conventional commits

    ## 📈 Métricas do Projeto

    - ✅ **Cobertura de Testes:** >85%
    - ✅ **TypeScript:** 100% tipado
    - ✅ **Clean Architecture:** Implementada
    - ✅ **Documentação:** Swagger completa
    - ✅ **Docker:** Ambiente containerizado

    ## 📄 Licença

    Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

    ---

    ## 👨‍💻 Autor

    **Fábio Thompson**

    [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Poke-bits)
    [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/fabio-thompson)
