#!/bin/sh
cd /var/www
/usr/local/bin/php artisan config:clear
/usr/local/bin/php artisan config:cache
/usr/local/bin/php artisan serve --host=0.0.0.0 --port="${PORT:-8000}"
