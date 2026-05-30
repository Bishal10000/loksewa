#!/bin/sh
cd /var/www
touch /var/www/database/database.sqlite
/usr/local/bin/php artisan config:clear
/usr/local/bin/php artisan config:cache
/usr/local/bin/php artisan migrate --force
/usr/local/bin/php artisan serve --host=0.0.0.0 --port=8000
