import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietaCreatePageRoutingModule } from './dieta-create-routing.module';

import { DietaCreatePage } from './dieta-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DietaCreatePageRoutingModule
  ],
  declarations: [DietaCreatePage]
})
export class DietaCreatePageModule {}
