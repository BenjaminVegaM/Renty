import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoletaDetailsPagePageRoutingModule } from './boleta-details-page-routing.module';

import { BoletaDetailsPagePage } from './boleta-details-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoletaDetailsPagePageRoutingModule
  ],
  declarations: [BoletaDetailsPagePage]
})
export class BoletaDetailsPagePageModule {}