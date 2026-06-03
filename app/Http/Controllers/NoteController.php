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
            'title' => 'nullable|string',
            'description' => 'required|string',
            'category' => 'required|string',
            'exam_slugs' => 'nullable|string',
            'difficulty' => 'nullable|string',
            'chapters' => 'nullable',
            'file' => 'required|file|mimes:pdf|max:10240',
            'color' => 'nullable|string',
        ]);

        $examIds = 'all';
        $examSlugsInput = $request->input('exam_slugs', 'all');

        if (is_array($examSlugsInput)) {
            $examIds = implode(',', $examSlugsInput);
        } elseif (is_string($examSlugsInput) && $examSlugsInput !== '') {
            $decodedExamSlugs = json_decode($examSlugsInput, true);
            if (is_array($decodedExamSlugs)) {
                $examIds = implode(',', $decodedExamSlugs);
            } else {
                $examIds = $examSlugsInput;
            }
        }

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
            $filePath = $request->file('file')->store('notes', 'public');
        } else {
            return response()->json([
                'message' => 'File upload failed',
            ], 400);
        }

        // Parse difficulty
        $difficulty = 1;
        if (isset($validated['difficulty'])) {
            $difficultyMap = ['easy' => 1, 'medium' => 2, 'hard' => 3];
            $difficulty = $difficultyMap[$validated['difficulty']] ?? 1;
        }

        // Create note with title from description (first 100 chars)
        $note = StudyNote::create([
            'title' => $validated['title'] ?? substr($validated['description'], 0, 100),
            'description' => $validated['description'],
            'category' => $validated['category'],
            'exam_ids' => $examIds,
            'difficulty' => $difficulty,
            'chapters' => $chapters,
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
            'chapters' => 'nullable',
            'file_url' => 'nullable|url',
            'color' => 'nullable|string',
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
