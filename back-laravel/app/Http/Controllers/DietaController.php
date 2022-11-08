<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dieta;
use App\Models\DietaUser;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class DietaController extends Controller
{


    function listarById(Request $request){


        $dieta = Dieta::find($request->id);

        return  response()->json(array(
            'dietas'=> $dieta
        ), 200);

    }


    function listarDietaByIdUser(Request $request){

        Log::info("listarDietaByIdUser:".$request->id);


        $result = Dieta::leftJoin('dieta_users', function($join) {
          $join->on('dietas.id', '=', 'dieta_users.dieta_id');
        })
        ->where('dieta_users.user_id', '=', $request->id)
        ->get();

        return  response()->json(array(
            'dietas'=> $result
        ), 200);

    }



    function listar(Request $request){

        $dieta = Dieta::all();

        return  response()->json(array(
            'dietas'=> $dieta
        ), 200);

    }


    function adicionar(Request $request){



        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'periodo' => 'required|string|max:255'//,
            //'data' => 'required|date',
           // 'hora' => 'required|date'
        ]);


        if ($validator->fails()) {
            $errors = $validator->errors();

            return response()->json([
                $errors
            ], 400);
        }

        $result1 = Dieta::create([
            'nome' => $request->nome,
            'periodo' => $request->periodo,
            'data' => $request->data,
            'hora' => $request->hora,
        ]);


        $dietauser=new DietaUser;
        $dietauser->dieta_id=$result1->id;
        $dietauser->user_id=$request->user_id;
        $result2=$dietauser->Save();

        if($result2){
            return  response()->json(array(
                'message'=>'salvo com sucesso!'
            ), 200);

        }else{

            return response()->json([
                'erro'=>'erro ao salvar!'
            ], 400);

        }

    }


    function adicionarDietaUser(Request $request, $id_dieta){



        $validator = Validator::make($request->all(), [
            'dieta_id' => 'required|numeric',
            'user_id' => 'required|numeric',

        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();

            return response()->json([
                $errors
            ], 400);
        }

        $dietauser=new DietaUser;
        $dietauser->dieta_id=$request->nome;
        $dietauser->user_id=$request->user_id;
        $result=$dietauser->Save();

        if($result){
            return  response()->json(array(
                'message'=>'salvo com sucesso!'
            ), 200);

        }else{

            return response()->json([
                'erro'=>'erro ao salvar!'
            ], 400);

        }

    }


    function alterar(Request $request){


        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'periodo' => 'required|string|max:255',
            //'data' => 'required|date',
           // 'hora' => 'required|time'
        ]);


        if ($validator->fails()) {
            $errors = $validator->errors();

            return response()->json([
                $errors
            ], 400);
        }



        $dieta=Dieta::find($request->id);
        $dieta->nome=$request->nome;
        $dieta->periodo=$request->periodo;
        $dieta->data=$request->data;
        $dieta->hora=$request->hora;
        $result=$dieta->save();

        if($result){
            return  response()->json(array(
                'message'=>'salvo com sucesso!'
            ), 200);

        }else{
            return response()->json([
                'erro'=>'erro ao salvar!'
            ], 400);
        }
    }

}
