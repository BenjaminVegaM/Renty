import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPagePageRoutingModule } from './settings-page-routing.module';

import { SettingsPagePage } from './settings-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SettingsPagePage]
})
export class SettingsPagePageModule {}
