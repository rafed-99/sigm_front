import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointComponent } from './point.component';



const routes: Routes = [
  {path : '',
  children:[
    {
      path:':id',component : PointComponent
    }
    // },
    // {
    //   path:'2',component : PointComponent
    // },
    // {
    //   path:'3',component : PointComponent
    // },
    // {
    //   path:'4',component : PointComponent
    // },
  ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointRoutingModule { }
