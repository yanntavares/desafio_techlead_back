import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Reservation, User } from 'src/generated/prisma/client';
import { hashPassword } from 'src/common/utils/password.util';

type SafeUser = Omit<User, 'password'>;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<SafeUser> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('O email já está em uso');
    }

    return this.prisma.user.create({
      data: { ...createUserDto, password: await hashPassword(createUserDto.password) },
      omit: { password: true },
    });
  }

  async findAll(): Promise<SafeUser[]> {
    return await this.prisma.user.findMany({ omit: { password: true } });
  }

  async findOne(id: string): Promise<SafeUser> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<SafeUser> {
    await this.findOne(id);

    const data = updateUserDto.password
      ? { ...updateUserDto, password: await hashPassword(updateUserDto.password) }
      : updateUserDto;

    return await this.prisma.user.update({
      where: { id },
      data,
      omit: { password: true },
    });
  }

  async findUsersReservation(id: string): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      where: { userId: id },
    });
  }

  async remove(id: string): Promise<SafeUser> {
    await this.findOne(id);

    const [user] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id },
        data: { status: 'INACTIVE' },
        omit: { password: true },
      }),
      this.prisma.reservation.updateMany({
        where: { userId: id, status: 'SCHEDULED' },
        data: { status: 'CANCELED' },
      }),
    ]);

    return user;
  }
}
