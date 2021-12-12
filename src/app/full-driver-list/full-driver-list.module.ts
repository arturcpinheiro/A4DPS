import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullDriverListPageRoutingModule } from './full-driver-list-routing.module';

import { FullDriverListPage } from './full-driver-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullDriverListPageRoutingModule
  ],
  declarations: [FullDriverListPage]
})
export class FullDriverListPageModule {}
