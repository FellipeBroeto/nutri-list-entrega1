import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietaEnviarPageRoutingModule } from './dieta-enviar-routing.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { DietaEnviarPage } from './dieta-enviar.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DietaEnviarPageRoutingModule
  ],
  declarations: [DietaEnviarPage]
})
export class DietaEnviarPageModule {}
