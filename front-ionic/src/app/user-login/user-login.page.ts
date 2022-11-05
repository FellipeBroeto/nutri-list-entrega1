import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../models/user-login';
import { ApiUserLoginsService } from 'src/services/api-user-login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  public errMsg:string = '';
  loading:any;


  constructor(
    private loadingCtrl: LoadingController, 
    public apiService: ApiUserLoginsService, 
    public router: Router, 
    private formBuilder: FormBuilder) { 
            this.data = new UserLogin();      
  }

  ngOnInit() {

    this.formLogin = this.formBuilder.group({
      //'email': [null, Validators.compose([Validators.required,/*Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')*/])],
      /*'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])]*/
      'email': [null, [Validators.required]],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  
  login() {


    if(!this.formLogin.controls.email.errors){
      this.showLoading();
      this.apiService.login(this.data).subscribe((response) => {
        debugger;
        this.data = new UserLogin();
        localStorage.setItem('data_token', response['access_token']);
        localStorage.setItem('user_id', response['user'].id);
        this.showErrMsg = false;
        this.errMsg = "";
        this.loading.dismiss();
      
        this.router.navigate(['dieta-listar']);
      }, error => {
        this.errMsg =`${error.status}:${JSON.stringify(error.msg)}`
        this.showErrMsg = true;
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
}
