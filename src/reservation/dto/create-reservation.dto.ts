import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { IsDateInFuture, IsGreaterThan } from 'src/common/decorators/date.decorators';

export class CreateReservationDto {
  @IsNotEmpty({ message: 'O id do usuário não pode estar vazio' })
  @IsString({ message: 'O id do usuário deve ser uma string' })
  userId!: string;

  @IsNotEmpty({ message: 'O id da sala não pode estar vazio ' })
  @IsString({ message: 'O id da sala deve ser uma string' })
  roomId!: string;

  @Type(() => Date)
  @IsDate({ message: 'A data de início deve ser uma data válida' })
  @IsDateInFuture({ message: 'A data de início deve ser posterior à data atual' })
  startDateTime!: Date;

  @Type(() => Date)
  @IsDate({ message: 'A data de término deve ser uma data válida' })
  @IsGreaterThan('startDateTime', {
    message: 'A data de término deve ser posterior à data de início',
  })
  endDateTime!: Date;
}
