//alimento-detail.page
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alimento } from '../models/alimento';
import { ApiAlimentosService } from '../../services/api-alimentos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-alimento-detail',
  templateUrl: './alimento-detail.page.html',
  styleUrls: ['./alimento-detail.page.scss'],
})
export class AlimentoDetailPage implements OnInit {


  id: number;
  data: Alimento;
  public formAlimento: FormGroup;
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
    
    this.formAlimento = this.formBuilder.group({
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
      this.formAlimento.controls.nome.setValue(this.data.nome);
      this.formAlimento.controls.calorias.setValue(this.data.calorias);
      this.formAlimento.controls.peso.setValue(this.data.peso);
      this.formAlimento.controls.porcao.setValue(this.data.porcao);
    })
  }

  update() {

    
    //Update item by taking id and updated data object
    this.apiService.updateItem(this.id, this.data).subscribe(response => {
      this.router.navigate(['alimento-listar']);
    })
  }

}
