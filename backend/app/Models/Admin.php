<?php
namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class Admin extends Authenticatable {
    use HasApiTokens, Notifiable;
    protected \ = ['name','email','password','role','phone','photo'];
    protected \ = ['password','remember_token'];
    protected \ = ['email_verified_at'=>'datetime'];
}