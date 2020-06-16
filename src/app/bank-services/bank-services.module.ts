import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankServicesPageRoutingModule } from './bank-services-routing.module';

import { BankServicesPage } from './bank-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankServicesPageRoutingModule
  ],
  declarations: [BankServicesPage]
})
export class BankServicesPageModule {}
