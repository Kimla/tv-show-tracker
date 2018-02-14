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

$router->post('/login', 'UserController@login');
$router->post('/register', 'UserController@register');

$router->get('/popularShows', 'ShowController@popularShows');

$router->group(['middleware' => 'auth'], function () use ($router) {
    $router->get('/userShows', 'UserController@shows');
    $router->post('/userShows', 'UserController@addUserShow');
    $router->delete('/userShows', 'UserController@removeUserShow');
});
