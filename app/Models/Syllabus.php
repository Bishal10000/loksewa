<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Syllabus extends Model
{
    protected $table = 'syllabus';

    protected $fillable = [
        'title',
        'description',
        'exam_id',
        'exam_name',
        'paper',
        'paper_name',
        'file_path',
        'file_url',
        'pages',
        'chapters',
    ];

    protected $casts = [
        'paper' => 'integer',
        'pages' => 'integer',
        'chapters' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
