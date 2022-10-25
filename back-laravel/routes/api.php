<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlimentoController;
use App\Http\Controllers\DietaController;
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
    Route::get('/dietas/listar', [DietaController::class, 'listar']);
    Route::post('/dietas', [DietaController::class, 'adicionar']);
    Route::post('/dietas/{id}', [DietaController::class, 'alterar']);



});


