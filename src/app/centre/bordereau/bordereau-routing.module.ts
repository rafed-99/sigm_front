import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BordereauComponent } from './bordereau.component';

const routes: Routes = [
  {path :'' , component: BordereauComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BordereauRoutingModule { }
