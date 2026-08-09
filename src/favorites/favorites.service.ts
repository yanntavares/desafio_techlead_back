import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoriteRoom } from 'src/generated/prisma/client';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFavoriteDto: CreateFavoriteDto): Promise<FavoriteRoom> {
    const existingFavorite = await this.prisma.favoriteRoom.findUnique({
      where: {
        userId_roomId: {
          userId: createFavoriteDto.userId,
          roomId: createFavoriteDto.roomId,
        },
      },
    });

    if (existingFavorite) {
      throw new ConflictException('Esta sala já está favoritada');
    }

    return this.prisma.favoriteRoom.create({
      data: createFavoriteDto,
    });
  }

  async findAll(): Promise<FavoriteRoom[]> {
    return await this.prisma.favoriteRoom.findMany();
  }

  async findOne(id: string) {
    const [userId, roomId] = id.split('_');
    const favorite = await this.prisma.favoriteRoom.findUnique({
      where: {
        userId_roomId: { userId, roomId },
      },
    });

    if (!favorite) {
      throw new NotFoundException('Sala favoritada não encontrada');
    }

    return favorite;
  }

  async findUsersFavorites(id: string) {
    return this.prisma.favoriteRoom.findMany({
      where: {
        userId: id,
      },
    });
  }

  async update(id: string, updateFavoriteDto: UpdateFavoriteDto): Promise<FavoriteRoom> {
    await this.findOne(id);

    const [userId, roomId] = id.split('_');

    return this.prisma.favoriteRoom.update({
      where: {
        userId_roomId: { userId, roomId },
      },
      data: updateFavoriteDto,
    });
  }

  async remove(id: string): Promise<FavoriteRoom> {
    await this.findOne(id);

    const [userId, roomId] = id.split('_');

    return this.prisma.favoriteRoom.delete({
      where: {
        userId_roomId: { userId, roomId },
      },
    });
  }
}
