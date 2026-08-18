import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function ApiDocCreateRoom() {
  return applyDecorators(
    ApiOperation({
      summary: 'Cria uma nova sala',
      description: 'Cria um novo usuário com nome único',
    }),
    ApiResponse({
      status: 201,
      description: 'Sala criada com sucesso',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Id da sala' },
          name: { type: 'string', description: 'Nome da sala' },
          capacity: { type: 'number', description: 'Capacidade da sala' },
          description: { type: 'string', description: 'Descrição da sala ' },
          status: { type: 'string', description: 'Status da sala' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 409,
      description: 'Conflito. O nome já está em uso',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocFindAllRoom() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna todas as salas',
      description: 'Retorna uma lista com todas as salas cadastrados',
    }),
    ApiResponse({
      status: 201,
      description: 'Lista de salas retornada com sucesso',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Id da sala' },
            name: { type: 'string', description: 'Nome da sala' },
            capacity: { type: 'number', description: 'Capacidade da sala' },
            description: { type: 'string', description: 'Descrição da sala ' },
            status: { type: 'string', description: 'Status da sala' },
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

export function ApiDocFindOneRoom() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma sala',
      description: 'Retorna uma sala com base no ID',
    }),
    ApiParam({
      name: 'id',
      description: 'Id da sala',
      required: true,
      schema: {
        type: 'string',
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Sala retornado com sucesso',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Id da sala' },
          name: { type: 'string', description: 'Nome da sala' },
          capacity: { type: 'number', description: 'Capacidade da sala' },
          description: { type: 'string', description: 'Descrição da sala ' },
          status: { type: 'string', description: 'Status da sala' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Sala não encontrada',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocFindRoomReservations() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna todas as reservas da sala',
      description: 'Retorna uma lista com todas as reservas da sala com base no ID',
    }),
    ApiParam({
      name: 'id',
      description: 'Id da sala',
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

export function ApiDocUpdateRoom() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualiza uma sala',
      description: 'Atualiza as informações de uma sala pelo Id',
    }),
    ApiParam({
      name: 'id',
      description: 'Id da sala',
      required: true,
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Id da sala' },
          name: { type: 'string', description: 'Nome da sala' },
          capacity: { type: 'number', description: 'Capacidade da sala' },
          description: { type: 'string', description: 'Descrição da sala ' },
          status: { type: 'string', description: 'Status da sala' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Sala atualizada com sucesso',
    }),
    ApiResponse({
      status: 404,
      description: 'Sala não encontrada',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocDeleteRoom() {
  return applyDecorators(
    ApiOperation({
      summary: 'Deleta uma sala',
      description: 'Torna o status da sala como removida',
    }),
    ApiParam({
      name: 'id',
      description: 'Id da sala',
      required: true,
      schema: {
        type: 'string',
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Sala deletada com sucesso',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Id da sala' },
          name: { type: 'string', description: 'Nome da sala' },
          capacity: { type: 'number', description: 'Capacidade da sala' },
          description: { type: 'string', description: 'Descrição da sala ' },
          status: { type: 'string', description: 'Status da sala' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Sala não encontrada',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocFindActiveRoom() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna todas as salas ativas',
      description: 'Retorna uma lista com todas as salas ativas',
    }),
    ApiResponse({
      status: 201,
      description: 'Lista de salas ativas retornada com sucesso',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Id da sala' },
            name: { type: 'string', description: 'Nome da sala' },
            capacity: { type: 'number', description: 'Capacidade da sala' },
            description: { type: 'string', description: 'Descrição da sala ' },
            status: { type: 'string', description: 'Status da sala' },
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

export function ApiDocCountRooms() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna o número de salas',
    }),
    ApiResponse({
      status: 200,
      description: 'Número de salas retornado com sucesso',
      schema: {
        type: 'object',
        properties: {
          users: { type: 'number', description: 'Número de Salas' },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}
