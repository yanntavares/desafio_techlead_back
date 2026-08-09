import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function ApiDocCreateUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Cria um novo usuário',
      description: 'Cria um novo usuário com email único',
    }),
    ApiResponse({
      status: 201,
      description: 'Usuário criado com sucesso',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Id do usuário' },
          email: { type: 'string', description: 'Email do usuário' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 409,
      description: 'Conflito. O email já está em uso',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocFindAllUsers() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna todos os usuários',
      description: 'Retorna uma lista com todos os usuários cadastrados',
    }),
    ApiResponse({
      status: 201,
      description: 'Lista de usuários retornada com sucesso',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Id do usuário' },
            email: { type: 'string', description: 'Email do usuário' },
            createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
          },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocFindOneUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um usuário',
      description: 'Retorna um usuário com base no ID',
    }),
    ApiParam({
      name: 'id',
      description: 'Id do usuário',
      required: true,
      schema: {
        type: 'string',
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Usuário retornado com sucesso',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Id do usuário' },
          email: { type: 'string', description: 'Email do usuário' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Usuário não encontrado',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocFindUsersReservations() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna todas as reservas do usuário',
      description: 'Retorna uma lista com todas as reservas do usuário com base no ID',
    }),
    ApiParam({
      name: 'id',
      description: 'Id do usuário',
      required: true,
      schema: {
        type: 'string',
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Lista de reservas retornada com sucesso',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Id da reserva' },
            userID: { type: 'string', description: 'Id do usuário' },
            roomID: { type: 'string', description: 'Id da sala' },
          },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocFindUsersFavoritesRooms() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna as salas favoritas do usuário',
      description: 'Retorna uma lista com as salas favoritas do usuário com base no ID',
    }),
    ApiParam({
      name: 'id',
      description: 'Id do usuário',
      required: true,
      schema: {
        type: 'string',
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Lista de favoritos retornada com sucesso',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            userId: { type: 'string', description: 'Id do usuário' },
            roomId: { type: 'string', description: 'Id da sala' },
            createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
          },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocUpdateUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualiza um usuário',
      description: 'Atualiza as informações de um usuário pelo Id',
    }),
    ApiParam({
      name: 'id',
      description: 'Id do usuário',
      required: true,
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Id do usuário' },
          email: { type: 'string', description: 'Email do usuário' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Usuário atualizado com sucesso',
    }),
    ApiResponse({
      status: 404,
      description: 'Usuário não encontrado',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocDeleteUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Deleta um usuário',
      description: 'Torna o status do usuário como inativo',
    }),
    ApiParam({
      name: 'id',
      description: 'Id do usuário',
      required: true,
      schema: {
        type: 'string',
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Usuário deletado com sucesso',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Id do usuário' },
          email: { type: 'string', description: 'Email do usuário' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Usuário não encontrado',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}
