<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate([
            'email' => 'bishalaryal975@gmail.com',
        ], [
            'name' => 'Bishal Aryal',
            'password' => 'Bishal@10',
            'role' => 'admin',
        ]);
    }
}
