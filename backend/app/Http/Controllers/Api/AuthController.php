<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:students',
            'phone' => 'required|string|max:20',
            'password' => 'required|string|min:8|confirmed',
            'gender' => 'nullable|string|in:male,female,other',
            'date_of_birth' => 'nullable|date',
            'nationality' => 'nullable|string|max:100',
            'occupation' => 'nullable|string|max:255',
            'education_level' => 'nullable|string|max:100',
            'region' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'street' => 'nullable|string|max:255',
            'postal_address' => 'nullable|string|max:255',
            'training_mode' => 'nullable|string|in:online,onsite,hybrid',
            'preferred_time' => 'nullable|string|max:100',
            'courses' => 'nullable|array',
            'payment_method' => 'nullable|string',
            'transaction_id' => 'nullable|string',
            'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048|dimensions:width=150,height=150',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('photos', 'public');
        }

        $registrationNumber = 'CHG2026' . str_pad(random_int(0, 99999), 5, '0', STR_PAD_LEFT);

        while (Student::where('registration_number', $registrationNumber)->exists()) {
            $registrationNumber = 'CHG2026' . str_pad(random_int(0, 99999), 5, '0', STR_PAD_LEFT);
        }

        $student = Student::create([
            'registration_number' => $registrationNumber,
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'gender' => $request->gender,
            'date_of_birth' => $request->date_of_birth,
            'nationality' => $request->nationality,
            'occupation' => $request->occupation,
            'education_level' => $request->education_level,
            'region' => $request->region,
            'district' => $request->district,
            'street' => $request->street,
            'postal_address' => $request->postalAddress,
            'training_mode' => $request->training_mode,
            'preferred_time' => $request->preferred_time,
            'photo' => $photoPath,
            'status' => 'pending',
        ]);

        $token = $student->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'data' => [
                'student' => $student,
                'token' => $token,
            ],
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $student = Student::where('email', $request->email)->first();
        if ($student && Hash::check($request->password, $student->password)) {
            $token = $student->createToken('auth_token')->plainTextToken;
            return response()->json([
                'message' => 'Login successful',
                'data' => [
                    'type' => 'student',
                    'student' => $student,
                    'token' => $token,
                ],
            ]);
        }

        $admin = Admin::where('email', $request->email)->first();
        if ($admin && Hash::check($request->password, $admin->password)) {
            $token = $admin->createToken('auth_token')->plainTextToken;
            return response()->json([
                'message' => 'Login successful',
                'data' => [
                    'type' => 'admin',
                    'admin' => $admin,
                    'token' => $token,
                ],
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function me(Request $request)
    {
        $user = $request->user();

        if ($user instanceof Student) {
            return response()->json([
                'data' => [
                    'type' => 'student',
                    'student' => $user,
                ],
            ]);
        }

        if ($user instanceof Admin) {
            return response()->json([
                'data' => [
                    'type' => 'admin',
                    'admin' => $user,
                ],
            ]);
        }

        return response()->json(['data' => $user]);
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|exists:students,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Basic implementation - in production, send password reset email
        return response()->json([
            'message' => 'Password reset link sent to your email',
        ]);
    }
}
