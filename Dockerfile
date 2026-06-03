FROM php:8.4-fpm

ENV PATH="/usr/local/bin:${PATH}"

RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev \
    libzip-dev libicu-dev libpq-dev nodejs npm \
    && docker-php-ext-install pdo pdo_pgsql pgsql mbstring exif pcntl bcmath gd zip intl \
    && ln -s /usr/local/bin/php /usr/bin/php \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --optimize-autoloader --no-dev --no-interaction

RUN npm install && npm run build

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 8000

CMD ["/bin/sh", "-c", "php artisan migrate --force && php artisan db:seed --force && php artisan config:cache && php artisan storage:link || true && php artisan serve --host=0.0.0.0 --port=${PORT:-8000}"]
