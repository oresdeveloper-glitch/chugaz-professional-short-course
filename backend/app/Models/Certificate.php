<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Certificate extends Model {
    protected \ = ['certificate_number','student_id','course_id','file_url','qr_code','issued_date'];
    protected \ = ['issued_date'=>'date'];
    public function student() { return \->belongsTo(Student::class); }
    public function course() { return \->belongsTo(Course::class); }
}