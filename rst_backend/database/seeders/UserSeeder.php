<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         User::create([
            'name' => 'Vikash Choubey',
            'email' => 'vikash@gmail.com',
            'role' => 'Admin',
            'password' => Hash::make('12345678'),
        ]);

         User::create([
            'name' => 'Vivek Rajpoot',
            'email' => 'vivek@gmail.com',
            'role' => 'Admin',
            'password' => Hash::make('12345678'),
        ]);
    }
}
