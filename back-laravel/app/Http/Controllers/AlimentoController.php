<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Alimento;
use Illuminate\Support\Facades\Validator;


class AlimentoController extends Controller
{

    function listarAlimentoByIdDieta(Request $request){

        $result = Alimento::leftJoin('dieta_alimentos', function($join) {
          $join->on('alimentos.id', '=', 'dieta_alimentos.alimento_id');
        })
        ->where('dieta_alimentos.dieta_id', '=', $request->id)
        ->get();

        return  response()->json(array(
            'dietas'=> $result
        ), 200);

    }


    function listarById(Request $request){

        $alimento = Alimento::find($request->id);

        return  response()->json(array(
            'alimentos'=> $alimento
        ), 200);

    }

    function listar(Request $request){

        $alimento = Alimento::all();

        return  response()->json(array(
            'alimentos'=> $alimento
        ), 200);

    }


    function adicionar(Request $request){



        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'peso' => 'required|numeric',
            'calorias' => 'required|numeric',
            'porcao' => 'required|string|max:255'
        ]);


        if ($validator->fails()) {
            $errors = $validator->errors();

            return response()->json([
                $errors
            ], 400);
        }

        $alimento=new Alimento;
        $alimento->nome=$request->nome;
        $alimento->calorias=$request->calorias;
        $alimento->peso=$request->peso;
        $alimento->porcao=$request->porcao;
        $result=$alimento->Save();

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
            'peso' => 'required|numeric',
            'calorias' => 'required|numeric',
            'porcao' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();

            return response()->json([
                $errors
            ], 400);
        }


        $alimento=Alimento::find($request->id);
        $alimento->nome=$request->nome;
        $alimento->calorias=$request->calorias;
        $alimento->peso=$request->peso;
        $alimento->porcao=$request->porcao;
        $result=$alimento->save();

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
