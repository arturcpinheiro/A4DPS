import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'full-driver-list',
    loadChildren: () => import('./full-driver-list/full-driver-list.module').then( m => m.FullDriverListPageModule)
  },
  {
    path: 'driver-detail',
    loadChildren: () => import('./driver-detail/driver-detail.module').then( m => m.DriverDetailPageModule)
  },
  {
    path: 'my-list',
    loadChildren: () => import('./my-list/my-list.module').then( m => m.MyListPageModule)
  },
  {
    path: 'driver-result',
    loadChildren: () => import('./driver-result/driver-result.module').then( m => m.DriverResultPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
