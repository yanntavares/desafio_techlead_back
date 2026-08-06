import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiDocLogin() {
  return applyDecorators(
    ApiOperation({
      summary: 'Autentica um usuário',
      description: 'Valida email e senha e retorna os tokens de acesso e atualização',
    }),
    ApiResponse({
      status: 201,
      description: 'Login realizado com sucesso',
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
      description: 'Email ou senha inválidos',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocLogout() {
  return applyDecorators(
    ApiOperation({
      summary: 'Encerra a sessão',
      description: 'Revoga o refresh token informado, impedindo que ele gere novos tokens',
    }),
    ApiResponse({
      status: 200,
      description: 'Logout realizado com sucesso',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', description: 'Mensagem de confirmação' },
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
