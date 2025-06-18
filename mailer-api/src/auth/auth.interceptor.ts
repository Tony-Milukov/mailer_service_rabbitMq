import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UnauthorizedError } from './errors';
import { JwtService } from '../jwt/jwt.service';
import { getRawAsset } from 'node:sea';
import {InjectPinoLogger, PinoLogger} from "nestjs-pino";

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
      @InjectPinoLogger(AuthInterceptor.name)
      private readonly logger: PinoLogger,
      private jwtService: JwtService
  ) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    try {
      const request = context.switchToHttp().getRequest();
      const authString = request.headers['authorization'];

      if (!authString) {

        this.logger.warn('No auth string');
        throw new UnauthorizedError();
      }


      const [, token] = authString.split(' ');
      const valid = await this.jwtService.verifyToken(token);

      if (!valid) {
        this.logger.warn('JWT token is not valid');
        throw new UnauthorizedError();
      }
    } catch (e) {
      this.logger.warn(e.message || e);
      throw new UnauthorizedError();
    }

    return next.handle();
  }
}
