import { HttpStatus } from '@nestjs/common';
import { CustomError } from '../errors';

export class AuthError extends CustomError {
  constructor() {
    super('Authentication Failed', HttpStatus.UNAUTHORIZED);
  }
}
export class UnauthorizedError extends CustomError {
  constructor() {
    super('Unauthorized!', HttpStatus.UNAUTHORIZED);
  }
}

export class AuthRequestTokenInvalid extends CustomError {
  constructor() {
    super('The request Token is Invalid!', HttpStatus.NOT_FOUND);
  }
}