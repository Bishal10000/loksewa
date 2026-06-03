<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('study_notes', function (Blueprint $table): void {
            $table->json('chapters')->nullable()->after('pages');
        });

        Schema::table('syllabus', function (Blueprint $table): void {
            $table->unsignedInteger('paper')->default(1)->after('exam_name');
            $table->string('paper_name')->nullable()->after('paper');
            $table->json('chapters')->nullable()->after('file_url');
        });
    }

    public function down(): void
    {
        Schema::table('syllabus', function (Blueprint $table): void {
            $table->dropColumn(['paper', 'paper_name', 'chapters']);
        });

        Schema::table('study_notes', function (Blueprint $table): void {
            $table->dropColumn('chapters');
        });
    }
};
