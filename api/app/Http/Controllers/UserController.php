<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Tymon\JWTAuth\JWTAuth;

class UserController extends Controller
{

    protected $jwt;

    public function __construct(JWTAuth $jwt)
    {
        $this->jwt = $jwt;
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);

        $hasher = app()->make('hash');
        $email = $request->input('email');
        $password = $hasher->make($request->input('password'));
        $user = User::create([
            'email' => $email,
            'password' => $password,
        ]);

        $res['success'] = true;
        $res['message'] = 'Success register!';
        $res['token'] = $this->jwt->fromUser($user);
        $res['data'] = $user;
        return response($res);
    }

}
