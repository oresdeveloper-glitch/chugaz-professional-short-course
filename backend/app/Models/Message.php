<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Message extends Model {
    protected \ = ['name','email','subject','message','read'];
    protected \ = ['read'=>'boolean'];
}