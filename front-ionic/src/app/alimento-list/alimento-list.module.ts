import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlimentoListPageRoutingModule } from './alimento-list-routing.module';

import { AlimentoListPage } from './alimento-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlimentoListPageRoutingModule
  ],
  declarations: [AlimentoListPage]
})
export class AlimentoListPageModule {}
