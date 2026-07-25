FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    git unzip libsqlite3-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_sqlite mbstring gd xml

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY backend/ /app/

RUN mv .env.example .env 2>/dev/null || true

RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

RUN php artisan key:generate --force

RUN php artisan storage:link

EXPOSE 7860

CMD php artisan migrate --force && \
    php artisan db:seed --force && \
    php artisan serve --host=0.0.0.0 --port=7860
