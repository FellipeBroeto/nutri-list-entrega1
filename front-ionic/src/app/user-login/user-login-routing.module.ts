import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  ReactiveFormsModule } from '@angular/forms';


import { UserLoginPage } from './user-login.page';

const routes: Routes = [
  {
    path: '',
    component: UserLoginPage
  }
];

@NgModule({
  imports: [ ReactiveFormsModule,RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserLoginPageRoutingModule {}
