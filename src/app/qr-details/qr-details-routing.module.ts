import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QrDetailsComponent} from './qr-details.component';

const routes: Routes = [
  {
    path: '',
    component: QrDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrDetailsRoutingModule {}
