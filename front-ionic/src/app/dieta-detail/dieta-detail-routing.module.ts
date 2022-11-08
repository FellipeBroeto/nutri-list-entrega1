import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietaDetailPage } from './dieta-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DietaDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietaDetailPageRoutingModule {}
