import dotenv from "dotenv";

dotenv.config();

function readNumber(name: string, defaultValue: number): number {
  const value = process.env[name];

  if (!value) {
    return defaultValue;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`La variable de entorno ${name} debe ser numerica.`);
  }

  return parsed;
}

function readString(name: string, defaultValue: string): string {
  return process.env[name] ?? defaultValue;
}

export const env = {
  nodeEnv: readString("NODE_ENV", "development"),
  port: readNumber("PORT", 3000),
  corsOrigin: readString("CORS_ORIGIN", "http://localhost:4200"),
  database: {
    host: readString("DB_HOST", "localhost"),
    port: readNumber("DB_PORT", 5432),
    user: readString("DB_USER", "postgres"),
    password: readString("DB_PASSWORD", "postgres"),
    appDatabase: readString("DB_NAME", "academic_management"),
    maxPool: readNumber("DB_MAX_POOL", 10),
    connectionTimeoutMillis: readNumber("DB_CONNECTION_TIMEOUT_MS", 5000),
    waitRetries: readNumber("POSTGRES_WAIT_RETRIES", 20),
    waitDelayMs: readNumber("POSTGRES_WAIT_DELAY_MS", 1500)
  }
} as const;
