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


  idUsuario: number;
  idDieta: number;
  
 
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
  
  associarDieta() {

    debugger
    this.idUsuario = this.formDieta.controls.paciente.value;

    this.apiService.associarDietaUsuario(this.idUsuario, this.idDieta).subscribe(response => {
        debugger;
        console.log("sucess");
        this.router.navigate(['dieta-listar']);
    }, error => {
      debugger
      console.log(error)
    }); 


  }


  ngOnInit() {
    
    this.formDieta = this.formBuilder.group({
      'paciente': [null, [Validators.required]] 
    }); 
 
       
    this.idDieta = this.activatedRoute.snapshot.params["id"];
    //get item enviars using id
    this.apiService.getItem(this.idDieta).subscribe(response => {
       //carregar combo usuarios
        this.apiUserService.getListPaciente().subscribe(response => {
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
