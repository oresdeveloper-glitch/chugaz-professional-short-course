<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->to('/api/documentation');
});

Route::get('/{any}', function () {
    return response()->json(['message' => 'Not Found'], 404);
})->where('any', '.*');
