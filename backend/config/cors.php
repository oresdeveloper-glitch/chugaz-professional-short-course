<?php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:3000',
        'https://localhost:3000',
        'https://chugaz-frontend.vercel.app',
        'https://chugazshortcourse.com',
        'https://www.chugazshortcourse.com',
        'https://orresy-chugazprofessionalcourse.hf.space',
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
