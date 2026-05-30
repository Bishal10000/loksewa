#!/bin/bash
/usr/local/bin/php artisan config:cache
/usr/local/bin/php artisan serve --host=0.0.0.0 --port=8000
