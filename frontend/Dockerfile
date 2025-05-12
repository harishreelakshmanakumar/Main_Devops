# Stage 1: Build the Vite app
FROM node:18-alpine as build

WORKDIR /app

# Copy only package files first (best practice for layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Fix vulnerabilities
#RUN npm install --omit=dev


# Copy the rest of the app code
COPY . .

# Build the Vite project
RUN npm run build

# Stage 2: Serve the built app
FROM node:18-alpine

WORKDIR /app

# Install the serve package globally
RUN npm install -g serve

# Copy only the built output from previous stage
COPY --from=build /app/dist ./dist

EXPOSE 3000

# Serve the static site
CMD ["serve", "-s", "dist", "-l", "3000"]
