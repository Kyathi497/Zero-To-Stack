import { defineConfig } from 'prisma/config';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { config } from 'dotenv';
import ws from 'ws';

config();

neonConfig.webSocketConstructor = ws;

const databaseUrl = process.env.DATABASE_URL!;
const directDatabaseUrl = process.env.DIRECT_DATABASE_URL ?? databaseUrl;

export default defineConfig({
  earlyAccess: true,
  schema: 'prisma/schema.prisma',
  datasource: {
    url: databaseUrl,
  },
  migrate: {
    async adapter() {
      const pool = new Pool({ connectionString: directDatabaseUrl });
      return new PrismaNeon(pool);
    },
  },
});
