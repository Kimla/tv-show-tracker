<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Show;
use Illuminate\Support\Facades\Hash;
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

        $user = User::create([
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ]);

        $res['success'] = true;
        $res['message'] = 'Success register!';
        $res['token'] = $this->jwt->fromUser($user);
        $res['data'] = $user;
        return response($res);
    }

    public function shows(Request $request) {
        $userId = $request->query('user_id');
        $user = User::find($userId);

        $userShows = $user->userShows()->get();

        $shows = [];

        foreach ($userShows as $key => $userShow) {
            $shows[] = Show::find($userShow['show_id']);
        }

        return $shows;
    }

}
