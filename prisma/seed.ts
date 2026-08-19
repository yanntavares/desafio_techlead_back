import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role } from '../src/generated/prisma/client';
import { hashPassword } from '../src/common/utils/password.util';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const DEFAULT_PASSWORD = '123456';
const USER_COUNT = 25;
const ROOM_COUNT = 55;
const RESERVATION_COUNT = 150;

const ADMIN_EMAIL = 'admin@seedabit.org.br';
const ADMIN_PASSWORD = '=D&s4f1@';

const FIRST_NAMES = [
  'Ana', 'Bruno', 'Carla', 'Diego', 'Elaine', 'Fábio', 'Gabriela', 'Hugo',
  'Isabela', 'João', 'Karina', 'Lucas', 'Mariana', 'Nelson', 'Otávio', 'Patrícia',
  'Rafael', 'Sofia', 'Thiago', 'Vitória',
];
const LAST_NAMES = [
  'Souza', 'Lima', 'Mendes', 'Alves', 'Ferreira', 'Costa', 'Ribeiro', 'Carvalho',
  'Gomes', 'Barbosa', 'Rocha', 'Dias', 'Pereira', 'Nascimento', 'Cardoso', 'Teixeira',
  'Moura', 'Freitas', 'Correia', 'Batista',
];

const ROOM_ADJECTIVES = [
  'Grande', 'Pequena', 'Nova', 'Central', 'Moderna', 'Executiva', 'Criativa', 'Ágil',
  'Colaborativa', 'Silenciosa',
];
const ROOM_NOUNS = [
  'Aurora', 'Boreal', 'Cedro', 'Delta', 'Estrela', 'Fênix', 'Girassol', 'Horizonte',
  'Ipê', 'Jade', 'Lótus', 'Montanha',
];
const ROOM_AMENITIES = [
  'TV e videoconferência', 'projetor', 'quadro branco', 'ar-condicionado',
  'isolamento acústico', 'vista para o pátio', 'cafezinho por perto', 'tomadas em todas as mesas',
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// embaralha o produto cartesiano de duas listas e pega os primeiros `n` (garante combinações únicas)
function takeUniqueCombinations(a: string[], b: string[], n: number): [string, string][] {
  const combos: [string, string][] = [];
  for (const x of a) for (const y of b) combos.push([x, y]);
  return shuffle(combos).slice(0, n);
}

function randomFutureStart(): Date {
  return new Date(Date.now() + randomInt(1, 60) * 24 * 60 * 60 * 1000);
}

async function main() {
  // roda só uma vez por banco: se o admin já existe, os dados de exemplo já foram gerados antes.
  // evita recriar reservas (deleteMany abaixo) em cima de dados reais a cada restart do container.
  const adminExists = await prisma.user.count({ where: { email: ADMIN_EMAIL } });
  if (adminExists > 0) {
    console.log('Seed já rodou antes (admin já existe) — pulando.');
    return;
  }

  await prisma.user.create({
    data: {
      name: 'Administrador',
      email: ADMIN_EMAIL,
      password: await hashPassword(ADMIN_PASSWORD),
      role: Role.ADMIN,
    },
  });

  const password = await hashPassword(DEFAULT_PASSWORD);

  const userNames = takeUniqueCombinations(FIRST_NAMES, LAST_NAMES, USER_COUNT);
  const users = await Promise.all(
    userNames.map(([first, last]) => {
      const email = `${first}.${last}@seedabit.org.br`.toLowerCase();
      return prisma.user.upsert({
        where: { email },
        update: {},
        create: { name: `${first} ${last}`, email, password },
      });
    }),
  );

  const roomNames = takeUniqueCombinations(ROOM_ADJECTIVES, ROOM_NOUNS, ROOM_COUNT);
  const rooms = await Promise.all(
    roomNames.map(([adj, noun]) => {
      const name = `Sala ${noun} ${adj}`;
      const amenities = shuffle(ROOM_AMENITIES).slice(0, randomInt(1, 3)).join(', ');
      return prisma.room.upsert({
        where: { name },
        update: {},
        create: { name, capacity: randomInt(2, 40), description: `Sala com ${amenities}` },
      });
    }),
  );

  // sem chave única em Reservation: limpa as reservas do seed anterior antes de recriar
  await prisma.reservation.deleteMany({ where: { roomId: { in: rooms.map((r) => r.id) } } });

  // ponytail: sem checagem de conflito de horário entre reservas, não é requisito de dado de seed
  const reservations = Array.from({ length: RESERVATION_COUNT }, () => {
    const startDateTime = randomFutureStart();
    const endDateTime = new Date(startDateTime.getTime() + randomInt(1, 3) * 60 * 60 * 1000);
    return {
      userId: pickRandom(users).id,
      roomId: pickRandom(rooms).id,
      startDateTime,
      endDateTime,
    };
  });
  await prisma.reservation.createMany({ data: reservations });

  console.log(
    `Seed ok: 1 admin (${ADMIN_EMAIL}), ${users.length} usuários, ${rooms.length} salas, ${reservations.length} reservas.`,
  );
  console.log(`Senha padrão dos usuários criados: "${DEFAULT_PASSWORD}"`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
