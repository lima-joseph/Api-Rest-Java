# API REST - Sistema de Gestão de Produtos e Clientes

## Início 🏠

Esta API permite gerenciar entidades de `Produto` e `Cliente`, com operações de criação, leitura, atualização e exclusão (CRUD), além de outras opções como buscas por nome e preço. Ela foi desenvolvida em duas partes:
- **BackEnd**: Desenvolvido utilizando Framework SpringBoot em Java.
- **FrontEnd**: Desenvolvido utilizando Html, Css, JavaScript (Para realizar as requisições), e para a estilização, Bootstrap 5.

## Estrutura ⚙️

```
📁 src
└── 📁 main
    └── 📁 java
        └── 📁 com.example.Projeto_Final
            ├── 📂 Controller
            │   ├── 📄 ClienteController.java
            │   └── 📄 ProdutoController.java
            ├── 📂 Model
            │   ├── 📄 Cliente.java
            │   └── 📄 Produto.java
            ├── 📂 Repository
            │   ├── 📄 ClienteRepository.java
            │   └── 📄 ProdutoRepository.java
            └── 📂 View
                ├── 📂 css
                │   ├── 🎨 clientesStyles.css
                │   └── 🎨 produtosStyles.css
                ├── 📂 js
                │   ├── 📜 appClientes.js
                │   └── 📜 appProdutos.js
                └── 📂 pages
                    ├── 🌐 clientes.html
                    ├── 🌐 produtos.html
                    └── 🌐 home.html
📄 ProjetoFinalApplication.java
📄 ProjetoFinalConnection.java
```

## Sumário 📝

### Produto 📦
1. [Adicionar Produto](#1-adicionar-produto)
2. [Listar Todos os Produtos](#2-listar-todos-os-produtos)
3. [Buscar Produto por Código](#3-buscar-produto-por-código)
4. [Buscar Produtos por Início da Descrição](#4-buscar-produtos-por-início-da-descrição)
5. [Buscar Produtos com Preço Inferior ao Valor Especificado](#5-buscar-produtos-com-preço-inferior-ao-valor-especificado)
6. [Buscar Produtos por Marca](#6-buscar-produtos-por-marca)
7. [Buscar Produtos por Descrição Contendo Texto e Preço Inferior ao Valor](#7-buscar-produtos-por-descrição-contendo-texto-e-preço-inferior-ao-valor)
8. [Remover Produto](#8-remover-produto)
9. [Remover Produto por Código](#9-remover-produto-por-código)
10. [Atualizar Produto](#10-atualizar-produto)

### Cliente 👤
1. [Adicionar Cliente](#1-adicionar-cliente)
2. [Listar Todos os Clientes](#2-listar-todos-os-clientes)
3. [Buscar Cliente por Código](#3-buscar-cliente-por-código)
4. [Buscar Clientes pelo Início do Nome](#4-buscar-clientes-pelo-início-do-nome)
5. [Buscar Clientes por Email](#5-buscar-clientes-por-email)
6. [Buscar Clientes por Nome e Email](#6-buscar-clientes-por-nome-e-email)
7. [Remover Cliente](#7-remover-cliente)
8. [Remover Cliente por Código](#8-remover-cliente-por-código)
9. [Atualizar Cliente](#9-atualizar-cliente)

## Endpoints 🔗

### Produto 📦

#### 1. Adicionar Produto
- **Descrição**: Adiciona um novo produto ao banco de dados.
- **Método**: `POST`
- **Endpoint**: `/produto/add`
- **Corpo da Requisição**:
  ```json
  {
    "codigo": 1,
    "descricao": "Descrição do produto",
    "preco": 100.0,
    "marca": "Marca Exemplo"
  }

---

#### 2. Listar Todos os Produtos
- **Descrição**: Retorna uma lista de todos os produtos cadastrados.
- **Método:** GET
- **Endpoint:** `/produto/find/all`

---
  
#### 3. Buscar Produto por Código
- **Descrição:** Retorna o produto correspondente ao código fornecido.
- **Método:** GET
- **Endpoint:** `/produto/find/id/{codigo}`
- **Parâmetros:** `codigo` Código do produto (int)

---
  
#### 4. Buscar Produtos por Início da Descrição
- **Descrição:** Retorna produtos cuja descrição começa com o valor especificado.
- **Método:** GET
- **Endpoint:** `/produto/find/description/starts/{desc}`
- **Parâmetros:** `desc` Texto inicial da descrição (String)

---
  
#### 5. Buscar Produtos com Preço Inferior ao Valor Especificado
- **Descrição:** Retorna produtos com preço menor que o valor fornecido.
- **Método:** GET
- **Endpoint:** `/produto/find/price/less/{price}`
- **Parâmetros:** `price` Limite de preço (double)

---

#### 6. Buscar Produtos por Marca
- **Descrição:** Retorna produtos de uma marca específica.
- **Método:** GET
- **Endpoint:** `/produto/find/marca/{marca}`
- **Parâmetros:** `marca` Nome da marca (String)

---
  
#### 7. Buscar Produtos por Descrição Contendo Texto e Preço Inferior ao Valor
- **Descrição:** Retorna produtos cuja descrição contém um texto específico e que tenham preço menor que o valor especificado.
- **Método:** GET
- **Endpoint:** `/produto/find/description/contains/{desc}/less/{price}`
- **Parâmetros:** `desc` Texto contido na descrição (String), `price` Limite de preço (double)

---

#### 8. Remover Produto
- **Descrição:** Remove um produto específico do banco de dados.
- **Método:** DELETE
- **Endpoint:** `/produto/remove`
- **Corpo da Requisição:**
  ```json
  {
    "codigo": 1,
    "descricao": "Descrição do produto",
    "preco": 100.0,
    "marca": "Marca Exemplo"
  }

---

#### 9. Remover Produto por Código
- **Descrição:** Remove um produto específico pelo código.
- **Método:** DELETE
- **Endpoint:** `/produto/remove/{codigo}`
- **Parâmetros:** `codigo` Código do produto (int)

---

#### 10. Atualizar Produto
- **Descrição:** Atualiza os dados de um produto existente.
- **Método:** PUT
- **Endpoint:** `/produto/update/{codigo}`
- **Parâmetros:** ´codigo´ Código do produto (int)
- **Corpo da Requisição:**
  ```json
  {
    "descricao": "Nova Descrição",
    "preco": 150.0,
    "marca": "Nova Marca"
  }

### Cliente 👤
#### 1. Adicionar Cliente
- **Descrição:** Adiciona um novo cliente ao banco de dados.
- **Método:** POST
- **Endpoint:** `/cliente/add`
- **Corpo da Requisição:**
   ``` json
   {
     "codigo": 1,
     "nome": "Cliente Exemplo",
     "email": "cliente@exemplo.com",
   }

---

### 2. Listar Todos os Clientes
- **Descrição:** Retorna uma lista de todos os clientes cadastrados.
- **Método:** GET
- **Endpoint:** `/cliente/find/all`

---

### 3. Buscar Cliente por Código
- **Descrição:** Retorna o cliente correspondente ao código fornecido.
- **Método:** GET
- **Endpoint:** `/cliente/find/id/{codigo}`
- **Parâmetros:** `codigo` Código do cliente (int)

---

### 4. Buscar Clientes pelo Início do Nome
- **Descrição:** Retorna clientes cujo nome começa com o valor especificado.
- **Método:** GET
- **Endpoint:** `/cliente/find/name/init/{nome}`
- **Parâmetros:** `nome` Texto inicial do nome (String)

---

### 5. Buscar Clientes por Email
- **Descrição:** Retorna clientes com o email especificado.
- **Método:** GET
- **Endpoint:** `/cliente/find/email/{email}`
- **Parâmetros:** `email` Endereço de email (String)

---

### 6. Buscar Clientes por Nome e Email
- **Descrição:** Retorna clientes cujo nome e email correspondem aos valores fornecidos.
- **Método:** GET
- **Endpoint:** `/cliente/find/name/{nome}/email/{email}`
- **Parâmetros:** `nome` Nome do cliente (String), `email` Email do cliente (String)

---

### 7. Remover Cliente
- **Descrição:** Remove um cliente específico do banco de dados.
- **Método:** DELETE
- **Endpoint:** `/cliente/remove`
- **Corpo da Requisição:**
  ``` json
   {
     "codigo": 1,
     "nome": "Cliente Exemplo",
     "email": "cliente@exemplo.com",
   }

---

### 8. Remover Cliente por Código
- **Descrição:** Remove um cliente específico pelo código.
- **Método:** DELETE
- **Endpoint:** `/cliente/remove/{codigo}`
- **Parâmetros:** `codigo` Código do cliente (int)

---
  
### 9. Atualizar Cliente
- **Descrição:** Atualiza os dados de um cliente existente.
- **Método**: PUT
- **Endpoint:** `/cliente/update/{codigo}`
- **Parâmetros:** `codigo` Código do cliente (int)
- **Corpo da Requisição:**
  ``` json
   {
      "nome": "Novo Nome",
      "email": "novoemail@exemplo.com",
    }

---

## Observações
- A API utiliza @CrossOrigin para permitir requisições de diferentes origens.
- É importante que o cliente da API envie as requisições nos formatos corretos, conforme descrito.
- Em caso de erro, a API retornará códigos HTTP adequados, como 404 Not Found para recursos inexistentes ou 400 Bad Request para requisições inválidas.

## Tecnologias Utilizadas

### Spring Boot: 
- Framework principal para construção da API.
### JPA Repository: 
- Para acesso ao banco de dados.
### REST Controller: 
- Para exposição dos endpoints RESTful.


[Voltar ao Início](#início-)
