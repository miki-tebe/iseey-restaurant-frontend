#!/bin/sh

# Copy static files to the volume-mounted directory
cp -r /app/static-files/* /app/.next/static/

# Execute the main command
exec "$@"