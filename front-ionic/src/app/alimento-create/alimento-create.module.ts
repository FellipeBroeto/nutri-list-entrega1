import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlimentoCreatePageRoutingModule } from './alimento-create-routing.module';
import { AlimentoCreatePage } from './alimento-create.page';
import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AlimentoCreatePageRoutingModule
  ],
  declarations: [AlimentoCreatePage]
})
export class AlimentoCreatePageModule {}
