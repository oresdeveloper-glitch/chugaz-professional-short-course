<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('registration_number')->unique();
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('whatsapp')->nullable();
            $table->string('password');
            $table->string('gender')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('nationality')->nullable();
            $table->string('occupation')->nullable();
            $table->string('education_level')->nullable();
            $table->string('photo')->nullable();
            $table->string('region')->nullable();
            $table->string('district')->nullable();
            $table->string('street')->nullable();
            $table->string('postal_address')->nullable();
            $table->string('training_mode')->nullable();
            $table->string('preferred_time')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('payment_receipt')->nullable();
            $table->string('payment_status')->default('pending');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->rememberToken();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('students'); }
};
