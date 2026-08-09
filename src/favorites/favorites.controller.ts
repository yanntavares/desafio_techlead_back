import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import {
  ApiDocCreateFavoriteRoom,
  ApiDocDeleteFavoriteRoom,
  ApiDocFindAllFavoriteRoom,
  ApiDocFindOneFavoriteRoom,
  ApiDocFindUsersFavorite,
  ApiDocUpdateFavoriteRoom,
} from './favorites.swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocCreateFavoriteRoom()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocFindAllFavoriteRoom()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocFindOneFavoriteRoom()
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(id);
  }

  @Get('user/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocFindUsersFavorite()
  findUsersFavorite(@Param('id') userId: string) {
    return this.favoritesService.findUsersFavorites(userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocUpdateFavoriteRoom()
  update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateFavoriteDto) {
    return this.favoritesService.update(id, updateFavoriteDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocDeleteFavoriteRoom()
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(id);
  }
}
