# Stage 1: Base Image for Building
FROM node:16-alpine AS base

# Install necessary packages
RUN apk add --no-cache libc6-compat
WORKDIR /app/frontend

# Copy package files and install dependencies
COPY ./frontend/package*.json ./frontend/yarn.lock ./
RUN yarn install

# Stage 2: Build Stage
FROM base AS build

# Copy the rest of the frontend files and build the application
COPY ./frontend /app/frontend/
RUN yarn build

# Stage 3: Final Image
FROM base AS final

# Copy the built files from the build stage
COPY --from=build /app/frontend/build /app/frontend/build

EXPOSE 3000

CMD [ "npm", "start"]