//dieta-edit.page
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dieta } from '../models/dieta';
import { ApiDietasService } from '../../services/api-dietas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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

  constructor(
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiDietasService
  ) {
    this.data = new Dieta();
  }

  ngOnInit() {
    
    this.formDieta = this.formBuilder.group({
      'nome': [null, [Validators.required]],
      'periodo': [null, [Validators.required]],
      'data': [null, [Validators.required]],
      'hora': [null, [Validators.required]],
    });
    this.formDieta.controls.nome.setValue("teste ");
    this.id = this.activatedRoute.snapshot.params["id"];
    //get item details using id
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(response['dietas']);
      this.data = response['dietas'];
      this.setDadosData();
      
    })
  }

  
  setDadosData(){
    this.formDieta.controls.nome.setValue(this.data.nome);
    this.formDieta.controls.periodo.setValue(this.data.periodo);
    this.formDieta.controls.data.setValue(this.data.data);
    this.formDieta.controls.hora.setValue(this.data.hora);

  }

  getDadosForm() {

    let user_id  = localStorage.getItem('user_id');

    this.data.nome =  this.formDieta.controls.nome.value;
    this.data.periodo =  this.formDieta.controls.periodo.value;
    this.data.data =  this.formDieta.controls.data.value;
    this.data.hora =  this.formDieta.controls.hora.value;
    this.data.user_id =  user_id;
   

  } 

  update() {

    this.getDadosForm();
    this.apiService.updateItem(this.id, this.data).subscribe(response => {
      this.router.navigate(['dieta-listar']);
    })
  }

}
