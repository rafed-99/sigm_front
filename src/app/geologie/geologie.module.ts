import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeologieRoutingModule } from './geologie-routing.module';
import { EchantillonComponent } from './echantillon/echantillon.component';
import { AnalyseComponent } from './analyse/analyse.component';


@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    GeologieRoutingModule,

  ]
})
export class GeologieModule { }
