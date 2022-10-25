import { Component, OnInit } from '@angular/core';
import { ApiAlimentosService } from '../services/api-alimentos.service';

@Component({
  selector: 'app-listar-dieta',
  templateUrl: './listar-dieta.page.html',
  styleUrls: ['./listar-dieta.page.scss'],
})
export class ListarDietaPage implements OnInit {

  alimentosData: any;

  constructor(
    public apiService: ApiAlimentosService
  ) {
    this.alimentosData = [];
   }

  ngOnInit() {
  }

}
