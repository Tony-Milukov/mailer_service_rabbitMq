FROM oven/bun:1.0

WORKDIR /usr/src/app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

RUN bun run build

CMD ["bun", "run", "start"]