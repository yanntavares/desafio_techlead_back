import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReservationModule } from 'src/reservation/reservation.module';

@Module({
  imports: [PrismaModule, ReservationModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
