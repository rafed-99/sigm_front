import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GisementRoutingModule } from './gisement-routing.module';
import { TableModule } from 'primeng/table';
import { GisementComponent } from './gisement.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    GisementComponent
  ],
  imports: [
    CommonModule,
    GisementRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ToastModule,
    DropdownModule,
  ],
  providers:[
    ConfirmationService,
    MessageService
  ]
})
export class GisementModule { }



