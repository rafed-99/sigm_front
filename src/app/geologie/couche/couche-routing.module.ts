import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoucheComponent } from './couche.component';

const routes: Routes = [
  { path:'' ,component : CoucheComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoucheRoutingModule { }
