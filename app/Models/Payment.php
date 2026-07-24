<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Payment extends Model {
    protected \ = ['reference','student_id','registration_id','amount','currency','payment_method','receipt_url','status','admin_notes'];
    public function student() { return \->belongsTo(Student::class); }
    public function registration() { return \->belongsTo(Registration::class); }
}