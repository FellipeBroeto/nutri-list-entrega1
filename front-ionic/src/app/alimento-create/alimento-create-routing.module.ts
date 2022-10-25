import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlimentoCreatePage } from './alimento-create.page';

const routes: Routes = [
  {
    path: '',
    component: AlimentoCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlimentoCreatePageRoutingModule {}
