<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Nutricionista;
use App\Models\Paciente;
use Illuminate\Support\Facades\Log;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }



    public function usuario_logado(Request $request)
    {


        $user = $request->user();
        $resultUser = User::find( $user->id);
        //Log::info("resultUser:".$resultUser->id_tipo_user);

        if($resultUser->id_tipo_user=="2"){
            $find = Nutricionista::where('user_id','=',$user->id) -> first();

            return  response()->json(array(
                'message'=>'success',
                'user'=> $request->user(),
                'nutricionista'=> $find
            ), 200);


        }else{

            $find = Paciente::where('user_id','=',$user->id) -> first();

            return  response()->json(array(
                'message'=>'success',
                'user'=> $request->user(),
                'paciente'=> $find
            ), 200);

        }

    }


    public function logar(LoginRequest $request)
    {

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Login inválido ou inexistente!'
            ], 401);
        }


        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return  response()->json(array(
            'message'=>'success',
            'user'=> $request->user(),
            'access_token' => $token,
            'token_type' => 'Bearer',
        ), 200);


    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }


    public function deslogar(Request $request)
    {
        Auth::guard('web')->logout();

        //$request->session()->invalidate();
        //$request->session()->regenerateToken();

        return  response()->json(array(
            'message'=>'deslogado com sucesso!'
        ), 200);
    }
}
