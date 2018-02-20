<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserShow;
use DB;

class ShowController extends Controller
{
    public function popularShows() {
        $results = UserShow::with('show')
            ->groupBy('show_id')
            ->orderBy('count', 'desc')
            ->get(['show_id', DB::raw('count(show_id) as count')])
            ->take(8);

        foreach ($results as $key => $result) {
            $shows[] = $result->show;
        }

        return $shows;
    }
}
