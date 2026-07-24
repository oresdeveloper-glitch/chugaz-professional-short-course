<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = Payment::with(['student', 'registration.courses']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('payment_method')) {
            $query->where('payment_method', $request->payment_method);
        }

        if ($request->has('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->whereHas('student', function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('registration_number', 'like', "%{$search}%");
            });
        }

        $payments = $query->orderBy('created_at', 'desc')
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

    public function update(Request $request, $id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:pending,approved,rejected,refunded',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $payment->update($validator->validated());

        if ($payment->student) {
            $payment->student->update([
                'payment_status' => $payment->status === 'approved' ? 'paid' : $payment->status,
            ]);
        }

        return response()->json([
            'message' => 'Payment updated successfully',
            'data' => $payment->load(['student', 'registration.courses']),
        ]);
    }

    public function exportExcel(Request $request)
    {
        $query = Payment::with('student');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $payments = $query->orderBy('created_at', 'desc')->get();

        $data = $payments->map(function ($payment) {
            return [
                'Receipt No' => $payment->id,
                'Student Name' => $payment->student ? $payment->student->first_name . ' ' . $payment->student->last_name : 'N/A',
                'Registration Number' => $payment->student ? $payment->student->registration_number : 'N/A',
                'Amount' => $payment->amount,
                'Payment Method' => $payment->payment_method,
                'Status' => $payment->status,
                'Date' => $payment->created_at->format('Y-m-d H:i:s'),
            ];
        })->toArray();

        return Excel::download(
            new class($data) implements \Maatwebsite\Excel\Concerns\FromArray, \Maatwebsite\Excel\Concerns\WithHeadings {
                private $data;
                public function __construct(array $data) { $this->data = $data; }
                public function array(): array { return $this->data; }
                public function headings(): array {
                    return ['Receipt No', 'Student Name', 'Registration Number', 'Amount', 'Payment Method', 'Status', 'Date'];
                }
            },
            'payments.xlsx'
        );
    }
}
