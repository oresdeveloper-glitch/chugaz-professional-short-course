<?php
namespace Database\Seeders;
use App\Models\Course;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
class CourseSeeder extends Seeder {
    public function run(): void {
        $courses = [
            ['title'=>'Computer Basics','category'=>'Computer Skills','fee'=>100000,'featured'=>true,'instructor_name'=>'Eng. Orresy'],
            ['title'=>'C Programming','category'=>'Programming Languages','fee'=>150000,'featured'=>true,'instructor_name'=>'Arch. Illela'],
            ['title'=>'C++','category'=>'Programming Languages','fee'=>150000,'featured'=>false,'instructor_name'=>'Eng. Orresy'],
            ['title'=>'Python','category'=>'Programming Languages','fee'=>250000,'featured'=>true,'instructor_name'=>'Eng. Godwin'],
            ['title'=>'Java','category'=>'Programming Languages','fee'=>200000,'featured'=>false,'instructor_name'=>'Arch. Illela'],
            ['title'=>'JavaScript','category'=>'Programming Languages','fee'=>180000,'featured'=>true,'instructor_name'=>'Eng. Orresy'],
            ['title'=>'HTML & CSS','category'=>'Programming Languages','fee'=>100000,'featured'=>true,'instructor_name'=>'Eng. Godwin'],
            ['title'=>'Website Design','category'=>'Creative Skills','fee'=>300000,'featured'=>true,'instructor_name'=>'Arch. Illela'],
            ['title'=>'Graphic Design','category'=>'Creative Skills','fee'=>250000,'featured'=>true,'instructor_name'=>'Eng. Godwin'],
            ['title'=>'AutoCAD','category'=>'Engineering & Design','fee'=>150000,'featured'=>true,'instructor_name'=>'Arch. Illela'],
            ['title'=>'ArchiCAD','category'=>'Engineering & Design','fee'=>150000,'featured'=>false,'instructor_name'=>'Arch. Illela'],
            ['title'=>'SolidWorks','category'=>'Engineering & Design','fee'=>200000,'featured'=>true,'instructor_name'=>'Eng. Orresy'],
            ['title'=>'Microsoft Word','category'=>'Computer Skills','fee'=>100000,'featured'=>false,'instructor_name'=>'Eng. Godwin'],
            ['title'=>'Microsoft Excel','category'=>'Computer Skills','fee'=>100000,'featured'=>false,'instructor_name'=>'Eng. Orresy'],
            ['title'=>'Microsoft PowerPoint','category'=>'Computer Skills','fee'=>100000,'featured'=>false,'instructor_name'=>'Eng. Godwin'],
        ];
        foreach ($courses as $course) {
            Course::create(array_merge($course, [
                'slug' => Str::slug($course['title']),
                'description' => "Professional {$course['title']} training course at CHUGAZ Stationery.",
                'duration' => '2 Months', 'currency' => 'TZS', 'image' => null,
                'modules' => ['Module 1: Introduction','Module 2: Fundamentals','Module 3: Advanced Topics','Module 4: Practical Project'],
                'requirements' => ['Basic computer skills'],
                'outcomes' => ['Understand core concepts','Build practical projects','Gain industry-ready skills'],
                'instructor_title' => 'Senior Instructor',
                'instructor_bio' => 'Experienced professional dedicated to student success.',
            ]));
        }
    }
}
