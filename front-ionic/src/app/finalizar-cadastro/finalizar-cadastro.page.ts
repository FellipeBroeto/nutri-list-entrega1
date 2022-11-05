import { Component, OnInit } from '@angular/core';
import { Paciente } from '../models/paciente';
import { Nutricionista } from '../models/nutricionista';
import { ApiNutricionistaService } from '../../services/api-nutricionista.service';
import { ApiPacienteService } from '../../services/api-paciente.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listar-dieta',
  templateUrl: './finalizar-cadastro.page.html',
  styleUrls: ['./finalizar-cadastro.page.scss'],
})
export class FinalizarCadastroPage implements OnInit {

  dataPaciente: Paciente
  dataNutri: Nutricionista
  showPac: boolean = false;

  constructor(
    public apiServiceNutri: ApiNutricionistaService, 
    public apiServicePaciente: ApiPacienteService, 
    public router: Router
  ) {
      this.dataPaciente = new Paciente();
      this.dataNutri = new Nutricionista();
   }
   ngOnInit() {

    
    let user_id = localStorage.getItem('user_id');
    this.dataPaciente.user_id = parseInt(user_id);
    this.dataNutri.user_id = parseInt(user_id);
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
    this.apiServicePaciente.createItem(this.dataPaciente).subscribe((response) => {
      this.router.navigate(['dieta-listar']);
    });
  } 

  finalizarNutri() {
    debugger;
    this.apiServiceNutri.createItem(this.dataNutri).subscribe((response) => {
      this.router.navigate(['dieta-listar']);
    });
    
  }
}
