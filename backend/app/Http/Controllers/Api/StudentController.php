<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $query = Student::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('registration_number', 'like', "%{$search}%");
            });
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('training_mode')) {
            $query->where('training_mode', $request->training_mode);
        }

        if ($request->has('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }

        $students = $query->orderBy('created_at', 'desc')
            ->paginate($request->per_page ?? 15);

        return response()->json([
            'data' => $students->items(),
            'meta' => [
                'current_page' => $students->currentPage(),
                'last_page' => $students->lastPage(),
                'per_page' => $students->perPage(),
                'total' => $students->total(),
            ],
        ]);
    }

    public function show($id)
    {
        $student = Student::with(['registrations.courses', 'registrations.payments', 'payments'])
            ->find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        return response()->json(['data' => $student]);
    }

    public function update(Request $request, $id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'first_name' => 'sometimes|required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'gender' => 'nullable|string|in:male,female,other',
            'date_of_birth' => 'nullable|date',
            'nationality' => 'nullable|string|max:100',
            'occupation' => 'nullable|string|max:255',
            'education_level' => 'nullable|string|max:100',
            'phone' => 'sometimes|required|string|max:20',
            'whatsapp' => 'nullable|string|max:20',
            'email' => 'sometimes|required|string|email|max:255|unique:students,email,' . $id,
            'region' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'street' => 'nullable|string|max:255',
            'postal_address' => 'nullable|string|max:255',
            'training_mode' => 'nullable|string|in:online,onsite,hybrid',
            'preferred_time' => 'nullable|string|max:100',
            'status' => 'sometimes|required|string|in:pending,approved,rejected',
            'payment_method' => 'nullable|string',
            'payment_status' => 'nullable|string|in:pending,paid,partial,refunded',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $student->update($validator->validated());

        return response()->json([
            'message' => 'Student updated successfully',
            'data' => $student,
        ]);
    }

    public function destroy($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $student->registrations()->delete();
        $student->payments()->delete();
        $student->delete();

        return response()->json(['message' => 'Student deleted successfully']);
    }

    public function approve($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $student->update(['status' => 'approved']);

        return response()->json([
            'message' => 'Student approved successfully',
            'data' => $student,
        ]);
    }

    public function reject($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $student->update(['status' => 'rejected']);

        return response()->json([
            'message' => 'Student rejected successfully',
            'data' => $student,
        ]);
    }

    public function exportExcel(Request $request)
    {
        $query = Student::query();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $students = $query->orderBy('created_at', 'desc')->get();

        $data = $students->map(function ($student) {
            return [
                'Registration Number' => $student->registration_number,
                'First Name' => $student->first_name,
                'Middle Name' => $student->middle_name,
                'Last Name' => $student->last_name,
                'Email' => $student->email,
                'Phone' => $student->phone,
                'Gender' => $student->gender,
                'Nationality' => $student->nationality,
                'Occupation' => $student->occupation,
                'Education Level' => $student->education_level,
                'Region' => $student->region,
                'District' => $student->district,
                'Training Mode' => $student->training_mode,
                'Status' => $student->status,
                'Payment Status' => $student->payment_status,
                'Registered At' => $student->created_at->format('Y-m-d H:i:s'),
            ];
        })->toArray();

        return Excel::download(
            new class($data) implements \Maatwebsite\Excel\Concerns\FromArray, \Maatwebsite\Excel\Concerns\WithHeadings {
                private $data;
                public function __construct(array $data) { $this->data = $data; }
                public function array(): array { return $this->data; }
                public function headings(): array {
                    return ['Registration Number', 'First Name', 'Middle Name', 'Last Name', 'Email', 'Phone', 'Gender', 'Nationality', 'Occupation', 'Education Level', 'Region', 'District', 'Training Mode', 'Status', 'Payment Status', 'Registered At'];
                }
            },
            'students.xlsx'
        );
    }

    public function exportPdf(Request $request)
    {
        $query = Student::query();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $students = $query->orderBy('created_at', 'desc')->get();

        $pdf = Pdf::loadView('exports.students', compact('students'));

        return $pdf->download('students.pdf');
    }
}
