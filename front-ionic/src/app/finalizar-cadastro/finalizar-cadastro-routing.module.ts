import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalizarCadastroPage } from './finalizar-cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: FinalizarCadastroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalizarCadastroPageRoutingModule {}
