import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiDocRefreshToken } from './token.swagger';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('refresh')
  @ApiDocRefreshToken()
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.tokenService.refreshTokens(refreshTokenDto.refreshToken);
  }
}
