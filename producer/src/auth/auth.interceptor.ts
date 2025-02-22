import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UnauthorizedError } from './errors';
import { JwtService } from '../jwt/jwt.service';
import { getRawAsset } from 'node:sea';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    try {
      const request = context.switchToHttp().getRequest();
      const authString = request.headers['authorization'];

      if (!authString) {
        console.log('No auth string');
        throw new UnauthorizedError();
      }


      const [, token] = authString.split(' ');
      const valid = await this.jwtService.verifyToken(token);

      if (!valid) {
        throw new UnauthorizedError();
      }
    } catch (e) {
      throw new UnauthorizedError();
    }

    return next.handle();
  }
}
