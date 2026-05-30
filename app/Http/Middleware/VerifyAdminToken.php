<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyAdminToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if ($token === null || $token === '') {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $user = User::query()
            ->where('api_token', $token)
            ->where('role', 'admin')
            ->first();

        if ($user === null) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $request->setUserResolver(static fn () => $user);

        return $next($request);
    }
}
