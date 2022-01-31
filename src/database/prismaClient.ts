import { PrismaClient as PrismaPg, Prisma } from '../../prisma/generated/client1';
import { PrismaClient as PrismaMysql } from '../../prisma/generated/client2';

const PG_URL = process.env.DATABASE_PG_URL;
const MYSQL_URL = process.env.DATABASE_MYSQL_URL;

const prismaPg = new PrismaPg({
  datasources: {
    db: {
      url: PG_URL,
    },
  },
});

const prismaMysql = new PrismaMysql({
  datasources: {
    db: {
      url: MYSQL_URL,
    },
  },
});

export { prismaPg, prismaMysql, Prisma };