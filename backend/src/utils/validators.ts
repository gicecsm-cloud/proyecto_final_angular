import { AppError } from "./AppError";

export function requireBodyObject(value: unknown): Record<string, unknown> {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    throw new AppError("El cuerpo de la peticion debe ser un objeto JSON valido.", 400);
  }

  return value as Record<string, unknown>;
}

export function parseId(value: string, fieldName = "id"): number {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError(`El parametro ${fieldName} debe ser un numero entero positivo.`, 400);
  }

  return parsed;
}

export function requireString(value: unknown, fieldName: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new AppError(`El campo ${fieldName} es obligatorio.`, 400);
  }

  return value.trim();
}

export function requireEmail(value: unknown, fieldName: string): string {
  const email = requireString(value, fieldName).toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    throw new AppError(`El campo ${fieldName} debe ser un correo electronico valido.`, 400);
  }

  return email;
}

export function optionalString(value: unknown): string | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value !== "string") {
    throw new AppError("El campo debe ser texto.", 400);
  }

  return value.trim();
}

export function requireNumber(value: unknown, fieldName: string): number {
  if (value === undefined || value === null || value === "") {
    throw new AppError(`El campo ${fieldName} es obligatorio.`, 400);
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new AppError(`El campo ${fieldName} debe ser numerico.`, 400);
  }

  return parsed;
}

export function requireNonNegativeNumber(value: unknown, fieldName: string): number {
  const parsed = requireNumber(value, fieldName);

  if (parsed < 0) {
    throw new AppError(`El campo ${fieldName} no puede ser negativo.`, 400);
  }

  return parsed;
}

export function requireInteger(value: unknown, fieldName: string): number {
  if (value === undefined || value === null || value === "") {
    throw new AppError(`El campo ${fieldName} es obligatorio.`, 400);
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed)) {
    throw new AppError(`El campo ${fieldName} debe ser un entero.`, 400);
  }

  return parsed;
}

export function requirePositiveInteger(value: unknown, fieldName: string): number {
  const parsed = requireInteger(value, fieldName);

  if (parsed <= 0) {
    throw new AppError(`El campo ${fieldName} debe ser un entero positivo.`, 400);
  }

  return parsed;
}

export function requireNonNegativeInteger(value: unknown, fieldName: string): number {
  const parsed = requireInteger(value, fieldName);

  if (parsed < 0) {
    throw new AppError(`El campo ${fieldName} no puede ser negativo.`, 400);
  }

  return parsed;
}

export function optionalInteger(value: unknown, fieldName: string): number | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  return requireInteger(value, fieldName);
}

export function optionalPositiveInteger(value: unknown, fieldName: string): number | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  return requirePositiveInteger(value, fieldName);
}

export function optionalBoolean(value: unknown, defaultValue: boolean): boolean {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  if (typeof value !== "boolean") {
    throw new AppError("El campo debe ser verdadero o falso.", 400);
  }

  return value;
}

export function optionalDateString(value: unknown, fieldName: string): string | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value !== "string") {
    throw new AppError(`El campo ${fieldName} debe ser una fecha en formato YYYY-MM-DD.`, 400);
  }

  const trimmed = value.trim();
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);

  if (!dateMatch) {
    throw new AppError(`El campo ${fieldName} debe ser una fecha valida en formato YYYY-MM-DD.`, 400);
  }

  const year = Number(dateMatch[1]);
  const month = Number(dateMatch[2]);
  const day = Number(dateMatch[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  const isValidDate =
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;

  if (!isValidDate) {
    throw new AppError(`El campo ${fieldName} debe ser una fecha valida en formato YYYY-MM-DD.`, 400);
  }

  return trimmed;
}
