<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'admin/*', 'admin'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'https://loksewa.qzz.io',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];
