import {Params} from 'nestjs-pino';
import { Options } from 'pino-http';
import {DestinationStream} from "pino";

const isProd = process.env.NODE_ENV === 'production';

function getProdSerializers() {
    if (!isProd) {
        return {};
    }

    return {
        req: (req) => ({
            method: req.method,
            url: req.url,
            id: req.id,
        }),
        res: (res) => ({
            statusCode: res.statusCode,
            responseTime: res.responseTime,
        }),
    };
}

function getTransport() {
    const options: Options | any  = {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:HH:MM:ss.l',
            singleLine: true,
            levelFirst: true,
            ignore: 'pid,hostname',
        },
    };

    // if we are not on prod additional options:
    if (!isProd) {
        options.options.colorize = true
    }
    return options
}

export function getLogLevel(): string {
    return isProd ? 'info' : 'debug';
}

export function getLoggerConfig(): Params {
    return {
        pinoHttp: {
            level: getLogLevel(),
            autoLogging: true,
            transport: getTransport(),
            serializers: getProdSerializers(),
        },
    };
}

