import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlimentoDetailPageRoutingModule } from './alimento-detail-routing.module';

import { AlimentoDetailPage } from './alimento-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlimentoDetailPageRoutingModule
  ],
  declarations: [AlimentoDetailPage]
})
export class AlimentoDetailPageModule {}
