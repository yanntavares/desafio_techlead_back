import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Room, Reservation } from 'src/generated/prisma/client';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const existingRoom = await this.prisma.room.findUnique({
      where: { name: createRoomDto.name },
    });

    if (existingRoom) {
      throw new ConflictException('O nome já está em uso');
    }

    return this.prisma.room.create({
      data: createRoomDto,
    });
  }

  async findAll(): Promise<Room[]> {
    return await this.prisma.room.findMany();
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.prisma.room.findUnique({
      where: { id },
    });

    if (!room) {
      throw new NotFoundException('Sala não encontrada');
    }

    return room;
  }

  async findActiveClasses(): Promise<Room[]> {
    return await this.prisma.room.findMany({
      where: {
        OR: [{ status: { equals: 'AVAILABLE' } }, { status: { equals: 'RESERVED' } }],
      },
    });
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    await this.findOne(id);

    return this.prisma.room.update({
      where: { id },
      data: updateRoomDto,
    });
  }

  async remove(id: string): Promise<Room> {
    await this.findOne(id);

    const [room] = await this.prisma.$transaction([
      this.prisma.room.update({
        where: { id },
        data: { status: 'REMOVED' },
      }),
      this.prisma.reservation.updateMany({
        where: { roomId: id, status: 'SCHEDULED' },
        data: { status: 'CANCELED' },
      }),
    ]);

    return room;
  }

  async findRoomReservations(id: string): Promise<Reservation[]> {
    return await this.prisma.reservation.findMany({
      where: { roomId: id },
    });
  }
}
