import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'bordereau', data: { breadcrumb: 'Bordereau' }, loadChildren: () => import('../centre/bordereau/bordereau.module').then(m => m.BordereauModule) },
  {path: 'element', data: { breadcrumb: 'Element' }, loadChildren: () => import('../centre/element/element.module').then(m => m.ElementModule) },
  {path: 'archive', data: { breadcrumb: 'Archive' }, loadChildren: () => import('../geologie/archive/archive.module').then(m => m.ArchiveModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentreRoutingModule { }
