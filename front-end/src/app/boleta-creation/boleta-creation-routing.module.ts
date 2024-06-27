import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoletaCreationPage } from './boleta-creation.page';

const routes: Routes = [
  {
    path: '',
    component: BoletaCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoletaCreationPageRoutingModule {}
