import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as process from "node:process";
import {Logger} from "nestjs-pino";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
            noAck: false,
            urls: [process.env.RABBIT_MQ_URL],
            queue: process.env.RABBIT_MQ_QUEUE,
        },
        bufferLogs: true
    });

    app.useLogger(app.get(Logger));
    await app.listen()
}
bootstrap();