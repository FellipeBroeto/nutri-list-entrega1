//dieta-detail.page
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dieta } from '../models/dieta';
import { ApiDietasService } from '../../services/api-dietas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiAlimentosService } from './../../services/api-alimentos.service';

@Component({
  selector: 'app-dieta-detail',
  templateUrl: './dieta-detail.page.html',
  styleUrls: ['./dieta-detail.page.scss'],
})
export class DietaDetailPage implements OnInit {


  id: number;
  data: Dieta;
  alimentosData:string;
  public formDieta: FormGroup;
  public showErrMsg:boolean = false;
  public errMsg:string = "";
  loading:any;

  constructor(
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiDietasService,
    public apiServiceAlimentos: ApiAlimentosService

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
    this.id = this.activatedRoute.snapshot.params["id"];
    //get item details using id
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(response['dietas']);
      this.data = response['dietas'];
      this.formDieta.controls.nome.setValue(this.data.nome);
      this.formDieta.controls.periodo.setValue(this.data.periodo);
      this.formDieta.controls.data.setValue(this.data.data);
      this.formDieta.controls.hora.setValue(this.data.hora);
    })
  }

  update() {

    debugger;
    //Update item by taking id and updated data object
    this.apiService.updateItem(this.id, this.data).subscribe(response => {
      this.router.navigate(['dieta-listar']);
    })
  }
  

  ionViewWillEnter() {
    this.getAllAlimentos();
  }

  getAllAlimentos() {
    
    this.apiService.getList().subscribe(response => {

      
      
      console.log(response);
      this.alimentosData = response['alimentos'];
    })
  }
}
