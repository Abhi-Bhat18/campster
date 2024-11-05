# Stage 1: Build the NestJS application
FROM node:20 AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to install dependencies
COPY package*.json ./

# Install dependencies, including devDependencies for the build
RUN yarn install --frozen-lockfile

# Copy the rest of the source code and environment files
COPY . .

# Build the NestJS app
RUN yarn build

# Stage 2: Production image
FROM node:20-alpine AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

# Install only production dependencies
RUN yarn install --frozen-lockfile --production

# Expose the port on which the app will run
EXPOSE 1335

# Start the server using the production build
CMD ["node", "dist/main"]

