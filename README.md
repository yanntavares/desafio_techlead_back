# Desafio Tech Lead — API de Reserva de Salas

API REST para gerenciamento de usuários, salas e reservas, com autenticação via JWT
(access + refresh token) e controle de acesso por papel (`USER`/`ADMIN`).

## Stack

- NestJS 11
- Prisma ORM 7 (`@prisma/adapter-pg`) + PostgreSQL
- Autenticação JWT (access + refresh) com Passport (`@nestjs/passport`, `passport-jwt`)
- Validação de payload com `class-validator`/`class-transformer`
- Documentação interativa com Swagger (`@nestjs/swagger`)

## Modelo de dados

![Esquema do banco de dados](src/public/assets/esquema-db.png)

Três entidades:

- **user** — quem faz reservas. `role` (`USER`/`ADMIN`) controla acesso, `status`
  marca contas inativas.
- **room** — as salas reserváveis. `status` indica disponibilidade
  (`AVAILABLE`/`RESERVED`/`REMOVED`).
- **reservation** — liga um `user` a uma `room` num intervalo de tempo
  (`startDateTime`/`endDateTime`), com `status` (`SCHEDULED`/`COMPLETED`/`CANCELED`).

## Organização do projeto

Um módulo por entidade em `src/<entidade>/`, todos seguindo o mesmo padrão:

```
src/<entidade>/
  <entidade>.controller.ts   # rotas HTTP
  <entidade>.service.ts      # regra de negócio + acesso ao Prisma
  <entidade>.module.ts       
  <entidade>.swagger.ts      # decorators de documentação (ApiDoc*), um por rota
  dto/create-<entidade>.dto.ts
  dto/update-<entidade>.dto.ts
```

Módulos: `user`, `room`, `reservation`, `auth` (login/logout) e `token` (emissão e
renovação de JWT).

Compartilhado:

- `src/common/guards/` — `JwtAuthGuard` (valida o Bearer token) e `RoleGuard` (lê
  `@Roles(...)` e compara com o papel do usuário autenticado).
- `src/common/decorators/` — `@Roles(...)` e validadores de data customizados
  (`@IsDateInFuture`, `@IsGreaterThan`).
- `src/common/utils/password.util.ts` — hash/verificação de senha (`scrypt` nativo do
  Node, sem dependência externa).
- `src/prisma/` — `PrismaService`, o client do Prisma injetável em toda a aplicação.
- `src/generated/prisma/` — client gerado por `prisma generate` (não versionado).

## Pré-requisitos

- Node.js 20+
- Uma instância PostgreSQL acessível

## Setup

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto:

```
PORT=3000
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
JWT_SECRET="senha"
JWT_EXPIRES_IN="1d"
JWT_REFRESH_SECRET="outra-senha"
JWT_REFRESH_EXPIRES_IN="7d"
```

Aplique as migrations (cria as tabelas e gera o Prisma Client):

```bash
npx prisma generate
npx prisma migrate dev
```

Suba o servidor em modo desenvolvimento:

```bash
npm run dev
```

A API sobe em `http://localhost:3000`. O Swagger
`http://localhost:3000/api`.
rota.

> **Nota:** `POST /user` exige um token válido, então não é possível criar o primeiro
> usuário pela própria API. Insira o primeiro usuário (idealmente com `role: ADMIN`)
> diretamente no banco antes do primeiro uso.

## Endpoints

Guard `JWT` = precisa de `Authorization: Bearer <acessToken>`. `ADMIN` = além do JWT,
o usuário autenticado precisa ter `role: ADMIN`.

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/auth/login` | — | Login (email + senha), retorna access e refresh token |
| POST | `/auth/logout` | — | Revoga o refresh token informado |
| POST | `/token/refresh` | — | Gera um novo par de tokens a partir de um refresh token válido |
| POST | `/user` | JWT | Cria usuário |
| GET | `/user` | JWT + ADMIN | Lista usuários |
| GET | `/user/:id` | JWT | Busca usuário por id |
| GET | `/user/:id/reservations` | JWT | Lista reservas do usuário |
| PATCH | `/user/:id` | JWT | Atualiza usuário |
| DELETE | `/user/:id` | JWT + ADMIN | Inativa o usuário e cancela suas reservas agendadas |
| POST | `/room` | JWT + ADMIN | Cria sala |
| GET | `/room` | JWT + ADMIN | Lista salas |
| GET | `/room/active` | JWT | Lista salas disponíveis ou reservadas |
| GET | `/room/:id` | JWT | Busca sala por id |
| GET | `/room/:id/reservations` | JWT | Lista reservas da sala |
| PATCH | `/room/:id` | JWT + ADMIN | Atualiza sala |
| DELETE | `/room/:id` | JWT + ADMIN | Remove a sala e cancela suas reservas agendadas |
| POST | `/reservation` | JWT | Cria reserva |
| GET | `/reservation` | JWT + ADMIN | Lista reservas |
| GET | `/reservation/:id` | JWT | Busca reserva por id |
| PATCH | `/reservation/:id` | JWT | Atualiza reserva |
| DELETE | `/reservation/:id` | JWT + ADMIN | Cancela reserva |
