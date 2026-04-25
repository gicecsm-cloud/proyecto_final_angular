import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  /*
   * Objetivo del servicio:
   * Encapsular localStorage para no repetir JSON.parse y JSON.stringify.
   *
   * Que debe completar el estudiante:
   * Agregar manejo de expiracion o limpieza por usuario si el proyecto crece.
   */

  getItem<T>(key: string, fallback: T): T {
    const rawValue = localStorage.getItem(key);

    if (!rawValue) {
      return fallback;
    }

    try {
      return JSON.parse(rawValue) as T;
    } catch {
      return fallback;
    }
  }

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
