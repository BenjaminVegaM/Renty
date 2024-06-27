import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoletaCreationPageRoutingModule } from './boleta-creation-routing.module';

import { BoletaCreationPage } from './boleta-creation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoletaCreationPageRoutingModule
  ],
  declarations: [BoletaCreationPage]
})
export class BoletaCreationPageModule {}
