import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/generated/prisma/enums';
import { Roles } from 'src/common/decorators/roles.decorators';
import {
  ApiDocCreateUser,
  ApiDocDeleteUser,
  ApiDocFindAllUsers,
  ApiDocFindOneUser,
  ApiDocFindUsersFavoritesRooms,
  ApiDocFindUsersReservations,
  ApiDocUpdateUser,
} from './user.swagger';
import { ReservationService } from 'src/reservation/reservation.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly reservationService: ReservationService,
    private readonly favoriteService: FavoritesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocCreateUser()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiDocFindAllUsers()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocFindOneUser()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get(':id/reservations')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocFindUsersReservations()
  findUsersReservations(@Param('id') id: string) {
    return this.reservationService.findUsersReservation(id);
  }

  @Get(':id/favorites')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocFindUsersFavoritesRooms()
  findUsersFavoritesRooms(@Param('id') id: string) {
    return this.favoriteService.findUsersFavorites(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocUpdateUser()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiDocDeleteUser()
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
