import { ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";

interface PostgresError extends Error {
  code?: string;
  detail?: string;
}

interface HttpBodyParserError extends Error {
  status?: number;
  type?: string;
}

function isPostgresError(error: unknown): error is PostgresError {
  return error instanceof Error && "code" in error;
}

function isHttpBodyParserError(error: unknown): error is HttpBodyParserError {
  return error instanceof Error && "type" in error;
}

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: null
    });
  }

  if (isHttpBodyParserError(error) && error.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "El cuerpo de la peticion contiene JSON invalido.",
      data: null
    });
  }

  if (isPostgresError(error)) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Ya existe un registro con esos datos unicos.",
        data: null
      });
    }

    if (error.code === "23503") {
      return res.status(400).json({
        success: false,
        message: "El registro relacionado no existe.",
        data: null
      });
    }

    if (error.code === "23514") {
      return res.status(400).json({
        success: false,
        message: "Los datos no cumplen una restriccion de la base de datos.",
        data: null
      });
    }
  }

  logger.error("Error inesperado en la API.", error);

  return res.status(500).json({
    success: false,
    message: "Error interno del servidor.",
    data: null
  });
};
