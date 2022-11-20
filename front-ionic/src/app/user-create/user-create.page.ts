import { Nutricionista } from 'src/app/models/nutricionista';
import { Paciente } from 'src/app/models/paciente';
import { Component, OnInit } from '@angular/core';
import { UserLoginCreate } from '../models/user-login-create';
import { ApiUserLoginsService } from './../../services/api-user-login.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
//import * as moment from "moment";


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.page.html',
  styleUrls: ['./user-create.page.scss'],
})
export class UserLoginCreatePage implements OnInit {

  public showErrMsg:boolean = false;
  public errMsg:string = '';
  public formCadastro: FormGroup;
  public data: any;

  

  public loading:any;
  public showPac: boolean = false;
  

  constructor(private formBuilder: FormBuilder, private loadingCtrl: LoadingController, public apiService: ApiUserLoginsService, public router: Router) { 
    this.data = new UserLoginCreate();
  }

  ngOnInit() {
    
    this.formCadastro = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'confirm_password': [null, [Validators.required]],      
      'user_id': [null, Validators.compose([Validators.required])],
      'crn': [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,10}$')])],
      'nascimento': [null, Validators.compose([Validators.required])],
      'peso': [null, Validators.compose([Validators.required])],
      'altura': [null, Validators.compose([Validators.required])],
      'sexo': [null, Validators.compose([Validators.required, Validators.pattern('^[M|F]{1,1}$')])],   

    });

 
    this.limparForm();
  }
   
  limparForm() { 
    this.formCadastro.controls.name.setValue(null);
    this.formCadastro.controls.password.setValue(null);
    
    this.data.name = "";
    this.data.password  = "";

    this.data.altura = null;
    this.data.peso = null;
    this.data.sexo = "";
    this.data.nascimento = null;
    this.data.crn = null;
 
    this.formCadastro.controls.crn.setValue(null);
    this.formCadastro.controls.altura.setValue(null);
    this.formCadastro.controls.peso.setValue(null);
    this.formCadastro.controls.sexo.setValue(null);
    this.formCadastro.controls.nascimento.setValue(null);

  }
  
  async showLoading() {
     this.loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circles',
    });
    this.loading.present();
  }
  
  register() {
    
    //validar usuario
    if( this.formCadastro.controls.name.errors || 
      this.formCadastro.controls.email.errors || 
      this.formCadastro.controls.password.errors || 
      this.formCadastro.controls.confirm_password.errors 
      ){
        return;
      }


    //validar nutricionista
    if(this.data.id_tipo_user === 1){
              //validate
      if(this.formCadastro.controls.crn.errors){
          return;
      }
      //setar dados nutricionista
      this.data.crn=this.formCadastro.controls.crn.value;       
      
      //validar paciente
    }else if(this.data.id_tipo_user === 2){
      if(this.formCadastro.controls.altura.errors || 
        this.formCadastro.controls.peso.errors || 
        this.formCadastro.controls.sexo.errors || 
        this.formCadastro.controls.nascimento.errors
      ){
          return;
      }
  
      //setar dados paciente
      this.data.altura=this.formCadastro.controls.altura.value;
      this.data.peso=this.formCadastro.controls.peso.value;
      this.data.sexo=this.formCadastro.controls.sexo.value;
      this.data.nascimento=this.formCadastro.controls.nascimento.value.substring(0,10);

    }

    

    //setar dados usuario
    this.data.name = this.formCadastro.controls.name.value;
    this.data.email = this.formCadastro.controls.email.value;
    this.data.password = this.formCadastro.controls.password.value;
    this.data.password_confirmation = this.formCadastro.controls.confirm_password.value;
    
    if(this.data.password != this.data.password_confirmation){
       //limpar msgs
       this.errMsg = "As senhas devem ser iguais.";
       this.showErrMsg = true;
       return;
    }
    
    this.showLoading();
    this.apiService.register(this.data).subscribe((response) => {
      
      //limpar e esconder msgs de erro
      this.errMsg = "";
      this.showErrMsg = false;
      
      //limpar form
      this.limparForm();

      //esconder loading
      this.loading.dismiss();


      //set  localstorage vars
      localStorage.setItem('data_token', response['access_token']);
      localStorage.setItem('id_tipo_user', response['user'].id_tipo_user);
      localStorage.setItem('user_id', response['user'].id);
   
        
      //rotear
      this.router.navigate(['dieta-listar']);
      
    }, error => {
      this.errMsg =`${JSON.stringify(error.msg.message)}`
      this.showErrMsg = true;

         //esconder loading
         this.loading.dismiss();
      
    });
  } 


  
  open(tipo_usuario:string) {
    
    //paciente = tipo_usuario = 2
    if(tipo_usuario=="paciente"){
      this.showPac = false;
      this.data.id_tipo_user = 2;
     
    }else{
      //nutricionista = tipo_usuario = 1
      this.showPac = true;
      this.data.id_tipo_user = 1; 
      
    }
  }

   
 
}
