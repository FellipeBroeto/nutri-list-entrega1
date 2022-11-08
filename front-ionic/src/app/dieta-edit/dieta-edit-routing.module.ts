import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietaEditPage } from './dieta-edit.page';

const routes: Routes = [
  {
    path: '',
    component: DietaEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietaEditPageRoutingModule {}
