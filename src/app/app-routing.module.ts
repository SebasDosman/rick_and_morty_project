import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab6/:id',
    loadChildren: () => import('./pages/tab6/tab6.module').then( m => m.Tab6PageModule)
  },  {
    path: 'tab7',
    loadChildren: () => import('./pages/tab7/tab7.module').then( m => m.Tab7PageModule)
  },
  {
    path: 'tab8',
    loadChildren: () => import('./pages/tab8/tab8.module').then( m => m.Tab8PageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
