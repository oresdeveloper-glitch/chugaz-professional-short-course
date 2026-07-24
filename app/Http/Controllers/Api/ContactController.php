<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $contact = Contact::create($validator->validated());

        try {
            $adminEmail = config('mail.admin_address', 'admin@chugaz.com');
            \Illuminate\Support\Facades\Mail::raw(
                "New contact message from {$contact->name} ({$contact->email}):\n\n{$contact->message}",
                function ($mail) use ($contact, $adminEmail) {
                    $mail->to($adminEmail)
                         ->subject("Contact Form: {$contact->subject}");
                }
            );
        } catch (\Exception $e) {
            // Email sending failed, but message was saved
        }

        return response()->json([
            'message' => 'Your message has been sent successfully',
            'data' => $contact,
        ], 201);
    }
}
