<?php

namespace App\Http\Controllers;

use App\Models\Syllabus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SyllabusController extends Controller
{
    public function index()
    {
        return response()->json(Syllabus::all(), 200);
    }

    public function show($id)
    {
        $syllabus = Syllabus::find($id);

        if (! $syllabus) {
            return response()->json([
                'message' => 'Syllabus not found',
            ], 404);
        }

        return response()->json($syllabus, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'exam_slug' => 'required|string',
            'exam_name' => 'required|string',
            'paper' => 'required|integer',
            'paper_name' => 'required|string',
            'chapters' => 'nullable',
            'file' => 'required|file|mimes:pdf|max:10240',
        ]);

        $chapters = [];
        $chaptersInput = $request->input('chapters', []);

        if (is_array($chaptersInput)) {
            $chapters = $chaptersInput;
        } elseif (is_string($chaptersInput) && $chaptersInput !== '') {
            $decodedChapters = json_decode($chaptersInput, true);
            if (is_array($decodedChapters)) {
                $chapters = $decodedChapters;
            }
        }

        // Store the file
        $filePath = null;
        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            $filePath = $request->file('file')->store('syllabus', 'public');
        } else {
            return response()->json([
                'message' => 'File upload failed',
            ], 400);
        }

        // Create syllabus
        $syllabus = Syllabus::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'exam_id' => $validated['exam_slug'],
            'exam_name' => $validated['exam_name'],
            'paper' => $validated['paper'],
            'paper_name' => $validated['paper_name'],
            'chapters' => $chapters,
            'file_path' => $filePath,
            'file_url' => Storage::url($filePath),
        ]);

        return response()->json($syllabus, 201);
    }

    public function update(Request $request, $id)
    {
        $syllabus = Syllabus::find($id);

        if (! $syllabus) {
            return response()->json([
                'message' => 'Syllabus not found',
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'string',
            'description' => 'nullable|string',
            'exam_id' => 'string',
            'exam_name' => 'string',
            'paper' => 'nullable|integer',
            'paper_name' => 'nullable|string',
            'chapters' => 'nullable',
            'file' => 'nullable|file|mimes:pdf|max:10240',
        ]);

        if ($request->has('chapters')) {
            $chapters = $request->input('chapters');
            if (is_string($chapters)) {
                $decodedChapters = json_decode($chapters, true);
                $validated['chapters'] = is_array($decodedChapters) ? $decodedChapters : [];
            } elseif (is_array($chapters)) {
                $validated['chapters'] = $chapters;
            }
        }

        // If a new file is provided, store it and delete the old one
        if ($request->hasFile('file')) {
            if ($request->file('file')->isValid()) {
                // Delete old file
                if ($syllabus->file_path && Storage::disk('public')->exists($syllabus->file_path)) {
                    Storage::disk('public')->delete($syllabus->file_path);
                }

                // Store new file
                $filePath = $request->file('file')->store('syllabus', 'public');
                $validated['file_path'] = $filePath;
                $validated['file_url'] = Storage::url($filePath);
            } else {
                return response()->json([
                    'message' => 'File upload failed',
                ], 400);
            }
        }

        // Remove file from validated array if not set
        if (isset($validated['file'])) {
            unset($validated['file']);
        }

        $syllabus->update($validated);

        return response()->json($syllabus, 200);
    }

    public function destroy($id)
    {
        $syllabus = Syllabus::find($id);

        if (! $syllabus) {
            return response()->json([
                'message' => 'Syllabus not found',
            ], 404);
        }

        // Delete the file if it exists
        if ($syllabus->file_path && Storage::disk('public')->exists($syllabus->file_path)) {
            Storage::disk('public')->delete($syllabus->file_path);
        }

        $syllabus->delete();

        return response()->json([
            'message' => 'Syllabus deleted successfully',
        ], 200);
    }
}
