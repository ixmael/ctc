FROM php:8.1-fpm-alpine as builder

COPY ./laravel /app
WORKDIR /app

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && composer global require laravel/installer \
    && composer install --optimize-autoloader --no-dev \
    && ./artisan optimize

#
FROM php:8.1-fpm-alpine

RUN apk add --no-cache postgresql-dev \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pgsql pdo_pgsql

COPY --from=builder /app /app
COPY ./infrastructure/docker/php.conf /usr/local/etc/php-fpm.d/www.conf

WORKDIR /app

ENTRYPOINT [ "php-fpm" ]
CMD [ "-R" ]
