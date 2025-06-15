# App

GymPass style app.

## RFs (Requisitos Funcionais)

São as funcionalidades que o sistema terá, o que será possível fazer na aplicação.

- [ ] Deve ser posssível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível o número de checkins de um usuário logado;
- [ ] Deve ser possível o usuário obter o histórico de checkins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário fazer checkin em uma academia;
- [ ] Deve ser possível validar o checkin de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócio)

São regras que o sistema deve seguir, então casos de exceções ou casos particulares que devem ser seguidos para garantir o funcionamento correto.

- [ ] O usuário não deve poder se cadastrar com um e-mail já cadastrado;
- [ ] O usuário não pode fazer dois checkins no mesmo dia;
- [ ] O usuário não pode fazer checkin se não estiver perto (100 metros) da academia;
- [ ] O checkin só pode ser validado em até 20 minutos após criado;
- [ ] O checkin só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos Não Funcionais)

São requisitos que não estão relacionados diretamente com as funcionalidades do sistema, mas com o sistema como um todo, são muitas vezes questões ligadas com a tecnologia usada para criar as funcionalidades.

- [ ] A senha do usuário deve ser criptografada;
- [ ] Os dados da aplicação precisam ser persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados devem ser paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT;
