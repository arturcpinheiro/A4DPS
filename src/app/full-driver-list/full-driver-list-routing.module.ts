import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullDriverListPage } from './full-driver-list.page';

const routes: Routes = [
  {
    path: '',
    component: FullDriverListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullDriverListPageRoutingModule {}
