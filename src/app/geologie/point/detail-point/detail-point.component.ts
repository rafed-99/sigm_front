import { Component, Inject, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Point } from 'src/app/model/point';
import { PointService } from 'src/app/services/point.service';
import { PointComponent } from '../point.component';
import { Geologie } from 'src/app/model/geologie';
import { GeologiesComponent } from '../../geologies/geologies.component';
import { Router } from '@angular/router';
import { GeologieService } from 'src/app/services/geologie.service';
import { Echantillon } from 'src/app/model/echantillon';
import { EchantillonComponent } from '../../echantillon/echantillon.component';

@Component({
  selector: 'app-detail-point',
  templateUrl: './detail-point.component.html',
  styleUrls: ['./detail-point.component.scss']
})
export class DetailPointComponent implements OnInit{
  
  @Input()
  point?:Point;

  @ViewChild(EchantillonComponent) echantillonComponent!:EchantillonComponent;
  @ViewChild(GeologiesComponent) geologiesComponent!:GeologiesComponent;
  points:Point[]=[]
  geologieButton = false;
  buttonEchantillons : boolean = false;
  geologiee: Geologie[] = [];
  echantillones : Echantillon[] = [];
  Tabindex:number=0;
  constructor( @Inject (PointComponent) private pointComponent:PointComponent, private pointService : PointService, private geologieService : GeologieService){
   
  }
  
  ngOnInit(): void {
    this.points.push(this.point!);
    console.log(this.point!);
    
  }

  goToGeologie(){
    this.geologieButton=true;
    
  }
  
  retour(){
    this.pointComponent.detailPointON=false;
  }

  goToEchantillons(){
    this.buttonEchantillons = true;
  }

  retour1(){
    this.buttonEchantillons=false;
  }

  
}
