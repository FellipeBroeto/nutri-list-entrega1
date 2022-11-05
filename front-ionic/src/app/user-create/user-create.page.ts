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
  public data: UserLoginCreate;

  constructor(private formBuilder: FormBuilder, private loadingCtrl: LoadingController, public apiService: ApiUserLoginsService, public router: Router) { 
    this.data = new UserLoginCreate();
  }

  ngOnInit() {
    
    this.formCadastro = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'confirm_password': [null, [Validators.required]],      
    });


    this.formCadastro.controls.name.setValue("");
    this.formCadastro.controls.password.setValue("");

  }

  loading:any;
  async showLoading() {
     this.loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circles',
    });
    this.loading.present();
  }
  
  register() {
    

    if( this.formCadastro.controls.name.errors || 
      this.formCadastro.controls.email.errors || 
      this.formCadastro.controls.password.errors || 
      this.formCadastro.controls.confirm_password.errors 
      ){
        return;
      }

    this.data.name = this.formCadastro.controls.name.value;
    this.data.email = this.formCadastro.controls.email.value;
    this.data.password = this.formCadastro.controls.password.value;
    this.data.password_confirmation = this.formCadastro.controls.confirm_password.value;
    
    this.showLoading();
    this.apiService.register(this.data).subscribe((response) => {
    debugger;
    //limpar e esconder msgs de erro
    this.errMsg = "";
    this.showErrMsg = false;

    //esconder loading
    this.loading.dismiss();


    //set  localstorage vars
    localStorage.setItem('data_token', response['access_token']);
    localStorage.setItem('user_id', response['user'].id);     
      
    //rotear
    this.router.navigate(['dieta-listar']);
    this.router.navigate(['finalizar-cadastro']);
    }, error => {
      this.errMsg =`${error.status}:${JSON.stringify(error.msg)}`
      this.showErrMsg = true;

         //esconder loading
         this.loading.dismiss();
      
    });
  } 
 
}
