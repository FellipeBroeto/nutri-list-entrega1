import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietaListPage } from './dieta-list.page';

const routes: Routes = [
  {
    path: '',
    component: DietaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietaListPageRoutingModule {}
