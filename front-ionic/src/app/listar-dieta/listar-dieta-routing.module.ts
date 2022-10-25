import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarDietaPage } from './listar-dieta.page';

const routes: Routes = [
  {
    path: '',
    component: ListarDietaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarDietaPageRoutingModule {}
