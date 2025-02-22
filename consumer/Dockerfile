# Use the official Bun image as the base image
FROM oven/bun:1.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and bun.lockb to the working directory
COPY package.json bun.lockb ./

# Install the application dependencies
RUN bun install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN bun run build

# Expose the application port
CMD ["bun", "run", "start"]