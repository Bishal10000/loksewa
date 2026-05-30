<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('study_notes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('category');
            $table->string('exam_ids')->default('all');
            $table->integer('difficulty')->default(1);
            $table->integer('pages')->default(0);
            $table->string('file_path')->nullable();
            $table->string('file_url')->nullable();
            $table->string('color')->default('#DC143C');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('study_notes');
    }
};
