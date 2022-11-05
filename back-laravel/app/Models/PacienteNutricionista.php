<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PacienteNutricionista extends Model
{
    use HasFactory;
    protected $fillable = ['paciente_id','nutricionista_id'];
}
