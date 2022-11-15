//alimento-list.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiAlimentosService } from './../../services/api-alimentos.service';

@Component({
  selector: 'app-alimento-list',
  templateUrl: './alimento-list.page.html',
  styleUrls: ['./alimento-list.page.scss'],
})
export class AlimentoListPage implements OnInit {

  alimentosData: any;

  constructor(
    public apiService: ApiAlimentosService
  ) {
    this.alimentosData = [];
  }

  ngOnInit() {
    
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


  delete(item: { id: any; }) {
    
    this.apiService.deleteItem(item.id).subscribe(Response => {
      this.getAllAlimentos();
    });
  }

}
