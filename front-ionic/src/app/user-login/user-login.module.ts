import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserLoginPageRoutingModule } from './user-login-routing.module';
import { UserLoginPage } from './user-login.page';

import {  ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserLoginPageRoutingModule
  ],
  declarations: [UserLoginPage]
})
export class UserLoginPageModule {}
