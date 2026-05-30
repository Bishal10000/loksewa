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
        'file_path',
        'file_url',
        'pages',
    ];

    protected $casts = [
        'pages' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
