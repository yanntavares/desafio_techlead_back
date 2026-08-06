import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'O email não pode estar vazio' })
  @IsEmail({}, { message: 'Deve ser um email válido' })
  email!: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  password!: string;
}
