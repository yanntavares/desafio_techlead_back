import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Reservation } from 'src/generated/prisma/client';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const isConflicting = await this.prisma.reservation.findFirst({
      where: {
        startDateTime: {
          lt: createReservationDto.endDateTime,
        },
        endDateTime: {
          gt: createReservationDto.startDateTime,
        },
        status: 'SCHEDULED',
        roomId: createReservationDto.roomId,
      },
    });

    if (isConflicting) {
      throw new ConflictException('O evento conflita com outro evento existente');
    }
    const existingUser = await this.prisma.user.findUnique({
      where: { id: createReservationDto.userId },
    });

    if (!existingUser) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const existingRoom = await this.prisma.room.findUnique({
      where: { id: createReservationDto.roomId },
    });

    if (!existingRoom) {
      throw new NotFoundException('Sala não encontrada');
    }

    return this.prisma.reservation.create({
      data: createReservationDto,
    });
  }

  async findAll(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany();
  }

  async findOne(id: string): Promise<Reservation> {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException('Reserva não encontrada');
    }

    return reservation;
  }

  async findUsersReservation(id: string): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      where: { userId: id },
    });
  }

  async findRoomReservations(id: string): Promise<Reservation[]> {
    return await this.prisma.reservation.findMany({
      where: { roomId: id },
    });
  }

  async getNumberOfReservations(): Promise<number> {
    return await this.prisma.reservation.count({
      where: { status: 'SCHEDULED' },
    });
  }

  async update(id: string, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    await this.findOne(id);

    return this.prisma.reservation.update({
      where: { id },
      data: updateReservationDto,
    });
  }

  async remove(id: string): Promise<Reservation> {
    await this.findOne(id);

    return this.prisma.reservation.update({
      where: { id },
      data: { status: 'CANCELED' },
    });
  }

  async complete(id: string): Promise<Reservation> {
    await this.findOne(id);

    return this.prisma.reservation.update({
      where: { id },
      data: { status: 'COMPLETED' },
    });
  }
}
