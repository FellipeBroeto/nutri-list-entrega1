import { LoadingController } from '@ionic/angular'; 
import { ApiAlimentosService } from './../../services/api-alimentos.service';
import { Component, OnInit } from '@angular/core';
import { Alimento } from '../models/alimento';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-alimento-create',
  templateUrl: './alimento-create.page.html',
  styleUrls: ['./alimento-create.page.scss'],
})
export class AlimentoCreatePage implements OnInit {

  public data: Alimento;
  public formAlimentos: FormGroup;
  public showErrMsg:boolean = false;
  public errMsg:string = "";
  loading:any;

  constructor( 
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder, 
    public apiService: ApiAlimentosService, 
    public router: Router) { 

    this.data = new Alimento();
  }

  ngOnInit() {
    this.formAlimentos = this.formBuilder.group({
      'nome': [null, [Validators.required]],
      'calorias': [null, [Validators.required]],
      'peso': [null, [Validators.required]],
      'porcao': [null, [Validators.required]]      
    });

    //limpar form
    this.limparForm();
  }
  
  submitForm() {

    if(this.formAlimentos.controls.nome.errors ||
      this.formAlimentos.controls.calorias.errors ||
      this.formAlimentos.controls.peso.errors ||
      this.formAlimentos.controls.porcao.errors){
        return;
    }

    this.data.nome = this.formAlimentos.controls.nome.value;
    this.data.calorias = this.formAlimentos.controls.calorias.value;
    this.data.peso = this.formAlimentos.controls.peso.value;
    this.data.porcao = this.formAlimentos.controls.porcao.value;

    this.showLoading();
    this.apiService.createItem(this.data).subscribe((response) => {
      
      //limpar form
      this.limparForm();

      //esconder loading
      this.loading.dismiss();

      this.router.navigate(['alimento-listar']);

    }, error => {
      this.errMsg =`${error.status}:${JSON.stringify(error.msg)}`
      this.showErrMsg = true;

      //esconder loading
      this.loading.dismiss();
    });

  }

  limparForm(){

        
    this.data.nome = "";
    this.data.calorias = "";
    this.data.peso = "";
    this.data.porcao = "";
    this.formAlimentos.controls.nome.setValue("");
    this.formAlimentos.controls.calorias.setValue("");
    this.formAlimentos.controls.peso.setValue("");
    this.formAlimentos.controls.porcao.setValue("");
  }

    
  async showLoading() {
    this.loading = await this.loadingCtrl.create({
     message: 'Loading...',
     spinner: 'circles',
   });
   this.loading.present();
 }

}
