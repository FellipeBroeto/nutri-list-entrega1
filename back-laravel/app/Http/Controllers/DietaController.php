<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dieta;
use Illuminate\Support\Facades\Validator;


class DietaController extends Controller
{




    function listarById(Request $request){

        $dieta = Dieta::all();

        return  response()->json(array(
            'dietas'=> $dieta
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
            'periodo' => 'required|string|max:255',
            'data' => 'required|date',
            'hora' => 'required|date'
        ]);


        if ($validator->fails()) {
            $errors = $validator->errors();

            return response()->json([
                $errors
            ], 400);
        }

        $dieta=new Dieta;
        $dieta->nome=$request->nome;
        $dieta->periodo=$request->periodo;
        $dieta->data=$request->data;
        $dieta->hora=$request->hora;
        $result=$dieta->Save();

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
            'data' => 'required|date',
            'hora' => 'required|time'
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
