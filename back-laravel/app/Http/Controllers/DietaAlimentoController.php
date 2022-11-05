<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DietaAlimento;
use Illuminate\Support\Facades\Validator;


class DietaAlimentoController extends Controller
{

    function listar(Request $request){

        $dietaalimento = DietaAlimento::all();

        return  response()->json(array(
            'dietaalimentos'=> $dietaalimento
        ), 200);

    }


    function adicionar(Request $request){



        $validator = Validator::make($request->all(), [
            'dieta_id' => 'required|numeric',
            'alimento_id' => 'required|numeric',

        ]);


        if ($validator->fails()) {
            $errors = $validator->errors();

            return response()->json([
                $errors
            ], 400);
        }

        $dietaalimento=new DietaAlimento;
        $dietaalimento->dieta_id=$request->nome;
        $dietaalimento->alimento_id=$request->alimento_id;
        $result=$dietaalimento->Save();

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
            'dieta_id' => 'required|numeric',
            'alimento_id' => 'required|numeric',

        ]);




        if ($validator->fails()) {
            $errors = $validator->errors();

            return response()->json([
                $errors
            ], 400);
        }


        $dietaalimento=DietaAlimento::find($request->id);
        $dietaalimento->dieta_id=$request->dieta_id;
        $dietaalimento->alimento_id =$request->alimento_id;
        $result=$dietaalimento->save();

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
