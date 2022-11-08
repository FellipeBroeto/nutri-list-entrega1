import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietaEditPageRoutingModule } from './dieta-edit-routing.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { DietaEditPage } from './dieta-edit.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DietaEditPageRoutingModule
  ],
  declarations: [DietaEditPage]
})
export class DietaEditPageModule {}
