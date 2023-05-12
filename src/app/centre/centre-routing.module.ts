import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'bordereau', data: { breadcrumb: 'Bordereau' }, loadChildren: () => import('../centre/bordereau/bordereau.module').then(m => m.BordereauModule) },
  {path: 'element', data: { breadcrumb: 'Element' }, loadChildren: () => import('../centre/element/element.module').then(m => m.ElementModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentreRoutingModule { }
