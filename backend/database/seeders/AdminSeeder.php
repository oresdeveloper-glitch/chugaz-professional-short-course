<?php
namespace Database\Seeders;
use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class AdminSeeder extends Seeder {
    public function run(): void {
        Admin::create([
            'name' => 'System Administrator',
            'email' => 'admin@chugazstationery.com',
            'password' => Hash::make('admin123'),
            'role' => 'super_admin',
            'phone' => '+255629849802',
        ]);
    }
}
