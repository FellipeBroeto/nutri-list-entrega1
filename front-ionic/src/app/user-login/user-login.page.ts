import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../models/user-login';
import { ApiUserLoginsService } from 'src/services/api-user-login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {

  public  data: UserLogin;
  public formLogin: FormGroup;
  public showErrMsg:boolean = false;
  public errMsg:string = "";
  loading:any;
  toast :any;


  constructor(
    private toastController: ToastController,
    private loadingCtrl: LoadingController, 
    public apiService: ApiUserLoginsService, 
    public router: Router, 
    private formBuilder: FormBuilder) { 
            this.data = new UserLogin();      
  }

  detalharUsuario() {

  }

  ngOnInit() {

    this.formLogin = this.formBuilder.group({
      //'email': [null, Validators.compose([Validators.required,/*Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')*/])],
      /*'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])]*/
      'email': [null, [Validators.required]],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });

    this.limparForm();
  }
 
  
  limparForm() {

    this.formLogin.controls.email.setValue("");
    this.formLogin.controls.password.setValue("");
    this.data.email = "";
    this.data.password  = "";

  }

  login() {


    if(!this.formLogin.controls.email.errors){

      
      this.data.email = this.formLogin.controls.email.value;
      this.data.password = this.formLogin.controls.password.value;

      this.showLoading();
      this.apiService.login(this.data).subscribe((response) => {
        

        this.limparForm();

        this.data = new UserLogin();
        localStorage.setItem('data_token', response['access_token']);
        localStorage.setItem('user_id', response['user'].id);
        localStorage.setItem('id_tipo_user', response['user'].id_tipo_user);
    
        this.showErrMsg = false;
        this.errMsg = "";
        this.loading.dismiss();
        //this.toast.dismiss();
      
        this.router.navigate(['dieta-listar']);
      }, error => {
        this.errMsg =`${JSON.stringify(error.msg.message)}`
        this.showErrMsg = true;

        //present toast
        this.presentToast(JSON.stringify(error.msg.message).replace("\"","").replace("\"",""));

        //esconder loading
        this.loading.dismiss();
      });
    }

   
  }

  cadastro() {
    
      this.router.navigate(['criar-usuario']);
    
  }


  
  submitForm() {
    this.apiService.createItem(this.data).subscribe((response) => {
      this.router.navigate(['userlogin-list']);
    });

  }
  
  async showLoading() {
     this.loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circles',
    });
    this.loading.present();
  }

  async presentToast(msg) {

    /*position: 'top' | 'middle' | 'bottom' */
    
    this.toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'top'
    });

    await this.toast.present();
  }
}
