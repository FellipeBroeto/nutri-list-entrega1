<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class DietaAlimento extends Model
{
    use HasFactory;

    protected $fillable = ['dieta_id','alimento_id',];
}
