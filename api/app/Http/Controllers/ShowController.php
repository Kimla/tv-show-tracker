<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserShow;
use App\Show;
use DB;

class ShowController extends Controller
{
    public function popularShows() {
        $results = UserShow::groupBy('show_id')
            ->orderBy('count', 'desc')
            ->get(['show_id', DB::raw('count(show_id) as count')])
            ->take(8);

        $shows = [];

        foreach ($results as $key => $result) {
            $shows[] = Show::find($result['show_id']);
        }

        return $shows;
    }

}
