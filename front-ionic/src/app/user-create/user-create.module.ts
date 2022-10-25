import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserLoginCreatePageRoutingModule } from './user-create-routing.module';

import { UserLoginCreatePage } from './user-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserLoginCreatePageRoutingModule
  ],
  declarations: [UserLoginCreatePage]
})
export class UserLoginCreatePageModule {}
