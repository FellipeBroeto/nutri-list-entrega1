//alimento-list.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiAlimentosService } from './../../services/api-alimentos.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-alimento-list',
  templateUrl: './alimento-list.page.html',
  styleUrls: ['./alimento-list.page.scss'],
})
export class AlimentoListPage implements OnInit {

  alimentosData: any;
  loading:any;

  constructor(
    private loadingCtrl: LoadingController,
    public apiService: ApiAlimentosService
  ) {
    this.alimentosData = [];
  }

  ngOnInit() {
    this.showLoading();
      
  }

  ionViewWillEnter() {
    this.getAllAlimentos();
  }

  getAllAlimentos() {
    
    this.apiService.getList().subscribe(response => {
 
      
      console.log(response);
      this.alimentosData = response['alimentos'];
      this.loading.dismiss();
      
      
    });
  }


  delete(item: { id: any; }) {
    
    this.apiService.deleteItem(item.id).subscribe(Response => {
      this.getAllAlimentos();
    });
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
     message: 'Loading...',
     spinner: 'circles',
   });
   this.loading.present();
 }

}
