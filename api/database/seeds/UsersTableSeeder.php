<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class)->create([
            'email' => 'test@test.se',
            'password' => app('hash')->make('1234')
        ]);

        factory(App\User::class)->create([
            'email' => 'kim@kim.se',
            'password' => app('hash')->make('1234')
        ]);

        factory(App\User::class)->create([
            'email' => 'kimla89@gmail.com',
            'password' => app('hash')->make('1234')
        ]);
    }
}
