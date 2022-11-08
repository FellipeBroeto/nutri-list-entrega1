import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietaEnviarPage } from './dieta-enviar.page';

const routes: Routes = [
  {
    path: '',
    component: DietaEnviarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietaEnviarPageRoutingModule {}
