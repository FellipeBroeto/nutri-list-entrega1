//alimento-edit.page
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alimento } from '../models/alimento';
import { ApiAlimentosService } from '../../services/api-alimentos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-alimento-edit',
  templateUrl: './alimento-edit.page.html',
  styleUrls: ['./alimento-edit.page.scss'],
})
export class AlimentoEditPage implements OnInit {


  id: number;
  data: Alimento;
  public formAlimentos: FormGroup;
  public showErrMsg:boolean = false;
  public errMsg:string = "";
  loading:any;

  constructor(
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiAlimentosService
  ) {
    this.data = new Alimento();
  }

  ngOnInit() {
    
    this.formAlimentos = this.formBuilder.group({
      'nome': [null, [Validators.required]],
      'calorias': [null, [Validators.required]],
      'peso': [null, [Validators.required]],
      'porcao': [null, [Validators.required]],
    });
    this.id = this.activatedRoute.snapshot.params["id"];
    //get item details using id
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(response['alimentos']);
      this.data = response['alimentos'];
      this.setDataForm();
    })
  }

  setDataForm() {

    this.formAlimentos.controls.nome.setValue(this.data.nome);
    this.formAlimentos.controls.calorias.setValue(this.data.calorias);
    this.formAlimentos.controls.peso.setValue(this.data.peso);
    this.formAlimentos.controls.porcao.setValue(this.data.porcao);
  } 
  
  getDadosForm() {
    this.data.nome =  this.formAlimentos.controls.nome.value;
    this.data.calorias =  this.formAlimentos.controls.calorias.value;
    this.data.peso =  this.formAlimentos.controls.peso.value;
    this.data.porcao =  this.formAlimentos.controls.porcao.value;
   } 

  update() {

    debugger;
  
    this.getDadosForm();
    this.apiService.updateItem(this.id, this.data).subscribe(response => {
      this.router.navigate(['alimento-listar']);
    })
  }

}
