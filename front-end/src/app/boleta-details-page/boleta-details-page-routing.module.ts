import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoletaDetailsPagePage } from './boleta-details-page.page';

const routes: Routes = [
  {
    path: '',
    component: BoletaDetailsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoletaDetailsPagePageRoutingModule {}
