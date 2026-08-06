import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function ApiDocCreateReservation() {
  return applyDecorators(
    ApiOperation({
      summary: 'Cria uma nova reserva',
      description: 'Cria uma nova reserva para uma sala em um horário disponível',
    }),
    ApiResponse({
      status: 201,
      description: 'Reserva criada com sucesso',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Id da reserva' },
          userId: { type: 'string', description: 'Id do usuário' },
          roomId: { type: 'string', description: 'Id da sala' },
          startDateTime: { type: 'string', format: 'date-time', description: 'Data de início' },
          endDateTime: { type: 'string', format: 'date-time', description: 'Data de término' },
          status: { type: 'string', description: 'Status da reserva' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Usuário ou sala não encontrados',
    }),
    ApiResponse({
      status: 409,
      description: 'Conflito. O horário já está reservado',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocFindAllReservation() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna todas as reservas',
      description: 'Retorna uma lista com todas as reservas cadastradas',
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
            userId: { type: 'string', description: 'Id do usuário' },
            roomId: { type: 'string', description: 'Id da sala' },
            startDateTime: { type: 'string', format: 'date-time', description: 'Data de início' },
            endDateTime: { type: 'string', format: 'date-time', description: 'Data de término' },
            status: { type: 'string', description: 'Status da reserva' },
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

export function ApiDocFindOneReservation() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma reserva',
      description: 'Retorna uma reserva com base no ID',
    }),
    ApiParam({
      name: 'id',
      description: 'Id da reserva',
      required: true,
      schema: {
        type: 'string',
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Reserva retornada com sucesso',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Id da reserva' },
          userId: { type: 'string', description: 'Id do usuário' },
          roomId: { type: 'string', description: 'Id da sala' },
          startDateTime: { type: 'string', format: 'date-time', description: 'Data de início' },
          endDateTime: { type: 'string', format: 'date-time', description: 'Data de término' },
          status: { type: 'string', description: 'Status da reserva' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Reserva não encontrada',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocUpdateReservation() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualiza uma reserva',
      description: 'Atualiza as informações de uma reserva pelo Id',
    }),
    ApiParam({
      name: 'id',
      description: 'Id da reserva',
      required: true,
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Id da reserva' },
          userId: { type: 'string', description: 'Id do usuário' },
          roomId: { type: 'string', description: 'Id da sala' },
          startDateTime: { type: 'string', format: 'date-time', description: 'Data de início' },
          endDateTime: { type: 'string', format: 'date-time', description: 'Data de término' },
          status: { type: 'string', description: 'Status da reserva' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Reserva atualizada com sucesso',
    }),
    ApiResponse({
      status: 404,
      description: 'Reserva não encontrada',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocDeleteReservation() {
  return applyDecorators(
    ApiOperation({
      summary: 'Deleta uma reserva',
      description: 'Torna o status da reserva como cancelada',
    }),
    ApiParam({
      name: 'id',
      description: 'Id da reserva',
      required: true,
      schema: {
        type: 'string',
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Reserva deletada com sucesso',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Id da reserva' },
          userId: { type: 'string', description: 'Id do usuário' },
          roomId: { type: 'string', description: 'Id da sala' },
          startDateTime: { type: 'string', format: 'date-time', description: 'Data de início' },
          endDateTime: { type: 'string', format: 'date-time', description: 'Data de término' },
          status: { type: 'string', description: 'Status da reserva' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Reserva não encontrada',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}
