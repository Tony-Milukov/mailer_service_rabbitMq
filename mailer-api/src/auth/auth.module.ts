import { Module } from '@nestjs/common';
import { JwtModule } from '../jwt/jwt.module';
import { AuthInterceptor } from './auth.interceptor';

@Module({
  imports: [JwtModule],
  controllers: [],
  providers: [AuthInterceptor],
  exports: [AuthInterceptor]
})
export class AuthModule {

}
