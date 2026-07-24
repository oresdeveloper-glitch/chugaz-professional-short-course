<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Course extends Model {
    protected \ = ['title','slug','category','description','duration','fee','currency','image','modules','requirements','outcomes','instructor_name','instructor_title','instructor_image','instructor_bio','featured','active'];
    protected \ = ['modules'=>'array','requirements'=>'array','outcomes'=>'array','featured'=>'boolean','active'=>'boolean'];
    public function registrations() { return \->hasMany(Registration::class); }
    public function students() { return \->belongsToMany(Student::class,'registrations')->withPivot(['status','fee','created_at'])->withTimestamps(); }
    public function certificates() { return \->hasMany(Certificate::class); }
}