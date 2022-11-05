<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PacienteNutricionista;
use Illuminate\Support\Facades\Validator;


class PacienteNutricionistaController extends Controller
{

    //public function index() {
        //$alimento = Alimento::all();
        //return view('index');

        //$alimento = Alimento::orderBy('id','desc')->paginate(5);
        //return view('index', compact('alimentos'));

       // public function getAllAlimentos() {
           // $alimentos = Alimento::get()->toJson(JSON_PRETTY_PRINT);
           // return response($alimentos, 200);
        //}


    function listar(Request $request){

        $pacientenutricionista = PacienteNutricionista::all();

        return  response()->json(array(
            'pacientenutricionistas'=> $pacientenutricionista
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

        $pacientenutricionista=new PacienteNutricionista;
        $pacientenutricionista->crn=$request->crn;
        $result=$pacientenutricionista->Save();

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


        $pacientenutricionista=new PacienteNutricionista;
        $pacientenutricionista->crn=$request->crn;
        $result=$alimento->Save();;

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
