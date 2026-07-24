<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\RegistrationController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\NewsController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/contact', [ContactController::class, 'send']);

// Public data
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{id}', [CourseController::class, 'show']);
Route::get('/gallery', [GalleryController::class, 'index']);
Route::get('/news', [NewsController::class, 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // Registration
    Route::post('/registrations', [RegistrationController::class, 'store']);
    Route::get('/registrations/{id}', [RegistrationController::class, 'show']);

    // Student Dashboard
    Route::get('/dashboard/student', [DashboardController::class, 'studentDashboard']);
    Route::get('/dashboard/student/courses', [DashboardController::class, 'studentCourses']);
    Route::get('/dashboard/student/payments', [DashboardController::class, 'studentPayments']);
    Route::get('/dashboard/student/certificates', [DashboardController::class, 'studentCertificates']);

    // Admin routes
    Route::middleware('admin')->group(function () {
        Route::get('/dashboard/admin', [DashboardController::class, 'adminDashboard']);
        Route::get('/students', [StudentController::class, 'index']);
        Route::get('/students/{id}', [StudentController::class, 'show']);
        Route::put('/students/{id}', [StudentController::class, 'update']);
        Route::delete('/students/{id}', [StudentController::class, 'destroy']);
        Route::post('/students/{id}/approve', [StudentController::class, 'approve']);
        Route::post('/students/{id}/reject', [StudentController::class, 'reject']);

        Route::post('/courses', [CourseController::class, 'store']);
        Route::put('/courses/{id}', [CourseController::class, 'update']);
        Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

        Route::get('/payments', [PaymentController::class, 'index']);
        Route::put('/payments/{id}', [PaymentController::class, 'update']);

        Route::post('/certificates/generate', [CertificateController::class, 'generate']);
        Route::get('/certificates', [CertificateController::class, 'index']);

        Route::post('/gallery', [GalleryController::class, 'store']);
        Route::delete('/gallery/{id}', [GalleryController::class, 'destroy']);

        Route::post('/news', [NewsController::class, 'store']);
        Route::put('/news/{id}', [NewsController::class, 'update']);
        Route::delete('/news/{id}', [NewsController::class, 'destroy']);

        // Export routes
        Route::get('/exports/students', [StudentController::class, 'exportExcel']);
        Route::get('/exports/students/pdf', [StudentController::class, 'exportPdf']);
        Route::get('/exports/payments', [PaymentController::class, 'exportExcel']);
    });
});
