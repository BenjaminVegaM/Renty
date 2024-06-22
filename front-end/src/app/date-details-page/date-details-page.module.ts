import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateDetailsPagePageRoutingModule } from './date-details-page-routing.module';

import { DateDetailsPagePage } from './date-details-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateDetailsPagePageRoutingModule
  ],
  declarations: [DateDetailsPagePage]
})
export class DateDetailsPagePageModule {}
