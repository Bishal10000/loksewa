<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudyNote extends Model
{
    protected $table = 'study_notes';

    protected $fillable = [
        'title',
        'description',
        'category',
        'exam_ids',
        'difficulty',
        'pages',
        'file_path',
        'file_url',
        'color',
        'chapters',
    ];

    protected $casts = [
        'difficulty' => 'integer',
        'pages' => 'integer',
        'chapters' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
