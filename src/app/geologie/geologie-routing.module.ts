import { HttpParams } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'gisement', data: { breadcrumb: 'Gisements' }, loadChildren: () => import('../geologie/gisement/gisement.module').then(m => m.GisementModule) },
  { path: 'archive', data : { breadcrumb : 'Archives'}, loadChildren: () => import('../geologie/archive/archive.module').then(m => m.ArchiveModule)},
  { path : 'couche', data :{ breadcrumb : 'Couches'}, loadChildren: () => import('../geologie/couche/couche.module').then(m => m.CoucheModule)},
  { path : 'point', data :{breadcrumb : 'Points'}, loadChildren: () => import('../geologie/point/point.module').then(m => m.PointModule)},
  { path : 'geologies', data :{breadcrumb : 'Geologies'}, loadChildren: () => import('./geologies/geologies.module').then(m => m.GeologiesModule)},
  { path : 'echantillon', data :{breadcrumb : 'Echantillon'}, loadChildren: () => import('../geologie/echantillon/echantillon.module').then(m => m.EchantillonModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeologieRoutingModule { }
