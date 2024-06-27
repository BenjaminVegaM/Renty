import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'title-page',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login-page',
    loadChildren: () => import('./login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
  {
    path: 'signup-page',
    loadChildren: () => import('./signup-page/signup-page.module').then( m => m.SignupPagePageModule)
  },
  {
    path: 'settings-page',
    loadChildren: () => import('./settings-page/settings-page.module').then( m => m.SettingsPagePageModule)
  },
  {
    path: 'title-page',
    loadChildren: () => import('./title-page/title-page.module').then( m => m.TitlePagePageModule)
  },
  {
    path: 'date-details-page',
    loadChildren: () => import('./date-details-page/date-details-page.module').then( m => m.DateDetailsPagePageModule)
  },
  {
    path: 'arriendo-details-page',
    loadChildren: () => import('./arriendo-details-page/arriendo-details-page.module').then( m => m.ArriendoDetailsPagePageModule)
  },  {
    path: 'boleta-details-page',
    loadChildren: () => import('./boleta-details-page/boleta-details-page.module').then( m => m.BoletaDetailsPagePageModule)
  },
  {
    path: 'boleta-creation',
    loadChildren: () => import('./boleta-creation/boleta-creation.module').then( m => m.BoletaCreationPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
