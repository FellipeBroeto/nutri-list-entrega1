import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalizarCadastroPageRoutingModule } from './finalizar-cadastro-routing.module';

import { FinalizarCadastroPage } from './finalizar-cadastro.page';

import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FinalizarCadastroPageRoutingModule
  ],
  declarations: [FinalizarCadastroPage]
})
export class FinalizarCadastroPageModule {}
