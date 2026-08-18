import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReservationModule } from 'src/reservation/reservation.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [PrismaModule, ReservationModule, FavoritesModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
