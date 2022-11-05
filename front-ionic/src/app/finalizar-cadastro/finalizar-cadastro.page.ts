import { Component, OnInit } from '@angular/core';
import { Paciente } from '../models/paciente';
import { Nutricionista } from '../models/nutricionista';
import { ApiNutricionistaService } from '../../services/api-nutricionista.service';
import { ApiPacienteService } from '../../services/api-paciente.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-listar-dieta',
  templateUrl: './finalizar-cadastro.page.html',
  styleUrls: ['./finalizar-cadastro.page.scss'],
})
export class FinalizarCadastroPage implements OnInit {

  dataPaciente: Paciente
  dataNutri: Nutricionista
  showPac: boolean = false;
  public formFinalizarCadastro: FormGroup;
  public showErrMsg:boolean = false;
  public errMsg:string = '';
  loading:any;

  constructor(
    private formBuilder: FormBuilder,
    public apiServiceNutri: ApiNutricionistaService, 
    public apiServicePaciente: ApiPacienteService, 
    public router: Router
  ) {
      this.dataPaciente = new Paciente();
      this.dataNutri = new Nutricionista();
   }
   ngOnInit() {
    this.formFinalizarCadastro = this.formBuilder.group({
      'user_id': [null, Validators.compose([Validators.required])],
      'crn': [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,10}$')])],
      'nascimento': [null, Validators.compose([Validators.required/*, Validators.pattern('^[0-9]{1,10}$')*/])],
      'peso': [null, Validators.compose([Validators.required/*, Validators.pattern('^[0-9]{1,2}\.\d{2}')*/])],
      'altura': [null, Validators.compose([Validators.required/*, Validators.pattern('^[0-9]{1,2}\.\d{2}')*/])],
      'sexo': [null, Validators.compose([Validators.required, Validators.pattern('^[M|F]{1,1}$')])],      
    });
    
    let user_id = localStorage.getItem('user_id');
    this.dataPaciente.user_id = user_id;
    this.dataNutri.user_id = user_id;
    debugger

  }

  open(tipo_usuario:string) {
    if(tipo_usuario=="paciente"){
      this.showPac = false;
    }else{
      this.showPac = true;
    }

  }

  finalizarPaciente() {
    debugger

    //validate
    if(this.formFinalizarCadastro.controls.altura.errors || 
      this.formFinalizarCadastro.controls.peso.errors || 
      this.formFinalizarCadastro.controls.sexo.errors || 
      this.formFinalizarCadastro.controls.nascimento.errors
    ){
        return;
    }

    this.dataPaciente.altura=this.formFinalizarCadastro.controls.altura.value;
    this.dataPaciente.peso=this.formFinalizarCadastro.controls.peso.value;
    this.dataPaciente.sexo=this.formFinalizarCadastro.controls.sexo.value;
    this.dataPaciente.nascimento=this.formFinalizarCadastro.controls.nascimento.value; 
    
    this.apiServicePaciente.createItem(this.dataPaciente).subscribe((response) => {
        this.errMsg = "";
        this.showErrMsg = false;
        this.router.navigate(['dieta-listar']);
    }, error => {
      this.errMsg =`${error.status}:${JSON.stringify(error.msg)}`
      this.showErrMsg = true;

      //esconder loading
      //this.loading.dismiss();
      
    } );
  } 

  finalizarNutri() {
    debugger;
    //validate
    if(this.formFinalizarCadastro.controls.crn.errors){
        return;
    }

    this.dataNutri.crn=this.formFinalizarCadastro.controls.crn.value;
 
    this.apiServiceNutri.createItem(this.dataNutri).subscribe((response) => {
      this.router.navigate(['dieta-listar']);
      this.errMsg = "";
      this.showErrMsg = false;
    }, error => {
      this.errMsg =`${error.status}:${JSON.stringify(error.msg)}`
      this.showErrMsg = true;

      //esconder loading
      //this.loading.dismiss();
      
    } );
    
  }
}
