import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function ApiDocCreateFavoriteRoom() {
  return applyDecorators(
    ApiOperation({
      summary: 'Favorita uma sala',
      description: 'Adiciona uma sala aos favoritos do usuário',
    }),
    ApiResponse({
      status: 201,
      description: 'Sala favoritada com sucesso',
      schema: {
        type: 'object',
        properties: {
          userId: { type: 'string', description: 'Id do usuário' },
          roomId: { type: 'string', description: 'Id da sala' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 409,
      description: 'Conflito. Esta sala já está favoritada',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocFindAllFavoriteRoom() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna todos os favoritos',
      description: 'Retorna uma lista com todos os favoritos cadastrados',
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

export function ApiDocFindOneFavoriteRoom() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um favorito',
      description: 'Retorna um favorito com base no ID',
    }),
    ApiParam({
      name: 'id',
      description: 'Id do favorito',
      required: true,
      schema: {
        type: 'string',
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Favorito retornado com sucesso',
      schema: {
        type: 'object',
        properties: {
          userId: { type: 'string', description: 'Id do usuário' },
          roomId: { type: 'string', description: 'Id da sala' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Favorito não encontrado',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocFindUsersFavorite() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna os favoritos de um usuário',
      description: 'Retorna uma lista com os favoritos de um usuário com base no ID do usuário',
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
      description: 'Lista de favoritos do usuário retornada com sucesso',
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

export function ApiDocUpdateFavoriteRoom() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualiza um favorito',
      description: 'Atualiza as informações de um favorito pelo Id',
    }),
    ApiParam({
      name: 'id',
      description: 'Id do favorito',
      required: true,
      schema: {
        type: 'string',
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Favorito atualizado com sucesso',
    }),
    ApiResponse({
      status: 404,
      description: 'Favorito não encontrado',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocDeleteFavoriteRoom() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remove um favorito',
      description: 'Remove uma sala dos favoritos do usuário',
    }),
    ApiParam({
      name: 'id',
      description: 'Id do favorito',
      required: true,
      schema: {
        type: 'string',
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Favorito removido com sucesso',
      schema: {
        type: 'object',
        properties: {
          userId: { type: 'string', description: 'Id do usuário' },
          roomId: { type: 'string', description: 'Id da sala' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Favorito não encontrado',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}
