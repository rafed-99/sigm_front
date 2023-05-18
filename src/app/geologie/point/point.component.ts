import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Archive } from 'src/app/model/archive';
import { Gisement } from 'src/app/model/gisement';
import { Point } from 'src/app/model/point';
import { ArchiveService } from 'src/app/services/archive.service';
import { GisementService } from 'src/app/services/gisement.service';
import { PointService } from 'src/app/services/point.service';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent {

  constructor(private pointService : PointService , private archiveService : ArchiveService, private route : ActivatedRoute,private router:Router, private messageService : MessageService){}
  @ViewChild('filter') filter!: ElementRef;
  points : Point[]=[];
  newPoint = new Point();
  
  currentPoint = new Point();
  currentGisement = new Gisement();
  gisementIdentifier = this.route.snapshot.params['id'];
  submitted ?:boolean;
  addDialog ?:boolean;
  updateDialog ?: boolean;
  deleteDialog ?: boolean;
  systemeCordonnees : any[]=[];
  typePoint : any[]=[];
  exportGis?: boolean ;
  idGisement="0";
  
  detailPointON=false;
  selectedPoint:Point=new Point();
  selectedPoints : Point[] = []
  buttonCheck ?: boolean;
  openArchiveModal ?: boolean
  archives ?: Archive[]
  currentArchive ?: Archive;
  

  ngOnInit() :void {

    // this.getPoints();
    this.idGisement=this.router.url.split('/')[this.router.url.split('/').length-1];
    
    console.log('idGisement :', this.idGisement);
    
    this.getPointsByGisement(this.idGisement);
    this.systemeCordonnees=[
      {label: 'UTM', value: 'UTM'},
      {label: 'GEOGRAPHIQUE', value: 'Geographique'},
      {label: 'PLANES', value: 'Planes'},
    ];
    this.typePoint=[
      {label: 'SONDAGE', value: 'Sondage'},
      {label: 'TRANCHE', value: 'Tranche'},
      {label: 'PUIT', value: 'Puit'},
      {label: 'SOIGNE', value: 'Soigne'},
    ]

    this.getArchives();
  }

  // getPoints(){
  //   this.pointService.retrievePoints().subscribe( data => {
  //     this.points = data;
  //     console.log(data);
  //   })
  // }

  getArchives(){
    this.archiveService.retrieveArchives().subscribe(
      data =>{
        this.archives = data;
        console.log("data ",data);
        
      }
      )
  }


  getPointsByGisement(idGisement : string){
    this.pointService.retrievePointsByGisement(parseInt(idGisement)).subscribe(data => {
      this.points = data;
      this.points.sort((a, b) => a.pointId! > b.pointId! ? 1 : -1);

      console.log(data);
    })
  }



  addPoint(){
    console.log(this.newPoint);
    
    this.pointService.addPointWithAffectation(this.newPoint,parseInt(this.idGisement)).subscribe(point=>{
      console.log(point);
      this.points.push(point);
    })
    this.addDialog = false;
    this.newPoint = {};
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  
  openNew() {
    this.newPoint = {};
    this.newPoint.pointType=this.typePoint[0].value;
    this.newPoint.systemeCoordonnees=this.systemeCordonnees[0].value;
    this.submitted = false;
    this.addDialog = true;
  }

  hideDialog() {
    this.addDialog = false;
    this.submitted = false;
  }
  
  editPoint(PointHTML: Point) {
    console.log(PointHTML);
    this.updateDialog = true;
    this.currentPoint=PointHTML;
  }


  hideDialog2() {
    this.updateDialog = false;
    this.submitted = false;
  }

  updatePoint(point : Point){
    this.pointService.updatePoint(point).subscribe(
      () => {
        this.messageService.add({severity:'info', summary:'Point', detail:'Updated with success' , life:3000});
      }
    )
    this.updateDialog = false
    this.newPoint = {}
  }

  deletePoint(PointHTML: Point) {
    console.log(PointHTML);
    this.deleteDialog = true;
    this.currentPoint=PointHTML;
  }
  

  hideDialog3() {
    this.deleteDialog = false;
    this.submitted = false;
  }

  confirmDeleteGisement(){
    console.log(this.currentPoint.pointId!);
    this.pointService.deletePoint(this.currentPoint.pointId!).subscribe(
      ()=>{
      
      this.messageService.add({severity:'error', summary:'Point '+this.currentPoint.holeId!, detail:'Deleted with success' , life:3000});
      this.points.forEach((element,index)=>{
        if(element.pointId==this.currentPoint.pointId!) this.points.splice(index,1);
     });
    }
    );
    this.getPointsByGisement(this.idGisement);
    
    this.deleteDialog = false;
    this.newPoint = {}
  }

  showPointById(point:Point){
    this.detailPointON=true;
    this.selectedPoint=point;
  }

  openArchivePoint(){
    this.openArchiveModal = true
  }

  buttonCondition(){
    this.buttonCheck = true;
    if(this.selectedPoints.length!=0){
      this.buttonCheck = false;
    }
    return this.buttonCheck;
  }

  hideDialogArchive(){
    this.openArchiveModal = false
    this.submitted = false
  }

  archivePoint(){
    for(let i=0; i<this.selectedPoints.length;i++){
      this.selectedPoints[i].archive = this.currentArchive;

      console.log("this.selectedPoints[i] ",this.selectedPoints[i]);
      this.pointService.updatePoint(this.selectedPoints[i]).subscribe(
        data =>{
        
        console.log("data ", data)
        
      })
    }
    this.openArchiveModal = false;
    this.selectedPoints = []
  }
}
