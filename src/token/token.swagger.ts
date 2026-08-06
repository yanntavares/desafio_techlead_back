import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiDocRefreshToken() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualiza os tokens de acesso',
      description: 'Gera um novo par de tokens a partir de um refresh token válido',
    }),
    ApiResponse({
      status: 201,
      description: 'Tokens atualizados com sucesso',
      schema: {
        type: 'object',
        properties: {
          acessToken: { type: 'string', description: 'Token de acesso (JWT)' },
          refreshToken: { type: 'string', description: 'Token de atualização (JWT)' },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Refresh token inválido',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}
