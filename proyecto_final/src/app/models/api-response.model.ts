/*
 * Objetivo del archivo:
 * Representar el formato JSON comun que devuelve el backend.
 *
 * Que debe completar el estudiante:
 * Usar ApiResponse<T> cuando cree nuevos metodos HTTP.
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
