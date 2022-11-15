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
    debugger;

    this.totalCalorias -= (item.calorias);

     for(let i=0; i < this.dataAlimentosDieta.length; i++){
        if(this.dataAlimentosDieta[i].id==item.id){
          this.dataAlimentosDieta.splice(i);
        }
     }    
     debugger;
  }

  addAlimentoDieta(item) {

    debugger;
    //limpar msgs
    this.errMsg = "";
    this.showErrMsg = false;
    
    let aux =  this.dataAlimentos.filter(alimento => alimento.id === parseInt(item.detail.value));
    this.totalCalorias += aux[0].calorias;
    this.dataAlimentosDieta.push(aux[0])

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


    debugger;

    this.data.data = this.formDieta.controls.data.value.substring(0,10);
    this.data.hora = this.formDieta.controls.hora.value.substring(0,10)+" "+this.formDieta.controls.hora.value.substring(11,16);
    this.data.nome = this.formDieta.controls.nome.value;
    this.data.periodo = this.formDieta.controls.periodo.value;
    this.data.user_id  = localStorage.getItem('user_id');
    this.data.lista_alimentos = this.dataAlimentosDieta;
    
    this.showLoading();

    this.apiService.createItem(this.data).subscribe((response) => { 

       
      this.router.navigate(['dieta-listar']);
      
      
      //limpar form
      this.limparForm();

      //limpar msgs
      this.errMsg = "";
      this.showErrMsg = false;

      //esconder loading
      this.loading.dismiss();


    }, error => {
      this.errMsg =`${JSON.stringify(error.msg)}`
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


