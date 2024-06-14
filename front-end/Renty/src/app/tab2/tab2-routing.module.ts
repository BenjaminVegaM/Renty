import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'title-page',
    loadChildren: () => import('../title-page/title-page.module').then( m => m.TitlePagePageModule)
  },
  {
    path: 'date-details-page',
    loadChildren: () => import('../date-details-page/date-details-page.module').then( m => m.DateDetailsPagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
