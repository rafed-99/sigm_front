import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentreRoutingModule } from './centre-routing.module';
import { BordereauComponent } from './bordereau/bordereau.component';
import { ElementComponent } from './element/element.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CentreRoutingModule
  ]
})
export class CentreModule { }
