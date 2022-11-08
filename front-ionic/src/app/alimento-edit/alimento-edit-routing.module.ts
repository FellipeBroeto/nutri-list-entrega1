import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlimentoEditPage } from './alimento-edit.page';

const routes: Routes = [
  {
    path: '',
    component: AlimentoEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlimentoEditPageRoutingModule {}
