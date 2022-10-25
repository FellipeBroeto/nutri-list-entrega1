import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLoginCreatePage } from './user-create.page';

const routes: Routes = [
  {
    path: '',
    component: UserLoginCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserLoginCreatePageRoutingModule {}
