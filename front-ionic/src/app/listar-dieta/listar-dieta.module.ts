import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarDietaPageRoutingModule } from './listar-dieta-routing.module';

import { ListarDietaPage } from './listar-dieta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarDietaPageRoutingModule
  ],
  declarations: [ListarDietaPage]
})
export class ListarDietaPageModule {}
