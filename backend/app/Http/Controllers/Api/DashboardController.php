<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Registration;
use App\Models\Payment;
use App\Models\Certificate;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function studentDashboard(Request $request)
    {
        $student = $request->user();

        if (!$student instanceof Student) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $registrations = Registration::where('student_id', $student->id);
        $totalCourses = Registration::where('student_id', $student->id)
            ->withCount('courses')->get()->sum('courses_count');

        $activeCourses = (clone $registrations)->where('status', 'approved')->count();
        $completedCourses = (clone $registrations)->where('status', 'completed')->count();
        $totalCertificates = Certificate::where('student_id', $student->id)->count();
        $totalPayments = Payment::where('student_id', $student->id)->sum('amount');
        $pendingPayments = Payment::where('student_id', $student->id)
            ->where('status', 'pending')->sum('amount');

        return response()->json([
            'data' => [
                'total_courses' => $totalCourses,
                'active_courses' => $activeCourses,
                'completed_courses' => $completedCourses,
                'total_certificates' => $totalCertificates,
                'total_payments' => $totalPayments,
                'pending_payments' => $pendingPayments,
                'total_registrations' => (clone $registrations)->count(),
            ],
        ]);
    }

    public function studentCourses(Request $request)
    {
        $student = $request->user();

        if (!$student instanceof Student) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $registrations = Registration::where('student_id', $student->id)
            ->with(['courses', 'payments'])
            ->orderBy('created_at', 'desc')
            ->get();

        $courses = $registrations->map(function ($registration) {
            return [
                'registration' => $registration,
                'courses' => $registration->courses,
                'status' => $registration->status,
                'registered_at' => $registration->created_at,
                'payment_status' => $registration->payments->first()->status ?? null,
            ];
        });

        return response()->json(['data' => $courses]);
    }

    public function studentPayments(Request $request)
    {
        $student = $request->user();

        if (!$student instanceof Student) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $payments = Payment::where('student_id', $student->id)
            ->with(['registration.courses'])
            ->orderBy('created_at', 'desc')
            ->paginate($request->per_page ?? 15);

        return response()->json([
            'data' => $payments->items(),
            'meta' => [
                'current_page' => $payments->currentPage(),
                'last_page' => $payments->lastPage(),
                'per_page' => $payments->perPage(),
                'total' => $payments->total(),
            ],
        ]);
    }

    public function studentCertificates(Request $request)
    {
        $student = $request->user();

        if (!$student instanceof Student) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $certificates = Certificate::where('student_id', $student->id)
            ->with(['registration.courses'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['data' => $certificates]);
    }

    public function adminDashboard(Request $request)
    {
        $totalStudents = Student::count();
        $newRegistrations = Student::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();
        $approvedStudents = Student::where('status', 'approved')->count();
        $pendingStudents = Student::where('status', 'pending')->count();
        $rejectedStudents = Student::where('status', 'rejected')->count();

        $totalRevenue = Payment::where('status', 'approved')->sum('amount');
        $pendingPayments = Payment::where('status', 'pending')->count();
        $approvedPayments = Payment::where('status', 'approved')->count();

        // Student growth chart (last 6 months)
        $studentGrowth = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = now()->subMonths($i);
            $count = Student::whereMonth('created_at', $month->month)
                ->whereYear('created_at', $month->year)
                ->count();
            $studentGrowth[] = [
                'month' => $month->format('M Y'),
                'count' => $count,
            ];
        }

        // Course popularity
        $coursePopularity = \Illuminate\Support\Facades\DB::table('course_registration')
            ->select('course_id', \Illuminate\Support\Facades\DB::raw('count(*) as total'))
            ->groupBy('course_id')
            ->orderBy('total', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                $course = \App\Models\Course::find($item->course_id);
                return [
                    'course_name' => $course ? $course->name : 'Unknown',
                    'registrations' => $item->total,
                ];
            });

        // Income chart (last 6 months)
        $incomeChart = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = now()->subMonths($i);
            $income = Payment::where('status', 'approved')
                ->whereMonth('created_at', $month->month)
                ->whereYear('created_at', $month->year)
                ->sum('amount');
            $incomeChart[] = [
                'month' => $month->format('M Y'),
                'income' => $income,
            ];
        }

        return response()->json([
            'data' => [
                'stats' => [
                    'total_students' => $totalStudents,
                    'new_registrations' => $newRegistrations,
                    'approved_students' => $approvedStudents,
                    'pending_students' => $pendingStudents,
                    'rejected_students' => $rejectedStudents,
                    'total_revenue' => $totalRevenue,
                    'pending_payments' => $pendingPayments,
                    'approved_payments' => $approvedPayments,
                ],
                'charts' => [
                    'student_growth' => $studentGrowth,
                    'course_popularity' => $coursePopularity,
                    'income' => $incomeChart,
                ],
            ],
        ]);
    }
}
