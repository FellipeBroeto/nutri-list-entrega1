//dieta-edit.page
import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dieta } from '../models/dieta';
import { ApiDietasService } from '../../services/api-dietas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiAlimentosService } from '../../services/api-alimentos.service'; 

@Component({
  selector: 'app-dieta-edit',
  templateUrl: './dieta-edit.page.html',
  styleUrls: ['./dieta-edit.page.scss'],
})
export class DietaEditPage implements OnInit {


  id: number;
  data: Dieta;
  public formDieta: FormGroup;
  public showErrMsg:boolean = false;
  public errMsg:string = "";
  loading:any;
  alimentosData:string;
  contadorAlimentoDieta:number;
  totalCalorias:number;
  dataAlimentos: any;
  dataAlimentosDieta: any;
  alimentoDieta: any;

  constructor(
    public apiAlimentosService: ApiAlimentosService,
    private loadingCtrl: LoadingController, 
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiDietasService,
    public apiServiceAlimentos: ApiAlimentosService
  ) {
    this.data = new Dieta();
  }

  ngOnInit() {

    this.contadorAlimentoDieta = 0; 
    this.totalCalorias = 0; 
    this.dataAlimentosDieta = [];
    this.showLoading();
    this.formDieta = this.formBuilder.group({
      'nome': [null, [Validators.required]],
      'periodo': [null, [Validators.required]],
      'data': [null, [Validators.required]],
      'hora': [null, [Validators.required]],
    });
     
    this.id = this.activatedRoute.snapshot.params["id"];
    //get item details using id
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(response['dietas']);
      this.data = response['dietas'];
      this.setDadosData();
      
      this.getAllAlimentosByIdDieta(this.id);
    
    });
  }
    
  getAllAlimentos() {        
    this.apiAlimentosService.getList().subscribe(response => {
      this.dataAlimentos = [];
      this.dataAlimentos = response['alimentos'];
      
      //esconder loading
      this.loading.dismiss(); 
    })
  }

  setDadosData(){
    this.formDieta.controls.nome.setValue(this.data.nome);
    this.formDieta.controls.periodo.setValue(this.data.periodo);
    this.formDieta.controls.data.setValue(this.data.data);
    this.formDieta.controls.hora.setValue(this.data.hora);
  }

  getDadosForm() {

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

    let user_id  = localStorage.getItem('user_id');

    this.data.nome =  this.formDieta.controls.nome.value;
    this.data.periodo =  this.formDieta.controls.periodo.value;
    this.data.data =  this.formDieta.controls.data.value;
    this.data.hora =  this.formDieta.controls.hora.value;
    this.data.user_id =  user_id;
    this.data.lista_alimentos = this.dataAlimentosDieta;
 

  } 

  update() {
    this.getDadosForm();
    this.showLoading();
    this.data.lista_alimentos = this.dataAlimentosDieta;
    
    this.apiService.updateItem(this.id, this.data).subscribe(response => {

      //limpar msgs
      this.errMsg = "";
      this.showErrMsg = false; 

      //esconder loading
      this.loading.dismiss();
      
      this.router.navigate(['dieta-listar']);
    }, error =>{

      //esconder loading
      this.loading.dismiss(); 
      
      //limpar msgs
      this.errMsg = "Ops, ocorreu um erro!";
      this.showErrMsg = true;  

    })
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
    
    this.totalCalorias += parseInt(aux[0].calorias);
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
  //listar alimentos por id da dieta
  getAllAlimentosByIdDieta(id_dieta) {
    debugger
      this.apiServiceAlimentos.getListByIdDieta(id_dieta).subscribe(response => {
        debugger
        this.dataAlimentosDieta = [];
        
        for(let i=0; i<response['alimentos'].length;i++){
          this.totalCalorias += parseInt(response['alimentos'][i].calorias);

          let obj = {
            "calorias"  :  response['alimentos'][i].calorias,
            "created_at"  :  response['alimentos'][i].created_at,
            "id"  :  response['alimentos'][i].id,
            "id_local"  : this.contadorAlimentoDieta,
            "nome"  :  response['alimentos'][i].nome,
            "peso"  :  response['alimentos'][i].peso,
            "porcao"  :  response['alimentos'][i].porcao,
            "updated_at"  :  response['alimentos'][i].updated_at
          };
      
          this.dataAlimentosDieta.push(obj);
          this.contadorAlimentoDieta++; 
        }
        
        this.getAllAlimentos();
        
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
