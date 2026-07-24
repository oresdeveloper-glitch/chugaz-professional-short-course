<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Models\Course;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class RegistrationController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course_ids' => 'required|array|min:1',
            'course_ids.*' => 'exists:courses,id',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'payment_method' => 'required|string|in:mobile_banking,bank_transfer,cash,cheque',
            'payment_receipt' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:5120',
            'amount_paid' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $student = $request->user();

        if (!$student instanceof \App\Models\Student) {
            return response()->json(['message' => 'Only students can register for courses'], 403);
        }

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('registrations/photos', 'public');
        }

        $receiptPath = null;
        if ($request->hasFile('payment_receipt')) {
            $receiptPath = $request->file('payment_receipt')->store('registrations/receipts', 'public');
        }

        $registrationNumber = 'CHG2026' . str_pad(random_int(10000, 99999), 5, '0', STR_PAD_LEFT);
        while (Registration::where('registration_number', $registrationNumber)->exists()) {
            $registrationNumber = 'CHG2026' . str_pad(random_int(10000, 99999), 5, '0', STR_PAD_LEFT);
        }

        $registration = Registration::create([
            'registration_number' => $registrationNumber,
            'student_id' => $student->id,
            'photo' => $photoPath,
            'status' => 'pending',
        ]);

        $registration->courses()->attach($request->course_ids);

        $payment = Payment::create([
            'registration_id' => $registration->id,
            'student_id' => $student->id,
            'amount' => $request->amount_paid,
            'payment_method' => $request->payment_method,
            'receipt' => $receiptPath,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Registration submitted successfully',
            'data' => [
                'registration' => $registration->load('courses'),
                'payment' => $payment,
            ],
        ], 201);
    }

    public function show($id)
    {
        $registration = Registration::with(['courses', 'payments', 'student'])
            ->find($id);

        if (!$registration) {
            return response()->json(['message' => 'Registration not found'], 404);
        }

        $user = request()->user();

        if ($user instanceof \App\Models\Student && $registration->student_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json(['data' => $registration]);
    }
}
