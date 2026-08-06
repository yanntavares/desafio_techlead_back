import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O email não pode estar vazio' })
  @IsEmail({}, { message: 'Deve ser um email válido' })
  email!: string;

  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  name!: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @MinLength(6, { message: 'A senha deve conter no mínimo seis dígitos' })
  password!: string;
}
