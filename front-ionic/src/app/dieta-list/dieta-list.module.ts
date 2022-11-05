import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietaListPageRoutingModule } from './dieta-list-routing.module';

import { DietaListPage } from './dieta-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DietaListPageRoutingModule
  ],
  declarations: [DietaListPage]
})
export class DietaListPageModule {}
