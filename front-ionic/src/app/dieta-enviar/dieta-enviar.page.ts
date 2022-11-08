//dieta-enviar.page
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dieta } from '../models/dieta';
import { Users } from '../models/users';
import { ApiDietasService } from '../../services/api-dietas.service';
import { ApiUserLoginsService } from '../../services/api-user-login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-dieta-enviar',
  templateUrl: './dieta-enviar.page.html',
  styleUrls: ['./dieta-enviar.page.scss'],
})
export class DietaEnviarPage implements OnInit {


  id: number;
  data: Dieta;
  dataUsers: Users;
  public formDieta: FormGroup;
  public showErrMsg:boolean = false;
  public errMsg:string = "";
  loading:any;

  constructor(
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiDietasService,
    public apiUserService: ApiUserLoginsService
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
    //get item enviars using id
    this.apiService.getItem(this.id).subscribe(response => {
      
        console.log(response['dietas']);
        this.data = response['dietas'];
        this.formDieta.controls.nome.setValue(this.data.nome);
        this.formDieta.controls.periodo.setValue(this.data.periodo);
        this.formDieta.controls.data.setValue(this.data.data);
        this.formDieta.controls.hora.setValue(this.data.hora); 
 
        this.apiUserService.getList().subscribe(response => {
          this.dataUsers = response['users'];
        });
    

    });
  }
/*
  update() {

    debugger;
    //Update item by taking id and updated data object
    this.apiService.updateItem(this.id, this.data).subscribe(response => {
      this.router.navigate(['dieta-listar']);
    })
  }
*/
}
