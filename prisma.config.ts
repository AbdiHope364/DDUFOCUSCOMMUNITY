// Prisma 7 configuration file
export default {
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/ddu_focus_db?schema=public',
  },
};

