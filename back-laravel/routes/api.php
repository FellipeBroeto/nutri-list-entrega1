<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlimentoController;
use App\Http\Controllers\NutricionistaController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\DietaController;
use App\Http\Controllers\DietaAlimentoController;
use App\Http\Controllers\PacienteNutricionistaController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/usuario', function (Request $request) {
    return $request->user();
});

Route::post('registro', [RegisteredUserController::class, 'registro']);
Route::post('login', [AuthenticatedSessionController::class, 'logar']);
Route::post('logar', [AuthenticatedSessionController::class, 'logar']);
Route::post('deslogar', [AuthenticatedSessionController::class, 'deslogar']);


Route::middleware('auth:sanctum')->group(function () {


    #usuario logado
    Route::get('/usuario-logado', [AuthenticatedSessionController::class, 'usuario_logado']);

    #alimentos
    Route::get('/alimentos/listar', [AlimentoController::class, 'listar']);
    Route::post('/alimentos', [AlimentoController::class, 'adicionar']);
    Route::post('/alimentos/{id}', [AlimentoController::class, 'alterar']);


    #dietas
    Route::get('/dietas/listar/{id}', [DietaController::class, 'listarById']);
    Route::get('/dietas/listar', [DietaController::class, 'listar']);
    Route::post('/dietas', [DietaController::class, 'adicionar']);
    Route::post('/dietas/{id}', [DietaController::class, 'alterar']);

    ### Pacientes
    Route::get('/pacientes/listar', [PacienteController::class, 'listar']);
    Route::post('/pacientes', [PacienteController::class, 'adicionar']);
    Route::post('/pacientes/{id}', [PacienteController::class, 'alterar']);

    ### Nutricionistas
    Route::get('/nutricionistas/listar', [NutricionistaController::class, 'listar']);
    Route::post('/nutricionistas', [NutricionistaController::class, 'adicionar']);
    Route::post('/nutricionistas/{id}', [NutricionistaController::class, 'alterar']);

    ###   DietaAlimento
    Route::get('/dietaAlimento/listar', [DietaAlimentoController::class, 'listar']);
    Route::post('/dietaAlimento', [DietaAlimentoController::class, 'adicionar']);
    Route::post('/dietaAlimento/{id}', [DietaAlimentoController::class, 'alterar']);

    ###   PacienteNutricionista
    Route::get('/PacienteNutricionista/listar', [PacienteNutricionistaController::class, 'listar']);
    Route::post('/PacienteNutricionista', [PacienteNutricionistaController::class, 'adicionar']);
    Route::post('/PacienteNutricionista/{id}', [PacienteNutricionistaController::class, 'alterar']);

});


