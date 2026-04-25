import { Response } from "express";
import { ApiResponse } from "../types/api-response";

export function sendSuccess<T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T
): Response<ApiResponse<T>> {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
}
