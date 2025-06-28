# App

GymPass style app.

## RFs (Requisitos Funcionais)

São as funcionalidades que o sistema terá, o que será possível fazer na aplicação.

- [x] Deve ser posssível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível o número de checkins de um usuário logado;
- [x] Deve ser possível o usuário obter o histórico de checkins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário fazer checkin em uma academia;
- [ ] Deve ser possível validar o checkin de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócio)

São regras que o sistema deve seguir, então casos de exceções ou casos particulares que devem ser seguidos para garantir o funcionamento correto.

- [x] O usuário não deve poder se cadastrar com um e-mail já cadastrado;
- [x] O usuário não pode fazer dois checkins no mesmo dia;
- [x] O usuário não pode fazer checkin se não estiver perto (100 metros) da academia;
- [ ] O checkin só pode ser validado em até 20 minutos após criado;
- [ ] O checkin só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos Não Funcionais)

São requisitos que não estão relacionados diretamente com as funcionalidades do sistema, mas com o sistema como um todo, são muitas vezes questões ligadas com a tecnologia usada para criar as funcionalidades.

- [x] A senha do usuário deve ser criptografada;
- [x] Os dados da aplicação precisam ser persistidos em um banco PostgreSQL;
- [x] Todas as listas de dados devem ser paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT;

## Patterns do Projeto

### Repository Pattern

O padrão Repository é utilizado para abstrair a lógica de acesso a dados, permitindo que a aplicação interaja com diferentes fontes de dados (como bancos de dados, APIs externas, etc.) de forma consistente. Ele facilita a manutenção e testes da aplicação.

No contexto desse projeto o Repository Pattern é utilizado para termos uma camada de abstração que representa as operações possíveis em um banco de dados. Além disso, com o uso deste pattern foi possível criar um repositório concreto usando Prisma ORM e outro repositório em memória usado para testes unitários.

### DI (Dependency Injection) Pattern

A Injeção de Dependência é um padrão de design que permite que as dependências de uma classe sejam fornecidas externamente, em vez de serem criadas internamente. Isso promove a flexibilidade e a testabilidade do código, permitindo que diferentes implementações de uma dependência sejam injetadas conforme necessário.

No contexto desse projeto, a Injeção de Dependência é utilizada, por exemplo, para injetar o repositório em memória ou o repositório Prisma ORM dependendo do local que está instânciando as classes. Isso permite que o código seja testado de forma isolada e depois possa ser facilmente adaptado para usar o repositório real com o banco de dados PostgreSQL.

### Factory Pattern

O padrão Factory é um padrão que promove a encapsulação da lógica de criação de objetos, tornando o código mais flexível e fácil de manter. Dessa forma quando uma função de alto nível precisa criar um objeto, ela pode delegar essa responsabilidade a uma fábrica, que é responsável por instanciar o objeto correto.

No contexto desse projeto, o Factory é utilizado para criar instâncias de casos de uso (use cases) diretamente, sem que a classe que irá utilizar o caso de uso precise instanciar diretamente a classe e suas dependências. Isso permite que o código seja mais modular e seja mais fácil adicionar ou alterar as dependências de um caso de uso sem afetar outras partes do código.
