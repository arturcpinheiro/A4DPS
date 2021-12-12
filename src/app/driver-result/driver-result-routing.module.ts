import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverResultPage } from './driver-result.page';

const routes: Routes = [
  {
    path: '',
    component: DriverResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverResultPageRoutingModule {}
