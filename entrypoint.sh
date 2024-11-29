#!/bin/sh

# Copy static files to the volume-mounted directory
cp -r /app/static-files/* /app/_next/static/

# Execute the main command
exec "$@"