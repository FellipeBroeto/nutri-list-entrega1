import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlimentoDetailPage } from './alimento-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AlimentoDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlimentoDetailPageRoutingModule {}
