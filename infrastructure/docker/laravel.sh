#!/bin/sh

# Run migrations
./artisan migrate

# Start php-fpm
php-fpm -D -R

# Start webserver
nginx -g "daemon off;"
