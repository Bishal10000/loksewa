<?php

namespace App\Http\Controllers;

use App\Models\StudyNote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NoteController extends Controller
{
    public function index()
    {
        return response()->json(StudyNote::all(), 200);
    }

    public function show($id)
    {
        $note = StudyNote::find($id);

        if (! $note) {
            return response()->json([
                'message' => 'Note not found',
            ], 404);
        }

        return response()->json($note, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string',
            'category' => 'required|string',
            'exam_slugs' => 'nullable|string',
            'difficulty' => 'nullable|string',
            'file' => 'required|file|mimes:pdf|max:10240',
            'color' => 'nullable|string',
        ]);

        // Store the file
        $filePath = null;
        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            $filePath = $request->file('file')->store('notes', 'public');
        } else {
            return response()->json([
                'message' => 'File upload failed',
            ], 400);
        }

        // Parse exam_slugs if provided
        $examIds = 'all';
        if (isset($validated['exam_slugs']) && ! empty($validated['exam_slugs'])) {
            try {
                $examIds = $validated['exam_slugs'];
            } catch (\Exception $e) {
                $examIds = 'all';
            }
        }

        // Parse difficulty
        $difficulty = 1;
        if (isset($validated['difficulty'])) {
            $difficultyMap = ['easy' => 1, 'medium' => 2, 'hard' => 3];
            $difficulty = $difficultyMap[$validated['difficulty']] ?? 1;
        }

        // Create note with title from description (first 100 chars)
        $note = StudyNote::create([
            'title' => substr($validated['description'], 0, 100),
            'description' => $validated['description'],
            'category' => $validated['category'],
            'exam_ids' => $examIds,
            'difficulty' => $difficulty,
            'file_path' => $filePath,
            'file_url' => Storage::url($filePath),
            'color' => $validated['color'] ?? '#DC143C',
        ]);

        return response()->json($note, 201);
    }

    public function update(Request $request, $id)
    {
        $note = StudyNote::find($id);

        if (! $note) {
            return response()->json([
                'message' => 'Note not found',
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'string',
            'description' => 'nullable|string',
            'category' => 'string',
            'exam_ids' => 'nullable|string',
            'difficulty' => 'nullable|integer|min:1|max:5',
            'pages' => 'nullable|integer',
            'file_url' => 'nullable|url',
            'color' => 'nullable|string',
        ]);

        $note->update($validated);

        return response()->json($note, 200);
    }

    public function destroy($id)
    {
        $note = StudyNote::find($id);

        if (! $note) {
            return response()->json([
                'message' => 'Note not found',
            ], 404);
        }

        // Delete the file if it exists
        if ($note->file_path && Storage::disk('public')->exists($note->file_path)) {
            Storage::disk('public')->delete($note->file_path);
        }

        $note->delete();

        return response()->json([
            'message' => 'Note deleted successfully',
        ], 200);
    }
}
