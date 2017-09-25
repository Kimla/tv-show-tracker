<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\UserShow;
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
        $user = $this->jwt->user();

        $userShows = $user->userShows()->get();

        $shows = [];

        foreach ($userShows as $key => $userShow) {
            $shows[] = Show::find($userShow['show_id']);
        }

        return $shows;
    }

    public function addUserShow(Request $request) {
        $show = Show::where('tvmaze_id', $request->input('tvmaze_id'))->first();
        $user = $this->jwt->user();

        if ( !$show ) {
            $show = Show::create([
                'title' => $request->input('title'),
                'image' => $request->input('image'),
                'genres' => $request->input('genres'),
                'tvmaze_id' => $request->input('tvmaze_id'),
            ]);
        }

        $userShow = UserShow::where([
            ['show_id', $show['id']],
            ['user_id', $user['id']]
        ])->first();

        if ( !$userShow ) {
            $userShow = UserShow::create([
                'show_id' => $show['id'],
                'user_id' => $user['id'],
            ]);
        }

        return $userShow;
    }

    public function removeUserShow(Request $request) {
        $tvmazeId = $request->query('tvmaze_id');
        $user = $this->jwt->user();

        $show = Show::where('tvmaze_id', $tvmazeId)->first();

        $result = UserShow::where([
            ['show_id', $show['id']],
            ['user_id', $user['id']]
        ])->forceDelete();

        return $result;
    }
}
