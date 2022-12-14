import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlimentoDetailPageRoutingModule } from './alimento-detail-routing.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { AlimentoDetailPage } from './alimento-detail.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AlimentoDetailPageRoutingModule
  ],
  declarations: [AlimentoDetailPage]
})
export class AlimentoDetailPageModule {}
