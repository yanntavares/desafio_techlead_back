import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/generated/prisma/client';
import { randomUUID } from 'node:crypto';
import type { StringValue } from 'ms';
import { UserService } from '../user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

type SecretPayload = {
  sub: string;
  jti: string;
  exp: number;
};

@Injectable()
export class TokenService {
  private readonly jwtSecret = process.env.JWT_SECRET;
  private readonly jwtExpiresIn = process.env.JWT_EXPIRES_IN as StringValue | undefined;
  private readonly jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
  private readonly jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN as
    StringValue | undefined;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  async createTokens(userID: string, email: string, role: Role) {
    const acessToken = await this.jwtService.signAsync(
      {
        sub: userID,
        email,
        role,
        jti: randomUUID(),
      },
      {
        secret: this.jwtSecret,
        expiresIn: this.jwtExpiresIn,
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: userID,
        jti: randomUUID(),
      },
      {
        secret: this.jwtRefreshSecret,
        expiresIn: this.jwtRefreshExpiresIn,
      },
    );

    return { acessToken, refreshToken };
  }

  private async verifyRefreshToken(refreshToken: string): Promise<SecretPayload> {
    try {
      return await this.jwtService.verifyAsync<SecretPayload>(refreshToken, {
        secret: this.jwtRefreshSecret,
      });
    } catch {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  async refreshTokens(refreshToken: string) {
    const payload = await this.verifyRefreshToken(refreshToken);

    const revoked = await this.prisma.revokedToken.findUnique({ where: { jti: payload.jti } });
    if (revoked) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    const user = await this.userService.findOne(payload.sub);

    return this.createTokens(user.id, user.email, user.role);
  }

  async revokeToken(refreshToken: string): Promise<void> {
    const payload = await this.verifyRefreshToken(refreshToken);

    await this.prisma.revokedToken.upsert({
      where: { jti: payload.jti },
      create: { jti: payload.jti, expiresAt: new Date(payload.exp * 1000) },
      update: {},
    });
  }
}
