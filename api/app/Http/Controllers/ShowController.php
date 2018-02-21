<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserShow;
use App\Show;
use Carbon\Carbon;
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

    public function cacheShows() {
        $shows = [];

        for ($i=0; $i < 3; $i++) {
            $show = Show::orderBy('updated_at', 'desc')->first();

            if (!$show) {
                $page = 0;
            } else {
                $page = ceil($show->tvmaze_id / 250);
            }

            if ($page > 139) {
                $page = 0;
            }

            $results = json_decode(file_get_contents('https://api.tvmaze.com/shows?page='.$page));

            foreach ($results as $key => $result) {
                $show = Show::updateOrCreate(
                    [
                        'tvmaze_id' => $result->id,
                    ],
                    [
                        'title' => $result->name,
                        'image' => isset($result->image->medium) ? preg_replace("/^http:/i", "https:", $result->image->medium) : '',
                        'genres' => implode(', ', $result->genres),
                        'tvmaze_id' => $result->id,
                        'updated_at' => Carbon::now(),
                    ]
                );

                $show->touch();

                $shows[] = $show;
            }
        }

        return [
            'page' => $page,
            'count' => count($shows),
            'shows' => $shows,
        ];
    }

    public function scrapeTrailer($imdbId) {
        $html = file_get_contents('https://www.imdb.com/title/'.$imdbId.'/videogallery/content_type-trailer?sortDir=desc&sort=featured');
        $dom = new \DOMDocument();
        @$dom->loadHTML($html);

        $xPath = new \DOMXPath($dom);
        $elements = $xPath->query("//a[@class='video-modal']/@href");

        $node = false;

        foreach ($elements as $key => $element) {
            $node = $element;
        }

        if (!$node) {
            return 'error';
        }

        $array = explode('/', $node->value);
        $trailerId = array_pop($array);

        $iframeLink = 'https://www.imdb.com/video/imdb/'.$trailerId.'/imdb/embed?autoplay=true';
        return $iframeLink;
    }

    public function getTrailer($imdbId) {
        return $this->scrapeTrailer($imdbId);
    }
}
