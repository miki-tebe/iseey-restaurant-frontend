#!/bin/bash
# copy-static.sh

# Stop any running containers
docker compose down

# Remove old static files
sudo rm -rf /var/www/next-static/*

# Build and start the container
docker compose -f docker-compose.yml up --build --remove-orphans

# Wait for container to start
sleep 5

# Copy static files from container to host
container_id=$(docker-compose ps -q nextjs)
docker cp $container_id:/app/.next/static/. /var/www/next-static/

# Set proper permissions
sudo chown -R www-data:www-data /var/www/next-static
sudo chmod -R 755 /var/www/next-static

# Restart Nginx
sudo systemctl restart nginx