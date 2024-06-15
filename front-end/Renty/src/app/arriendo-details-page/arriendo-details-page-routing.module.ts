import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArriendoDetailsPagePage } from './arriendo-details-page.page';

const routes: Routes = [
  {
    path: '',
    component: ArriendoDetailsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArriendoDetailsPagePageRoutingModule {}
