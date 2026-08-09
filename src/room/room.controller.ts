import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { Role } from 'src/generated/prisma/enums';
import {
  ApiDocCreateRoom,
  ApiDocDeleteRoom,
  ApiDocFindActiveRoom,
  ApiDocFindAllRoom,
  ApiDocFindRoomReservations,
  ApiDocFindOneRoom,
  ApiDocUpdateRoom,
} from './room.swagger';
import { ReservationService } from 'src/reservation/reservation.service';

@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly reservationService: ReservationService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiDocCreateRoom()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiDocFindAllRoom()
  findAll() {
    return this.roomService.findAll();
  }

  @Get('active')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocFindActiveRoom()
  getActiveClasses() {
    return this.roomService.findActiveClasses();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocFindOneRoom()
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Get(':id/reservations')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiDocFindRoomReservations()
  findRoomReservations(@Param('id') id: string) {
    return this.reservationService.findRoomReservations(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiDocUpdateRoom()
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiDocDeleteRoom()
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }
}
