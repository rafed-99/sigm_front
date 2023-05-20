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


@NgModule({
  declarations: [
    BordereauComponent
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
    ToastModule
  ],
  exports:[
    BordereauComponent
  ],
  providers:[
    MessageService
  ]
})
export class BordereauModule { }
