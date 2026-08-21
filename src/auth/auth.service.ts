import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from 'src/token/token.service';
import { verifyPassword } from 'src/common/utils/password.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });

    if (user?.status === 'INACTIVE') {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!user || !(await verifyPassword(loginDto.password, user.password))) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    return this.tokenService.createTokens(user.id, user.email, user.role);
  }

  async logout(refreshToken: string): Promise<void> {
    await this.tokenService.revokeToken(refreshToken);
  }
}
