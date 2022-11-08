//dieta-list.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiDietasService } from '../../services/api-dietas.service';
import { ApiUserLoginsService } from '../../services/api-user-login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dieta-list',
  templateUrl: './dieta-list.page.html',
  styleUrls: ['./dieta-list.page.scss'],
})
export class DietaListPage implements OnInit {

  dietasData: any;

  constructor(
    public apiService: ApiDietasService,
    public apiUserService: ApiUserLoginsService,
    public router: Router
  ) {
    this.dietasData = [];
  }

  ngOnInit() {
    // this.getAllDietas();
  }


  detalharUsuario() {
    
  }

  logout() {
    debugger;
    this.apiUserService.logout().subscribe(response => {      
      this.router.navigate(['']);
    })
  }


  ionViewWillEnter() {
    // Used ionViewWillEnter as ngOnInit is not 
    // called due to view persistence in Ionic
    this.getAllDietas();
  }

  
  getAllDietas() {
    
    this.apiService.getList().subscribe(response => {
      debugger
      console.log(response);
      this.dietasData = response['dietas'];
    })
  }


  delete(item) {
    //Delete item in Dieta data
    this.apiService.deleteItem(item.id).subscribe(Response => {
      //Update list after delete is successful
      this.getAllDietas();
    });
  }

}
