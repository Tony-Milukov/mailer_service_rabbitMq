import {Params} from 'nestjs-pino';

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
    return {
        target: 'pino-pretty',
        options: { colorize: true },
    };
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

