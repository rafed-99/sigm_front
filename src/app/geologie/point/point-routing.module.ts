import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointComponent } from './point.component';
import { PointModule } from './point.module';

let _routes:Routes=JSON.parse(localStorage.getItem('_routes')!);
_routes.forEach(route=>{
  route.component=PointComponent;
})

const routes: Routes = [
  {path : '',
  children:_routes,
    // {
    //   path:'1',component : PointComponent
    // },
    // {
    //   path:'2',component : PointComponent
    // },
    // {
    //   path:'5',component : PointComponent
    // },

  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointRoutingModule { }
