import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArriendoDetailsPagePage } from './arriendo-details-page.page';

const routes: Routes = [
  {
    path: '',
    component: ArriendoDetailsPagePage
  },
  {
    path: 'boleta-details-page',
    loadChildren: () => import('../boleta-details-page/boleta-details-page.module').then( m => m.BoletaDetailsPagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArriendoDetailsPagePageRoutingModule {}
