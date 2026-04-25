import { Client } from "pg";
import { env } from "../config/env";
import { logger } from "../utils/logger";
import { initializeAppPool } from "./pool";
import { initializeSchema } from "./schema";
import { seedDatabase } from "./seed";

const sleep = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

function createAdminClient(): Client {
  return new Client({
    host: env.database.host,
    port: env.database.port,
    user: env.database.user,
    password: env.database.password,
    database: "postgres",
    connectionTimeoutMillis: env.database.connectionTimeoutMillis
  });
}

function quoteIdentifier(identifier: string): string {
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(identifier)) {
    throw new Error(`Nombre de base de datos invalido: ${identifier}`);
  }

  return `"${identifier}"`;
}

export async function waitForPostgres(): Promise<void> {
  logger.info("Verificando disponibilidad de PostgreSQL...");

  for (let attempt = 1; attempt <= env.database.waitRetries; attempt += 1) {
    const client = createAdminClient();

    try {
      await client.connect();
      await client.query("SELECT 1");
      await client.end();
      logger.info("PostgreSQL esta disponible.");
      return;
    } catch (error) {
      await client.end().catch(() => undefined);
      logger.warn(
        `PostgreSQL no esta listo. Intento ${attempt}/${env.database.waitRetries}.`
      );

      if (attempt === env.database.waitRetries) {
        logger.error("No se pudo conectar con PostgreSQL.", error);
        throw error;
      }

      await sleep(env.database.waitDelayMs);
    }
  }
}

export async function ensureDatabaseExists(): Promise<void> {
  const client = createAdminClient();
  const databaseName = env.database.appDatabase;

  logger.info(`Conectando a la base administrativa "postgres"...`);
  await client.connect();

  try {
    const result = await client.query<{ exists: boolean }>(
      "SELECT EXISTS(SELECT 1 FROM pg_database WHERE datname = $1) AS exists",
      [databaseName]
    );

    const exists = result.rows[0]?.exists ?? false;

    if (exists) {
      logger.info(`La base de datos "${databaseName}" ya existe.`);
      return;
    }

    logger.info(`Creando base de datos "${databaseName}"...`);
    await client.query(`CREATE DATABASE ${quoteIdentifier(databaseName)}`);
    logger.info(`Base de datos "${databaseName}" creada correctamente.`);
  } finally {
    await client.end();
  }
}

export async function bootstrapDatabase(): Promise<void> {
  await waitForPostgres();
  await ensureDatabaseExists();

  logger.info(`Conectando a la base de aplicacion "${env.database.appDatabase}"...`);
  initializeAppPool();

  await initializeSchema();
  await seedDatabase();

  logger.info("Bootstrap de base de datos finalizado.");
}
