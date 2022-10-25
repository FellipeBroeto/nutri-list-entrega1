import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlimentoListPage } from './alimento-list.page';

const routes: Routes = [
  {
    path: '',
    component: AlimentoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlimentoListPageRoutingModule {}
