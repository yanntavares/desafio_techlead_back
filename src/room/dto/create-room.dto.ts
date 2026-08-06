import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  capacity!: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description!: string;
}
