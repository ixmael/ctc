FROM php:8.1-fpm-alpine as builder

COPY ./laravel /app
WORKDIR /app

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && composer global require laravel/installer \
    && composer install --optimize-autoloader --no-dev \
    && ./artisan optimize

#
FROM php:8.1-fpm-alpine

RUN apk add --no-cache nginx postgresql-dev \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pgsql pdo_pgsql

COPY --from=builder /app /app
COPY ./infrastructure/docker/laravel.sh /entrypoint.sh
COPY ./infrastructure/docker/laravel.conf /etc/nginx/http.d/default.conf
COPY ./infrastructure/docker/php.conf /usr/local/etc/php-fpm.d/www.conf

RUN chmod +x /entrypoint.sh

WORKDIR /app

ENTRYPOINT [ "/entrypoint.sh" ]
