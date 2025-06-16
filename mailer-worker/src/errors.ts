import { HttpException } from '@nestjs/common';

export class CustomError extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}

