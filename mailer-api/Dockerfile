FROM oven/bun:1.0

WORKDIR /usr/src/app

COPY package.json bun.lockb ./
COPY prisma ./prisma/

RUN bun install
RUN bunx prisma generate

COPY . .

RUN bun run build

CMD ["bun", "run", "start"]