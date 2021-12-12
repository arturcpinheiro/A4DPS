import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverDetailPage } from './driver-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DriverDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverDetailPageRoutingModule {}
