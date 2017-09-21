<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Show extends Model
{
    protected $table = 'shows';

    protected $fillable = [
        'title', 'image', 'genres', 'tvmaze_id'
    ];
}
