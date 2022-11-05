import { Component, OnInit } from '@angular/core';
import { Dieta } from '../models/dieta';
import { ApiDietasService } from '../../services/api-dietas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dieta-create',
  templateUrl: './dieta-create.page.html',
  styleUrls: ['./dieta-create.page.scss'],
})
export class DietaCreatePage implements OnInit {

  data: Dieta
  constructor(public apiService: ApiDietasService, public router: Router) { 
    this.data = new Dieta();
  }

  ngOnInit() {
  }
  
  submitForm() {
    this.apiService.createItem(this.data).subscribe((response) => {
      this.router.navigate(['dieta-listar']);
    });

  }
  voltar() {    
      this.router.navigate(['dieta-listar']);
  }
}
