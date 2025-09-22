<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Poppins&size=30&pause=1000&color=007BFF&center=true&vCenter=true&width=435&lines=AcreVisita;Sistema+de+Gerenciamento" alt="Typing SVG" />
</div>

<div align="center">
  <img alt="Status" src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow">
  <img alt="Angular" src="https://img.shields.io/badge/Angular-20.1-red?logo=angular">
  <img alt="Spring Boot" src="https://img.shields.io/badge/Spring%20Boot-3.5-brightgreen?logo=spring-boot">
  <img alt="Java" src="https://img.shields.io/badge/Java-17-blue?logo=java">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-informational">
</div>

<br>

**AcreVisita** é um sistema completo para gerenciamento de visitas e recursos de instituições culturais, como museus, bibliotecas e centros culturais. A plataforma foi desenvolvida para modernizar a gestão de fluxo de visitantes, agendamentos, e interações do público com as instituições, oferecendo uma experiência digital e organizada tanto para os visitantes quanto para a equipe administrativa.

<br>

## 📋 Tabela de Conteúdos

1.  [✨ Sobre o Projeto](#-sobre-o-projeto)
2.  [🚀 Funcionalidades Principais](#-funcionalidades-principais)
3.  [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
4.  [⚙️ Como Executar o Projeto Localmente](#️-como-executar-o-projeto-localmente)
5.  [📄 Documentação da API](#-documentação-da-api)

<br>

## ✨ Sobre o Projeto

Este projeto foi criado para atender a uma demanda da **Fundação de Cultura Elias Mansour**, visando substituir processos manuais e sistemas legados por uma solução web moderna, centralizada e eficiente. O sistema organiza o fluxo de entrada de visitantes, controla o uso de armários, permite o agendamento de espaços como auditórios e gera relatórios estratégicos para apoiar a tomada de decisão.

A aplicação é dividida em dois componentes principais:

-   **`femapp`**: O front-end desenvolvido em **Angular**, responsável pela interface do usuário.
-   **`femapi`**: O back-end **RESTful** construído com **Spring Boot**, que gerencia toda a lógica de negócio e a comunicação com o banco de dados.

<br>

## 🚀 Funcionalidades Principais

O sistema oferece diferentes funcionalidades com base nos perfis de usuário, garantindo uma experiência segura e personalizada.

### 👤 Para Visitantes (`VISITANTE`)

-   **Autenticação**: Cadastro e login seguros no sistema.
-   **Gestão de Visitas**: Agendamento de visitas futuras e registro de entrada imediata (check-in).
-   **Histórico Pessoal**: Visualização do histórico de visitas e agendamentos.
-   **Feedback**: Envio de feedback sobre as visitas realizadas.
-   **Interação Cultural**: Envio de sugestões de filmes e documentários para a filmoteca do local.
-   **Reserva de Espaços**: Solicitação de reserva de auditórios para eventos.
-   **Gestão de Perfil**: Cadastro e atualização de dados pessoais e de endereço.

### 👨‍💼 Para Funcionários (`ATENDENTE`, `COORDENADOR`)

-   **Gerenciamento de Visitas**: Confirmação de entrada e cancelamento de visitas agendadas para o seu setor.
-   **Gerenciamento de Documentos**: Adição e edição de documentos dos visitantes.
-   **Visualização de Feedbacks**: Acesso aos feedbacks e sugestões enviadas pelos visitantes.
-   **Gestão de Sugestões**: Acesso e gerenciamento das sugestões para a filmoteca.

### 📈 Para Gestores (`COORDENADOR`, `ADM`)

-   **Controle de Reservas**: Aprovação ou recusa de solicitações de reserva de auditórios.
-   **Gerenciamento de Auditórios**: Cadastro, edição e visualização da lista de auditórios.
-   **Acesso a Relatórios**: Consulta a dados e estatísticas de uso do sistema (funcionalidade em desenvolvimento).

### 👑 Para Administradores (`ADMINISTRADOR`)

-   **Gestão Total de Usuários**: Cadastro, edição e exclusão de todos os perfis de usuários, incluindo funcionários.
-   **Gerenciamento de Setores**: Criação e edição dos setores da instituição.
-   **CRUD de Armários**: Gerenciamento completo dos armários disponíveis.
-   **Acesso ao Histórico Completo**: Visualização de logs e movimentações no sistema.

<br>

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando uma arquitetura moderna, com tecnologias de ponta para o back-end e front-end.

### **Back-end (API REST)**

-   **Java 17**
-   **Spring Boot 3.5**
-   **Spring Data JPA (Hibernate)** para persistência de dados
-   **Spring Security** para autenticação e controle de acesso
-   **MySQL** como banco de dados relacional
-   **Maven** para gerenciamento de dependências
-   **SpringDoc OpenAPI** para documentação da API (Swagger UI)

### **Front-end (Single Page Application)**

-   **Angular 20.1**
-   **TypeScript**
-   **Angular CLI**
-   **RxJS** para programação reativa
-   **Standalone Components**
-   **NgxMask** para formatação de inputs

<br>

## ⚙️ Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### **Pré-requisitos**

-   **Java JDK 17** ou superior
-   **Maven 3.8+**
-   **MySQL Server 8+** (ou um banco de dados compatível)
-   **Node.js 20+**
-   **Angular CLI** (`npm install -g @angular/cli`)

### **1. Back-end (API)**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/darkyelino/acre-visita.git](https://github.com/darkyelino/acre-visita.git)
    cd acre-visita/femapi
    ```

2.  **Configure o Banco de Dados:**
    -   Abra o arquivo `src/main/resources/application.properties`.
    -   Altere as propriedades `spring.datasource.url`, `spring.datasource.username`, e `spring.datasource.password` com os dados do seu banco de dados MySQL.

3.  **Execute a Aplicação:**
    ```bash
    mvn spring-boot:run
    ```
    A API estará em execução em `http://localhost:8080`.

### **2. Front-end (App)**

1.  **Navegue até a pasta do front-end:**
    ```bash
    cd ../femapp
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute a Aplicação:**
    ```bash
    ng serve
    ```
    A aplicação estará disponível em `http://localhost:4200`.

<br>

## 📄 Documentação da API

A documentação da API é gerada automaticamente pelo **SpringDoc** e pode ser acessada através do Swagger UI. Após iniciar o back-end, acesse:

[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---
## 🔗 Links de Planejamento

* **Figma (Protótipo):** [Acesse o protótipo aqui](https://www.figma.com/design/cPsfqcAWLQi9S/Prototipa%C3%A7%C3%A3o-Est%C3%A1gio?node-id=0-1&t=QeW3pyDRnG1igaMf-1)
* **LucidChart (Diagrama de Entidade-Relacionamento):** [Acesse o diagrama aqui](https://lucid.app/lucidchart/f56721b1-381c-4dbc-a61d-422c37270a30/edit?view_items=mo6ArswClCKI&invitationId=inv_a459e2d0-6009-4fde-bc6a-14572ba55c9e)

## 📊 Diagrama de Classes

![Diagrama de Classes](/Documentation/Diagrama.svg)