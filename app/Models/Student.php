<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Student extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'registration_number', 'first_name', 'middle_name', 'last_name',
        'gender', 'date_of_birth', 'nationality', 'occupation', 'education_level',
        'photo', 'phone', 'whatsapp', 'email', 'password',
        'region', 'district', 'street', 'postal_address',
        'training_mode', 'preferred_time', 'payment_method', 'payment_receipt',
        'payment_status', 'status'
    ];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'email_verified_at' => 'datetime',
        '