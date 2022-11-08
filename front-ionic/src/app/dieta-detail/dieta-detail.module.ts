import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietaDetailPageRoutingModule } from './dieta-detail-routing.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { DietaDetailPage } from './dieta-detail.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DietaDetailPageRoutingModule
  ],
  declarations: [DietaDetailPage]
})
export class DietaDetailPageModule {}
