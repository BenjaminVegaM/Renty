import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArriendoDetailsPagePageRoutingModule } from './arriendo-details-page-routing.module';

import { ArriendoDetailsPagePage } from './arriendo-details-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArriendoDetailsPagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ArriendoDetailsPagePage]
})
export class ArriendoDetailsPagePageModule {}
