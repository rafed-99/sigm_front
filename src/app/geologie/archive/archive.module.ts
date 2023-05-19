import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchiveRoutingModule } from './archive-routing.module';
import { ArchiveComponent } from './archive.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PointModule } from '../point/point.module';
import { BordereauModule } from 'src/app/centre/bordereau/bordereau.module';


@NgModule({
  declarations: [
    ArchiveComponent,
  ],
  imports: [
    CommonModule,
    ArchiveRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    FormsModule,
    DropdownModule,
    ToastModule,
    PointModule,
    BordereauModule
  ],
  providers: [
    MessageService
  ]
})
export class ArchiveModule { }
