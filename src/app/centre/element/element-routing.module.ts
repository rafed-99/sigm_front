import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementModule } from './element.module';
import { ElementComponent } from './element.component';

const routes: Routes = [
  { path: '', component: ElementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElementRoutingModule { }
