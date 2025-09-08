# AcreVisita

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

AcreVisita é um sistema completo para gerenciamento de visitas e recursos de instituições, como museus ou centros culturais. A plataforma permite o cadastro e login de diferentes tipos de usuários (visitantes, atendentes, coordenadores e administradores), cada um com suas permissões específicas, garantindo uma experiência segura e organizada tanto para o público quanto para a equipe interna.

---
## ✨ Funcionalidades Principais

### Para Visitantes
* **Cadastro e Login:** Sistema de autenticação seguro com senhas criptografadas.
* **Realização de Visitas:** Permite registrar a entrada imediata em um setor.
* **Agendamento de Visitas:** Permite agendar uma visita para uma data e hora futuras.
* **Reserva de Auditórios:** Solicitação de reserva de espaços para eventos.
* **Interação:** Envio de feedback sobre a visita e sugestões para a filmoteca.

### Para Funcionários (Atendente, Coordenador, ADM)
* **Controle de Acesso por Papel (Role):** Rotas e funcionalidades protegidas de acordo com o cargo do usuário (Atendente, Coordenador, Administrador).
* **Gerenciamento de Funcionários (ADM):** Painel para cadastrar, listar, filtrar, editar e excluir usuários do tipo Atendente e Coordenador.
* **Gerenciamento de Auditórios (ADM/Coordenador):** Formulário para cadastro e edição de auditórios e uma tela de listagem com filtros.
* **Confirmação de Reservas (Coordenador):** Tela para aprovar ou recusar solicitações de reserva de auditório.
* **Gerenciamento de Documentos (Atendente):** Interface para adicionar, editar ou excluir documentos (CPF, Passaporte) dos visitantes que fizeram check-in no dia.

---
## 🛠️ Tecnologias Utilizadas

O projeto é construído com uma arquitetura moderna dividida entre back-end e front-end.

### Backend (API REST)
* **Java 17+**
* **Spring Boot 3+**
* **Spring Data JPA (Hibernate)** para persistência de dados.
* **Spring Security** para autenticação e segurança de senhas (BCrypt).
* **MySQL** como banco de dados relacional.
* **Maven** para gerenciamento de dependências.
* **`springdoc-openapi`** para documentação automática da API (Swagger UI).

### Frontend (Single Page Application)
* **Angular 17+**
* **TypeScript**
* **Angular CLI**
* **RxJS** para programação reativa.
* **Angular Router** para gerenciamento de rotas e lazy loading.
* **Standalone Components** para uma arquitetura moderna e modular.

---
## 🚀 Como Executar o Projeto

### Pré-requisitos
* **Java JDK 17** ou superior.
* **Maven 3.8+**
* **MySQL Server 8+**
* **Node.js 18+**
* **Angular CLI** (`npm install -g @angular/cli`)

### Backend (API)
1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    ```
2.  **Configure o Banco de Dados:**
    * Abra o arquivo `src/main/resources/application.properties`.
    * Altere as propriedades `spring.datasource.url`, `spring.datasource.username`, e `spring.datasource.password` com os dados do seu banco MySQL.
3.  **Execute a Aplicação:**
    * Navegue até a pasta raiz do back-end (`femapi`).
    * Execute o comando: `mvn spring-boot:run`
    * A API estará rodando em `http://localhost:8080`.

### Frontend (App)
1.  **Navegue até a pasta do front-end:**
    ```bash
    cd femapp 
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Execute a Aplicação:**
    ```bash
    ng serve
    ```
    * A aplicação estará disponível em `http://localhost:4200`.

---
## 📄 Documentação da API

A API utiliza `springdoc-openapi` para gerar a documentação Swagger UI. Após iniciar o back-end, a documentação interativa pode ser acessada em:
[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---
## 🔗 Links de Planejamento

* **Figma (Protótipo):** [Acesse o protótipo aqui](https://www.figma.com/design/cPsfqcAWLQi9S/Prototipa%C3%A7%C3%A3o-Est%C3%A1gio?node-id=0-1&t=QeW3pyDRnG1igaMf-1)
* **LucidChart (Diagrama de Entidade-Relacionamento):** [Acesse o diagrama aqui](https://lucid.app/lucidchart/f56721b1-381c-4dbc-a61d-422c37270a30/edit?view_items=mo6ArswClCKI&invitationId=inv_a459e2d0-6009-4fde-bc6a-14572ba55c9e)

## 📊 Diagrama de Classes

![Diagrama de Classes](/Documentation/Diagrama.svg)