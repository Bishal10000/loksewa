<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\SyllabusController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('admin.token');

Route::get('/syllabus', [SyllabusController::class, 'index']);
Route::get('/syllabus/{id}', [SyllabusController::class, 'show']);
Route::post('/syllabus', [SyllabusController::class, 'store'])->middleware('admin.token');
Route::put('/syllabus/{id}', [SyllabusController::class, 'update'])->middleware('admin.token');
Route::delete('/syllabus/{id}', [SyllabusController::class, 'destroy'])->middleware('admin.token');

Route::get('/notes', [NoteController::class, 'index']);
Route::get('/notes/{id}', [NoteController::class, 'show']);
Route::post('/notes', [NoteController::class, 'store'])->middleware('admin.token');
Route::put('/notes/{id}', [NoteController::class, 'update'])->middleware('admin.token');
Route::delete('/notes/{id}', [NoteController::class, 'destroy'])->middleware('admin.token');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('admin.token');
