import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeologiesComponent } from './geologies.component';

const routes: Routes = [
  {path : '', component : GeologiesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeologiesRoutingModule { }
