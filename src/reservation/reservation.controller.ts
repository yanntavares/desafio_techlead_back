import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/generated/prisma/enums';
import { Roles } from 'src/common/decorators/roles.decorators';
import {
  ApiDocCreateReservation,
  ApiDocDeleteReservation,
  ApiDocFindAllReservation,
  ApiDocFindOneReservation,
  ApiDocUpdateReservation,
} from './reservation.swagger';
import { ApiDocCountRooms } from 'src/room/room.swagger';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocCreateReservation()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiDocFindAllReservation()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get('count')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocCountRooms()
  countReservations() {
    return this.reservationService.getNumberOfReservations();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocFindOneReservation()
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocUpdateReservation()
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiDocDeleteReservation()
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }

  @Patch(':id/complete')
  @UseGuards(JwtAuthGuard, RoleGuard)
  complete(@Param('id') id: string) {
    return this.reservationService.complete(id);
  }
}
