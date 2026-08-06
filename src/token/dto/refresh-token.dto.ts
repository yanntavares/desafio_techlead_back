import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty({ message: 'O refresh token não pode estar vazio' })
  @IsString({ message: 'O refresh token deve ser uma string' })
  refreshToken!: string;
}
