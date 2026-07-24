<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Registration extends Model {
    protected \ = ['registration_number','student_id','course_id','status','fee'];
    public function student() { return \->belongsTo(Student::class); }
    public function course() { return \->belongsTo(Course::class); }
    public function payment() { return \->hasOne(Payment::class); }
}