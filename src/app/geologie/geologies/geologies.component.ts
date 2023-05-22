import { Component, Inject, Input } from '@angular/core';
import { Geologie } from 'src/app/model/geologie';
import { GeologieService } from 'src/app/services/geologie.service';
import { DetailPointComponent } from '../point/detail-point/detail-point.component';
import { CoucheService } from 'src/app/services/couche.service';
import { Couche } from 'src/app/model/couche';
import { EchantillonService } from 'src/app/services/echantillon.service';
import { Echantillon } from 'src/app/model/echantillon';
import { MessageService } from 'primeng/api';
import { PointService } from 'src/app/services/point.service';
import { Point } from 'src/app/model/point';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-geologies',
  templateUrl: './geologies.component.html',
  styleUrls: ['./geologies.component.scss']
})
export class GeologiesComponent {
  
  constructor(private geologieService : GeologieService, @Inject (DetailPointComponent) private detailPointComponent:DetailPointComponent , private coucheService : CoucheService, private echantillonService : EchantillonService ,private messageService : MessageService, private pointService : PointService){}

  idPoint:string = "";
  addDialog !: boolean;
  editDialog !: boolean;
  deleteDialog !: boolean;
  needDialog !: boolean;
  submitted !: boolean;
  newGeologie = new Geologie();
  currentGeologie = new Geologie();
  detailGeologieOn : boolean = false;
  selectedGeologie : Geologie = new Geologie();
  couches ?: Couche[] = [];
  couchefiltre ?: Couche[] = [];
  selectCouche?: Couche;
  newEchantillon = new Echantillon()
  echantillons : Echantillon[] = []
  @Input()
  geologies : Geologie[]=[]
  modeArchive = false;
  point = new Point();
  

  ngOnInit() : void{
    this.idPoint = this.detailPointComponent.point?.pointId?.toString()!;
    // this.idPoint = this.router.url.split("/")[this.router.url.split("/").length-1]
    this.modeArchive = this.detailPointComponent.modeArchive;
    
      
    
    
    this.getGeologiesByPoints();
    this.retrieveCouche();
    this.retrieveEchantillonByPoint();
  }




  getGeologiesByPoints(){
    this.geologieService.showGeologiesByPoint(parseInt(this.idPoint)).subscribe(
      data => {
        this.geologies = data
        console.log(this.geologies);
        
      }
    )
  }

  retourButton(){
    this.detailPointComponent.geologieButton = false;
  }


  retrieveCouche(){
    this.coucheService.retieveCouches().subscribe(
      couche => {
        this.couches = couche
        this.couchefiltre=[...this.couches];
        console.log(couche)

        for(let i=0; i<this.couchefiltre.length ;i++){
          for(let j=0 ; j<this.geologies.length;j++){
            if(this.couchefiltre[i].coucheCode == this.geologies[j].couche?.coucheCode){
              this.couchefiltre?.splice(this.couchefiltre.indexOf(this.couchefiltre[i]),1);
            }
          }
        }
        // this.couchefiltre.forEach(cou=>{
        //   this.geologies.forEach(geo=>{
        //     if(geo.couche?.coucheId===cou.coucheId){
        //       this.couchefiltre?.splice(this.couchefiltre.indexOf(cou),1);
        //     }
        //   })
        // })
        console.warn('Couches:',this.couches);
        console.warn('Couches Filtrée:',this.couchefiltre);
      }
      
      
    )
  }

  addGeologie(){
    console.log('Couche selected: ',this.selectCouche);
    
    
    this.newGeologie.couche=this.selectCouche;
    this.newGeologie.point=this.detailPointComponent.point;
    this.geologieService.addGeologie(this.newGeologie!).subscribe(
      geo=>{
        console.log(geo);
        this.geologies.push(geo)
        this.messageService.add({severity:'success', summary:'Geology', detail:'Added with success' , life:3000})
      }
    )
    this.addDialog = false;
    this.newGeologie = {};
  }

  retrieveEchantillonByPoint(){
    this.echantillonService.retrieveByPoint(parseInt(this.idPoint)).subscribe(
      echantillon =>{
        this.echantillons = echantillon;
        console.log("ech: ",this.echantillons);
        
      }
    )
  }

  addEchantillon(){ 
    
    let Invalid=document.getElementById('depthFrom')?.classList.contains('ng-invalid') 
    ||document.getElementById('depthTo')?.classList.contains('ng-invalid');
      console.log('Invalid', Invalid);

      console.log("echantillons : *** ",this.echantillons);
      

      if(!Invalid){
        this.newEchantillon.geologie = this.currentGeologie;
          
        this.echantillonService.addEchantillon(this.newEchantillon).subscribe(
          data => {
            console.warn("echantillons : *** ",this.echantillons);
            console.log("data : ", data );
            this.echantillons.push(this.newEchantillon);
            this.messageService.add({severity:'success', summary:'Sample', detail:'Added with success' , life:3000})
            console.log("this.echantillons.push(data) " , this.echantillons.push(data))
          }
        )

      this.needDialog = false;

      this.newEchantillon = {}
      // console.warn( this.detailPointComponent.Tabindex);

      this.detailPointComponent.Tabindex=2;
      // console.warn( this.detailPointComponent.Tabindex);

      }
              // this.detailPointComponent.echantillonComponent.retrieveAllEchantillons(this.idPoint);
              this.ngOnInit()
  }

  // addEchantillon2(){ 
  //   this.newEchantillon.geologie = this.currentGeologie;
    
  //     this.echantillonService.addEchantillon(this.newEchantillon).subscribe(data=>
  //       {console.log(data);
          
  //     })
  // }

  needGeologie(geologieHtml : Geologie){
    this.needDialog = true;
    this.currentGeologie = geologieHtml;
    this.newEchantillon.depthFrom=this.currentGeologie.depthFrom
    this.newEchantillon.depthTo=this.currentGeologie.depthTo
  }

  hideDialog4(){
    this.needDialog = false;
    this.submitted = false;
  }

  openNew(){
    this.addDialog = true;
    this.submitted = false;
    this.newGeologie = {}
  }

  hideDialog1(){
    this.addDialog = false;
    this.submitted = false;
  }

  updateGeologie(geologie : Geologie){
    this.geologieService.updateGeologie(geologie).subscribe(
      ()=>{
        this.messageService.add({severity:'info', summary:'Geology '+geologie.geologieId, detail:'Updated with success' , life:3000})
      }
    )
    this.editDialog = false;
    this.newGeologie = {};
  }

  editGeologie(geologieHtml : Geologie){
    this.editDialog = true;
    this.currentGeologie = geologieHtml;
  }

  hideDialog2(){
    this.editDialog = false;
    this.submitted = false;
  }

  eraseGeologie(){
    this.geologieService.deleteGeologie(this.currentGeologie.geologieId!).subscribe(
      () =>
      {
        this.messageService.add({severity:'error', summary:'Geology'+this.currentGeologie.geologieId, detail:'Deleted with success' , life:3000})
        this.geologies.forEach((element,index)=>{
          if(element.geologieId==this.currentGeologie.geologieId!) this.geologies.splice(index,1);
       });
      }
    )
    this.deleteDialog = false;
    this.newGeologie = {}
  }

  deleteGeologie(geologieHtml : Geologie){
    this.deleteDialog = true;
    this.currentGeologie = geologieHtml;
  }

  hideDialog3(){
    this.deleteDialog = false;
    this.submitted = false;
  }

  showDetailGeologie(geologie: Geologie){
    this.detailGeologieOn = true;
    this.selectedGeologie = geologie;
  }

  exportExcel(){
    this.geologieService.exportExcel(parseInt(this.idPoint)).subscribe(
      response => {
        this.pointService.retrievePointsById(parseInt(this.idPoint)).subscribe(
          data =>{
            this.point = data;
            console.warn(data);
            
            const blob = new Blob([response]);
            FileSaver.saveAs(blob, "geologies "+this.point.holeId+".xls");
          }
        )

        
          //   let newVariable: any = window.navigator;
          // if (newVariable && newVariable.msSaveOrOpenBlob) {
            
          //   newVariable.msSaveOrOpenBlob(blob);
          //   return;
          // }
          // const data = window.URL.createObjectURL(blob);
          // const link = document.createElement('a');
          // link.href = data;
          // link.target = '_blank'
          // link.download = "pointsExcel"
          // console.warn(link);

          // link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      }
    )
  }
}
