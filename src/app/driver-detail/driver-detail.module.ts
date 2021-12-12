import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverDetailPageRoutingModule } from './driver-detail-routing.module';

import { DriverDetailPage } from './driver-detail.page';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    DriverDetailPageRoutingModule
  ],
  declarations: [DriverDetailPage]
})
export class DriverDetailPageModule {}
