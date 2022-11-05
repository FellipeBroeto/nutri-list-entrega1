import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietaListPageRoutingModule } from './dieta-list-routing.module';

import { DietaListPage } from './dieta-list.page';
import {  ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DietaListPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DietaListPage]
})
export class DietaListPageModule {}
