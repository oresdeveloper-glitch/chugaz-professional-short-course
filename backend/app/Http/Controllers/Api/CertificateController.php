<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Barryvdh\DomPDF\Facade\Pdf;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class CertificateController extends Controller
{
    public function index(Request $request)
    {
        $query = Certificate::with(['student', 'registration.courses']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('certificate_number', 'like', "%{$search}%")
                  ->orWhereHas('student', function ($sq) use ($search) {
                      $sq->where('first_name', 'like', "%{$search}%")
                         ->orWhere('last_name', 'like', "%{$search}%");
                  });
            });
        }

        $certificates = $query->orderBy('created_at', 'desc')
            ->paginate($request->per_page ?? 15);

        return response()->json([
            'data' => $certificates->items(),
            'meta' => [
                'current_page' => $certificates->currentPage(),
                'last_page' => $certificates->lastPage(),
                'per_page' => $certificates->perPage(),
                'total' => $certificates->total(),
            ],
        ]);
    }

    public function generate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'registration_id' => 'required|exists:registrations,id',
            'student_id' => 'required|exists:students,id',
            'completion_date' => 'required|date',
            'grade' => 'nullable|string|max:50',
            'remarks' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $registration = Registration::with(['student', 'courses'])->find($request->registration_id);

        $certificateNumber = 'CRT-' . strtoupper(substr(md5(uniqid()), 0, 12));

        $qrCodeData = json_encode([
            'certificate' => $certificateNumber,
            'student' => $registration->student->registration_number,
            'name' => $registration->student->first_name . ' ' . $registration->student->last_name,
            'date' => $request->completion_date,
        ]);

        $qrCodeSvg = QrCode::format('svg')->size(200)->generate($qrCodeData);
        $qrCodePath = 'certificates/qrcodes/' . $certificateNumber . '.svg';
        \Illuminate\Support\Facades\Storage::disk('public')->put($qrCodePath, $qrCodeSvg);

        $pdf = Pdf::loadView('exports.certificate', [
            'certificateNumber' => $certificateNumber,
            'student' => $registration->student,
            'courses' => $registration->courses,
            'completionDate' => $request->completion_date,
            'grade' => $request->grade,
            'remarks' => $request->remarks,
            'qrCode' => storage_path('app/public/' . $qrCodePath),
        ]);

        $pdfPath = 'certificates/' . $certificateNumber . '.pdf';
        \Illuminate\Support\Facades\Storage::disk('public')->put($pdfPath, $pdf->output());

        $cloudinaryResult = null;
        try {
            $uploaded = Cloudinary::upload(storage_path('app/public/' . $pdfPath), [
                'folder' => 'certificates',
                'public_id' => $certificateNumber,
            ]);
            $cloudinaryResult = $uploaded->getSecurePath();
        } catch (\Exception $e) {
            // Cloudinary upload failed, proceed with local file
        }

        $certificate = Certificate::create([
            'certificate_number' => $certificateNumber,
            'student_id' => $request->student_id,
            'registration_id' => $request->registration_id,
            'completion_date' => $request->completion_date,
            'grade' => $request->grade,
            'remarks' => $request->remarks,
            'qr_code_path' => $qrCodePath,
            'file_path' => $pdfPath,
            'cloudinary_url' => $cloudinaryResult,
            'status' => 'generated',
        ]);

        return response()->json([
            'message' => 'Certificate generated successfully',
            'data' => $certificate->load(['student', 'registration.courses']),
        ], 201);
    }
}
