<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dieta;
use App\Models\Alimento;
use App\Models\DietaAlimento;
use App\Models\DietaUser;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;



class DietaController extends Controller
{


    function listarById(Request $request){


        $dieta = Dieta::find($request->id);

        return  response()->json(array(
            'dietas'=> $dieta
        ), 200);

    }

    function listarAlimentosByIdDieta(Request $request){


          $result = Alimento::where('dietas.id', '=', $request->id)
          ->leftJoin('dieta_alimentos', 'dieta_alimentos.alimento_id', '=', 'alimentos.id')
          ->leftJoin('dietas', 'dietas.id', '=', 'dieta_alimentos.dieta_id')
          ->select("alimentos.*")
          ->get();

         /* $result = DB::table('alimentos')
          ->leftJoin('dieta_alimentos', 'dieta_alimentos.alimento_id', '=', 'alimentos.id')
          ->leftJoin('dietas', 'dietas.id', '=', 'dieta_alimentos.dieta_id')
          ->select("alimentos.*")
          ->get();*/

        return  response()->json(array(
            'alimentos'=> $result
        ), 200);

    }

    function listarDietaByIdUser(Request $request){

        Log::info("listarDietaByIdUser:".$request->id);


        $result = Dieta::leftJoin('dieta_users', function($join) {
          $join->on('dietas.id', '=', 'dieta_users.dieta_id');
        })
        ->where('dieta_users.user_id', '=', $request->id)
        ->select("dietas.*")
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


        Log::info("lista_alimentos-init");
        $lista=$request ->lista_alimentos;
        Log::info("lista_alimentos-size:".count($lista));

        for($i=0; $i< count($lista);$i++){

            $alimento_id=$lista[$i]['id'];

            Log::info("lista_alimentos-1");
            $dietaAlimentos=new DietaAlimento;
            Log::info("lista_alimentos-2");
            $dietaAlimentos->dieta_id=$result1->id;
            Log::info("lista_alimentos-3:".$dietaAlimentos->dieta_id);
            $dietaAlimentos->alimento_id = $alimento_id;
            Log::info("lista_alimentos-4:".$dietaAlimentos->alimento_id);
            $resultDietaAlim=$dietaAlimentos->Save();
            Log::info("lista_alimentos-5");

            Log::info("lista_alimentos-id:".$lista[$i]['id']);
            Log::info("dieta-id:".$result1->id);

        }

        Log::info("lista_alimentos-fim");

        $dietauser=new DietaUser;
        $dietauser->dieta_id=$result1->id;
        $dietauser->user_id=$request->user_id;

        Log::info("gravar-dieta-id: ".$dietauser->dieta_id);
        Log::info("gravar-user-id: ".$dietauser->user_id);

        $result2=$dietauser->Save();
        if($result2){
            Log::info("gravar-dieta-user:sucess");
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
        $dietauser->dieta_id=$request->dieta_id;
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


        //deletando relacionamento de alimentos/dietas
        $deletarDietaAlimentos = DietaAlimento::where('dieta_id', $request->id)->delete();
        Log::info("lista_alimentos-deletarDietaAlimentos: ". $deletarDietaAlimentos);

        $dieta=Dieta::find($request->id);
        $dieta->nome=$request->nome;
        $dieta->periodo=$request->periodo;
        $dieta->data=$request->data;
        $dieta->hora=$request->hora;
        $result1=$dieta->save();

        Log::info("lista_alimentos-init");
        $lista=$request->lista_alimentos;
        Log::info("lista_alimentos-size:".count($lista));

        for($i=0; $i< count($lista);$i++){

            $alimento_id=$lista[$i]['id'];

            Log::info("lista_alimentos-1");
            $dietaAlimentos=new DietaAlimento;
            Log::info("lista_alimentos-2");
            $dietaAlimentos->dieta_id=$request->id;
            Log::info("lista_alimentos-3:".$dietaAlimentos->dieta_id);
            $dietaAlimentos->alimento_id = $alimento_id;
            Log::info("lista_alimentos-4:".$dietaAlimentos->alimento_id);
            $resultDietaAlim=$dietaAlimentos->Save();
            Log::info("lista_alimentos-5");

            Log::info("lista_alimentos-id:".$lista[$i]['id']);
            Log::info("dieta-id:".$request->id);

        }


        if($result1){
            return  response()->json(array(
                'message'=>'salvo com sucesso!'
            ), 200);

        }else{
            return response()->json([
                'erro'=>'erro ao salvar!'
            ], 400);
        }
    }


    function associarDietaUsuario(Request $request){


        $id_dieta =($request->id_dieta);
        $id_usuario =($request->id_usuario);

        $dietauser=new DietaUser;
        $dietauser->dieta_id=$id_dieta;
        $dietauser->user_id=$id_usuario;
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

    function desassociarDietaUsuario(Request $request){


        $id_dieta =($request->id_dieta);
        $id_usuario =($request->id_usuario);

        $deletarDietaUsuario = DietaUser::where([
            ['user_id', $id_usuario],
            ['dieta_id', $id_dieta],
        ])->delete();


        if($deletarDietaUsuario){
            return  response()->json(array(
                'message'=>'Realizado com sucesso!'
            ), 200);

        }else{
            return response()->json([
                'erro'=>'Erro ao salvar!'
            ], 400);
        }


    }

}

