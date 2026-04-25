import { Pool, QueryResult, QueryResultRow } from "pg";
import { env } from "../config/env";

let pool: Pool | null = null;

export function initializeAppPool(): Pool {
  if (pool) {
    return pool;
  }

  pool = new Pool({
    host: env.database.host,
    port: env.database.port,
    user: env.database.user,
    password: env.database.password,
    database: env.database.appDatabase,
    max: env.database.maxPool,
    connectionTimeoutMillis: env.database.connectionTimeoutMillis
  });

  return pool;
}

export function getPool(): Pool {
  if (!pool) {
    throw new Error("El pool de PostgreSQL aun no fue inicializado.");
  }

  return pool;
}

export async function query<T extends QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<QueryResult<T>> {
  return getPool().query<T>(text, params);
}

export async function closePool(): Promise<void> {
  if (!pool) {
    return;
  }

  await pool.end();
  pool = null;
}
