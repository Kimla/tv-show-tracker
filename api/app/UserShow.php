<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserShow extends Model
{
    protected $table = 'user_show';

    protected $fillable = [
        'user_id', 'show_id',
    ];

    public function show()
    {
        return $this->hasOne('App\Show');
    }
}
