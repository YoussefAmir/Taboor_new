import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankServicesPage } from './bank-services.page';

const routes: Routes = [
  {
    path: '',
    component: BankServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankServicesPageRoutingModule {}
