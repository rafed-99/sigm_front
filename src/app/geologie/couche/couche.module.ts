import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoucheRoutingModule } from './couche-routing.module';
import { CoucheComponent } from './couche.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    CoucheComponent
  ],
  imports: [
    CommonModule,
    CoucheRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    FormsModule,
    InputNumberModule,
    ToastModule,
  ],
  providers: [
    MessageService
  ]
})
export class CoucheModule { }
