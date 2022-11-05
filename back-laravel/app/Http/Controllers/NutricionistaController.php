<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Nutricionista;
use Illuminate\Support\Facades\Validator;


class NutricionistaController extends Controller
{



    function listar(Request $request){

        $nutricionista = Nutricionista::all();

        return  response()->json(array(
            'nutricionistas'=> $nutricionista
        ), 200);

    }


    function adicionar(Request $request){



        $validator = Validator::make($request->all(), [
            'crn' => 'required|numeric',

        ]);


        if ($validator->fails()) {
            $errors = $validator->errors();

            return response()->json([
                $errors
            ], 400);
        }

        $nutricionista=new Nutricionista;
        $nutricionista->crn=$request->crn;
        $nutricionista->user_id=$request->user_id;
        $result=$nutricionista->Save();

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
            'crn' => 'required|numeric',

        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();

            return response()->json([
                $errors
            ], 400);
        }


        $nutricionista=new Nutricionista;
        $nutricionista->crn=$request->crn;
        $nutricionista->user_id=$request->user_id;
        $result=$nutricionista->Save();;

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
