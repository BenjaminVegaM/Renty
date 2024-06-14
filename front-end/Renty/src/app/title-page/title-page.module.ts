import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TitlePagePageRoutingModule } from './title-page-routing.module';

import { TitlePagePage } from './title-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TitlePagePageRoutingModule
  ],
  declarations: [TitlePagePage]
})
export class TitlePagePageModule {}
