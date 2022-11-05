import { ApiAlimentosService } from './../../services/api-alimentos.service';
import { Component, OnInit } from '@angular/core';
import { Alimento } from '../models/alimento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alimento-create',
  templateUrl: './alimento-create.page.html',
  styleUrls: ['./alimento-create.page.scss'],
})
export class AlimentoCreatePage implements OnInit {

  data: Alimento
  constructor(public apiService: ApiAlimentosService, public router: Router) { 
    this.data = new Alimento();
  }

  ngOnInit() {
  }
  
  submitForm() {
    this.apiService.createItem(this.data).subscribe((response) => {
      this.router.navigate(['alimento-listar']);
    });

  }
}
