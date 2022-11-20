//dieta-detail.page
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dieta } from '../models/dieta';
import { ApiUserLoginsService } from 'src/services/api-user-login.service'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {


  id: number;
  data: Dieta;
  public formUserDetail: FormGroup;
  public showErrMsg:boolean = false;
  public errMsg:string = "";
  loading:any;

  constructor(
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private loadingCtrl: LoadingController, 
    public apiService: ApiUserLoginsService
  ) {
    this.data = new Dieta();
  }

  ngOnInit() {
  
      this.showLoading();
      this.id = this.activatedRoute.snapshot.params["id"];
      //get item details using id

      this.formUserDetail = this.formBuilder.group({
        'nome': [null, []],
      }); 

      debugger

      this.apiService.getItem(this.id).subscribe(response => {

        
      
        this.data = response['user'];
        this.formUserDetail.controls.nome.setValue(this.data.nome);
        
        this.loading.dismiss();
      });
  }

  update() {

    
    //Update item by taking id and updated data object
    this.apiService.updateItem(this.id, this.data).subscribe(response => {
      this.router.navigate(['dieta-listar']);
    })
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
     message: 'Loading...',
     spinner: 'circles',
   });
   this.loading.present();
 }
}
