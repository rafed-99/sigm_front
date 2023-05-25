import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BordereauRoutingModule } from './bordereau-routing.module';
import { BordereauComponent } from './bordereau.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EchantillonModule } from 'src/app/geologie/echantillon/echantillon.module';
import { PointModule } from 'src/app/geologie/point/point.module';
import { DetailBordereauComponent } from './detail-bordereau/detail-bordereau.component';


@NgModule({
  declarations: [
    BordereauComponent,
    DetailBordereauComponent
  ],
  imports: [
    CommonModule,
    BordereauRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    FormsModule,
    DropdownModule,
    ToastModule,
    PointModule
  ],
  exports:[
    BordereauComponent
  ],
  providers:[
    MessageService
  ]
})
export class BordereauModule { }
