import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ReservationService', () => {
  let service: ReservationService;
  let prisma: {
    reservation: { findFirst: jest.Mock; create: jest.Mock };
    user: { findUnique: jest.Mock };
    room: { findUnique: jest.Mock };
  };

  const dto = {
    userId: 'user-1',
    roomId: 'room-1',
    startDateTime: new Date('2026-01-01T16:00:00Z'),
    endDateTime: new Date('2026-01-01T17:00:00Z'),
  };

  beforeEach(async () => {
    prisma = {
      reservation: { findFirst: jest.fn(), create: jest.fn() },
      user: { findUnique: jest.fn().mockResolvedValue({ id: dto.userId }) },
      room: { findUnique: jest.fn().mockResolvedValue({ id: dto.roomId }) },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get(ReservationService);
  });

  it('allows a reservation that starts exactly when another ends (no overlap)', async () => {
    // existing reservation: 15h-16h, new one: 16h-17h
    prisma.reservation.findFirst.mockResolvedValue(null);
    prisma.reservation.create.mockResolvedValue({ id: 'r1', ...dto });

    await expect(service.create(dto)).resolves.toBeDefined();

    expect(prisma.reservation.findFirst).toHaveBeenCalledWith({
      where: {
        startDateTime: { lt: dto.endDateTime },
        endDateTime: { gt: dto.startDateTime },
        status: 'SCHEDULED',
        roomId: dto.roomId,
      },
    });
  });

  it('rejects a reservation that overlaps an existing one', async () => {
    prisma.reservation.findFirst.mockResolvedValue({ id: 'existing' });

    await expect(service.create(dto)).rejects.toBeInstanceOf(ConflictException);
    expect(prisma.reservation.create).not.toHaveBeenCalled();
  });
});
