<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class News extends Model {
    protected \ = ['title','slug','excerpt','content','image','category','published_date','active'];
    protected \ = ['published_date'=>'date','active'=>'boolean'];
}