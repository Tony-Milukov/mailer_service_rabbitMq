import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
    generateToken(
        data: any,
        jwtSecret = process.env.JWT_SECRET,
        ttl: string = '24h',
    ): string {
        try {
            return jwt.sign(data, jwtSecret, { expiresIn: ttl });
        } catch (e) {
            throw e;
        }
    }

    async verifyToken(
        token: string,
        jwtSecret = process.env.JWT_SECRET,
    ): Promise<boolean> {
        try {
            return !!jwt.verify(token, jwtSecret);
        } catch (e) {
            return false;
        }
    }

    async decodeToken(token: string): Promise<any> {
        return jwt.decode(token);
    }
}