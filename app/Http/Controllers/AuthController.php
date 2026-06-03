<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => 'required|email',
                'password' => 'required|min:6',
            ]);

            $user = User::where('email', $validated['email'])->first();

            if (! $user || ! Hash::check($validated['password'], $user->password)) {
                return response()->json([
                    'message' => 'Invalid credentials',
                ], 401);
            }

            if ($user->role !== 'admin') {
                return response()->json([
                    'message' => 'Unauthorized. Admin access required.',
                ], 403);
            }

            $token = Str::random(64);

            $user->forceFill([
                'api_token' => $token,
            ])->save();

            return response()->json([
                'user' => $user,
                'token' => $token,
            ], 200);
        } catch (\Throwable $e) {
            logger()->error($e->getMessage() . "\n" . $e->getTraceAsString());

            $message = config('app.debug') ? $e->getMessage() : 'Server error';

            return response()->json([
                'message' => $message,
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        if ($user !== null) {
            $user->forceFill([
                'api_token' => null,
            ])->save();
        }

        return response()->json([
            'message' => 'Logged out successfully',
        ], 200);
    }
}
