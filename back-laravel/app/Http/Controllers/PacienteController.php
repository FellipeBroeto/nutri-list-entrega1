<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Paciente;
use Illuminate\Support\Facades\Validator;


class PacienteController extends Controller
{

    function listar(Request $request){

        $paciente = Paciente::all();

        return  response()->json(array(
            'pacientes'=> $paciente
        ), 200);

    }


    function adicionar(Request $request){



        $validator = Validator::make($request->all(), [
            'user_id' => 'required|string|max:255',
            'nascimento' => 'required|string|max:255',
            /*'peso' => 'required|float',
            'altura' => 'required|float',*/
            'sexo' => 'required|string|max:255'
        ]);


        if ($validator->fails()) {
            $errors = $validator->errors();

            return response()->json([
                $errors
            ], 400);
        }

        $paciente=new Paciente;
        $paciente->user_id=$request->user_id;
        $paciente->nascimento=$request->nascimento;
        $paciente->peso=$request->peso;
        $paciente->altura=$request->altura;
        $paciente->sexo=$request->sexo;
        $result= $paciente->Save();

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
            'user_id' => 'required|string|max:255',
            'nascimento' => 'required|string|max:255',
            'peso' => 'required|float',
            'altura' => 'required|float',
            'sexo' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();

            return response()->json([
                $errors
            ], 400);
        }


        $paciente=new Paciente;
        $paciente->user_id=$request->user_id;
        $paciente->nascimento=$request->nascimento;
        $paciente->peso=$request->peso;
        $paciente->altura=$request->altura;
        $paciente->sexo=$request->sexo;
        $result= $paciente->Save();

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
