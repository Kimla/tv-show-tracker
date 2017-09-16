<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

use Illuminate\Http\Request;

$router->get('/', function () use ($router) {
    $results = app('db')->select("SELECT * FROM users");
    return $results;
});

$router->post('/login', 'AuthController@login');
$router->post('/register', 'UserController@register');

$router->get('/test', ['middleware' => 'auth', function () use ($router) {
    return 'test';
}]);
