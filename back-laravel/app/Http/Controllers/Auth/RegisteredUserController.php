<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use App\Models\Nutricionista;
use App\Models\Paciente;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;


class RegisteredUserController extends Controller
{


    public function registro(Request $request){


        Log::info("->>Chegou:".$request->email);

        //validar email duplicado - TODO
        /*$findEmail = User::where('email','like','%'.$request->email.'%') -> first();

        Log::info("->>Chegou2:".$findEmail);
        if($findEmail){
            return response()->json([
                'erro'=>'email ja existente!'
            ], 400);

        }*/

        /*$c = Customer::leftJoin('orders', function($join) {
            $join->on('customers.id', '=', 'orders.customer_id');
          })
          ->whereNull('orders.customer_id')
          ->first([
              'customers.id',
              'customers.first_name',
              'customers.last_name',
              'customers.email',
              'customers.phone',
              'customers.address1',
              'customers.address2',
              'customers.city',
              'customers.state',
              'customers.county',
              'customers.district',
              'customers.postal_code',
              'customers.country'
          ]);*/


            //  validando usuario
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'id_tipo_user' => 'required',
                'email' => 'required|email|unique:users|max:255',
                'password' => 'required|min:8',
            ]);




            if ($validator->fails()) {
                $errors = $validator->errors();

                return response()->json([
                    $errors
                ], 400);
            }


            Log::info("valida1.2:");


            //valida nutri ou paciente
            if($request->id_tipo_user===1){//nutri

                $validator = Validator::make($request->all(), [
                    'crn' => 'required|numeric',
                ]);

                if ($validator->fails()) {
                    return false;
                }


            }else{//paciente
                $validator = Validator::make($request->all(), [
                    'nascimento' => 'required|string|max:255',
                    /*'peso' => 'required|float',
                    'altura' => 'required|float',*/
                    'sexo' => 'required|string|max:255'
                ]);


                if ($validator->fails()) {
                    return false;
                }

            }

            Log::info("valida2");


            if ($validator->fails()) {
                $errors = $validator->errors();

                return response()->json([
                    $errors
                ], 400);
            }


            Log::info("valida3");

            $user = User::create([
                'name' => $request->name,
                'id_tipo_user' => $request->id_tipo_user,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);


            Log::info("valida4");

            event(new Registered($user));
            Auth::login($user);
            $token = $user->createToken('auth_token')->plainTextToken;


            Log::info("valida5");

           /* Log::info("------");
            var_dump($user);
            Log::info("------");*/

            $user_id = $user->id;
            Log::info("user:".$user_id);


            Log::info("valida6");
            //validar nutricionista ou paciente
            if($request->id_tipo_user==1){
                 Log::info("valida7");
                RegisteredUserController::adicionarNutricionista($request,  $user_id);
            //paciente
            }else{
                Log::info("valida8");
                RegisteredUserController::adicionarPaciente($request,  $user_id);
            }


            return  response()->json(array(
                'message'=>'success',
                'user'=> $request->user(),
                'access_token' => $token,
                'token_type' => 'Bearer',
            ), 200);


    }

    function adicionarNutricionista(Request $request, $user_id){

        Log::info("adicionarNutricionista7");

        $nutricionista=new Nutricionista;
        $nutricionista->crn=$request->crn;
        $nutricionista->user_id = $user_id;
        $result=$nutricionista->Save();


        Log::info("adicionarNutricionista8");
        if($result){
            return true;

        }else{
            return false;
        }


    }
    function adicionarPaciente(Request $request, $user_id){



        Log::info("adicionarPaciente9");
        $paciente=new Paciente;
        $paciente->user_id = $user_id;
        $paciente->nascimento=$request->nascimento;
        $paciente->peso=$request->peso;
        $paciente->altura=$request->altura;
        $paciente->sexo=$request->sexo;
        $result= $paciente->Save();

        Log::info("adicionarPaciente10");
        if($result){
            return true;
        }else{
            return false;
        }

    }


     /**
     * Display the registration view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);


        return redirect(RouteServiceProvider::HOME);
    }

}
