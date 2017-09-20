<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserShow extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_show';

    public function show()
    {
        return $this->hasOne('App\Show');
    }
}
