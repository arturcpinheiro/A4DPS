import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverResultPageRoutingModule } from './driver-result-routing.module';

import { DriverResultPage } from './driver-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverResultPageRoutingModule
  ],
  declarations: [DriverResultPage]
})
export class DriverResultPageModule {}
