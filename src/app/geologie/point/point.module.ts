import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointRoutingModule } from './point-routing.module';
import { PointComponent } from './point.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DetailPointComponent } from './detail-point/detail-point.component';
import { GeologiesComponent } from '../geologies/geologies.component';
import { EchantillonComponent } from '../echantillon/echantillon.component';
import {TabViewModule} from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { DetailEchantillonComponent } from '../echantillon/detail-echantillon/detail-echantillon.component';
import { AnalyseComponent } from '../analyse/analyse.component';


@NgModule({
  declarations: [
    PointComponent,
    DetailPointComponent,
    GeologiesComponent,
    EchantillonComponent,
    DetailEchantillonComponent,
    AnalyseComponent
  ],
  imports: [
    CommonModule,
    PointRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    DropdownModule,
    InputSwitchModule,
    ToastModule,
    TabViewModule,
    CheckboxModule
  ],
  providers:[
    // ConfirmationService,
    MessageService
  ]
})
export class PointModule { }
