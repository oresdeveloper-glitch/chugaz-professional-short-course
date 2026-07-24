<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category');
            $table->text('description');
            $table->string('duration')->default('2 Months');
            $table->decimal('fee', 10, 2);
            $table->string('currency')->default('TZS');
            $table->string('image')->nullable();
            $table->json('modules')->nullable();
            $table->json('requirements')->nullable();
            $table->json('outcomes')->nullable();
            $table->string('instructor_name');
            $table->string('instructor_title')->nullable();
            $table->string('instructor_image')->nullable();
            $table->text('instructor_bio')->nullable();
            $table->boolean('featured')->default(false);
            $table->boolean('active')->default(true);
            $table->timestamps();