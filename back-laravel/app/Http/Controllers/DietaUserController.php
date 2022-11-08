<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DietaUser;
use App\Models\User;
use Illuminate\Support\Facades\Validator;


class DietaUserController extends Controller
{


    function listarUsers(Request $request){

        $users = User::all();

        return  response()->json(array(
            'users'=> $users
        ), 200);

    }

    function listar(Request $request){

        $dietauser = DietaUser::all();

        return  response()->json(array(
            'dietausers'=> $dietauser
        ), 200);

    }


    function adicionar(Request $request){



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
            'dieta_id' => 'required|numeric',
            'user_id' => 'required|numeric',

        ]);




        if ($validator->fails()) {
            $errors = $validator->errors();

            return response()->json([
                $errors
            ], 400);
        }


        $dietauser=DietaUser::find($request->id);
        $dietauser->dieta_id=$request->dieta_id;
        $dietauser->user_id =$request->user_id;
        $result=$dietauser->save();

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
