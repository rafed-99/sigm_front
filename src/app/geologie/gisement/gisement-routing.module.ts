import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GisementComponent } from './gisement.component';

const routes: Routes = [
  { path: '', component: GisementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GisementRoutingModule { }
