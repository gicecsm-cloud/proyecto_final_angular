import { app } from "./app";
import { env } from "./config/env";
import { bootstrapDatabase } from "./db/bootstrap";
import { closePool } from "./db/pool";
import { logger } from "./utils/logger";

async function startServer(): Promise<void> {
  try {
    await bootstrapDatabase();

    const server = app.listen(env.port, () => {
      logger.info(`Servidor escuchando en http://localhost:${env.port}`);
    });

    server.on("error", async (error: NodeJS.ErrnoException) => {
      if (error.code === "EADDRINUSE") {
        logger.error(`El puerto ${env.port} ya esta en uso. Cambia PORT en .env.`);
      } else {
        logger.error("Error al levantar el servidor HTTP.", error);
      }

      await closePool();
      process.exit(1);
    });

    const shutdown = async (): Promise<void> => {
      logger.info("Cerrando servidor...");
      server.close(async () => {
        await closePool();
        logger.info("Servidor cerrado correctamente.");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => {
      void shutdown();
    });

    process.on("SIGTERM", () => {
      void shutdown();
    });
  } catch (error) {
    logger.error("No se pudo iniciar la aplicacion.", error);
    process.exit(1);
  }
}

void startServer();
