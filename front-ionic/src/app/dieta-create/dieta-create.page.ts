import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Dieta } from '../models/dieta';
import { ApiDietasService } from '../../services/api-dietas.service';
import { ApiAlimentosService } from '../../services/api-alimentos.service'; 
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dieta-create',
  templateUrl: './dieta-create.page.html',
  styleUrls: ['./dieta-create.page.scss'],
})
export class DietaCreatePage implements OnInit {

  public data: Dieta;
  dataAlimentos: any;
  dataAlimentosDieta: any;
  alimentoDieta: any;
  public formDieta: FormGroup;
  public formAlimento: FormGroup;
  public showErrMsg:boolean = false;
  public errMsg:string = "";
  loading:any;
  totalCalorias:number;
  contadorAlimentoDieta:number;

  constructor(
    public apiAlimentosService: ApiAlimentosService,
    private loadingCtrl: LoadingController, 
    private formBuilder: FormBuilder,
    public apiService: ApiDietasService, public router: Router) { 
    this.data = new Dieta();
  }

  ngOnInit() {
    this.totalCalorias = 0;
    this.dataAlimentosDieta = [];
    this.contadorAlimentoDieta = 0; 

    this.formDieta = this.formBuilder.group({
      'nome': [null, [Validators.required]],
      'periodo': [null, [Validators.required]],
      'data': [null, [Validators.required]],
      'hora': [null, [Validators.required]]
    });

    this.formAlimento = this.formBuilder.group({
       'alimento': [null, []],
    });

    //limpar form
    this.limparForm();

    this.getAllAlimentos();
 

  }

  
  deleteItemDieta(item) {
    
    this.totalCalorias -= (item.calorias);
    this.dataAlimentosDieta = this.dataAlimentosDieta.filter((item_filtro) => item_filtro.id_local !== item.id_local);

  }

  addAlimentoDieta(item) {

    
    //limpar msgs
    this.errMsg = "";
    this.showErrMsg = false;
 

    let aux =  this.dataAlimentos.filter(alimento => alimento.id === parseInt(item.detail.value));
    
    this.totalCalorias += aux[0].calorias;
    let obj = {
      "calorias"  :  aux[0].calorias,
      "created_at"  :  aux[0].created_at,
      "id"  :  aux[0].id,
      "id_local"  : this.contadorAlimentoDieta,
      "nome"  :  aux[0].nome,
      "peso"  :  aux[0].peso,
      "porcao"  :  aux[0].porcao,
      "updated_at"  :  aux[0].updated_at
    };
 
    this.dataAlimentosDieta.push(obj);
    this.contadorAlimentoDieta++;

  }
    
  
  limparForm() {
    

    this.dataAlimentosDieta = []
    this.formAlimento.controls.alimento.setValue("");
    this.data.data = "";
    this.data.hora = "";
    this.data.nome  = "";
    this.data.periodo  = "";
    this.formDieta.controls.data.setValue("");
    this.formDieta.controls.hora.setValue("");
    this.formDieta.controls.nome.setValue("");
    this.formDieta.controls.periodo.setValue("");

  }

  submitForm() {
 

    if(this.formDieta.controls.data.errors || 
      this.formDieta.controls.hora.errors || 
      this.formDieta.controls.nome.errors ||
      this.formDieta.controls.periodo.errors){
        return;
    }
 
    if(this.dataAlimentosDieta.length==0){
      //limpar msgs
      this.errMsg = "A dieta deve conter ao menos 1 alimento.";
      this.showErrMsg = true;
      return;
    }
 
    this.data.data = this.formDieta.controls.data.value.substring(0,10);
    this.data.hora = this.formDieta.controls.hora.value.substring(0,10)+" "+this.formDieta.controls.hora.value.substring(11,16);
    this.data.nome = this.formDieta.controls.nome.value;
    this.data.periodo = this.formDieta.controls.periodo.value;
    this.data.user_id  = localStorage.getItem('user_id');
    this.data.lista_alimentos = this.dataAlimentosDieta;
    
    this.showLoading();

    this.apiService.createItem(this.data).subscribe((response) => { 
 
      //limpar form
      this.limparForm();

      //limpar msgs
      this.errMsg = "";
      this.showErrMsg = false;

      //esconder loading
      this.loading.dismiss();

      this.router.navigate(['dieta-listar']);


    }, error => {
      this.errMsg =`${JSON.stringify(error.msg.message)}`
      this.showErrMsg = true;

      //esconder loading
      this.loading.dismiss();
    });

  }

  
  getAllAlimentos() {
        
    this.apiAlimentosService.getList().subscribe(response => {
    debugger
      this.dataAlimentos = [];
      this.dataAlimentos = response['alimentos'];
    })
  }

  voltar() {    
      this.router.navigate(['dieta-listar']);
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
     message: 'Loading...',
     spinner: 'circles',
   });
   this.loading.present();
 }

}


