import { Component, Inject, Input } from '@angular/core';
import { Analyse } from 'src/app/model/analyse';
import { AnalyseService } from 'src/app/services/analyse.service';
import { DetailEchantillonComponent } from '../echantillon/detail-echantillon/detail-echantillon.component';
import { Coupure } from 'src/app/model/coupure';
import { Elementt } from 'src/app/model/elementt';
import { CoupureService } from 'src/app/services/coupure.service';
import { ElementService } from 'src/app/services/element.service';
import { Echantillon } from 'src/app/model/echantillon';
class AnalyseResult{
  echantillon?:Echantillon;
  analyseList?:Analyse[];
}

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss']
})
export class AnalyseComponent {


  constructor(private analyseService : AnalyseService, @Inject(DetailEchantillonComponent) private detailEchantillonComponent : DetailEchantillonComponent, private coupuresService: CoupureService , private elementService : ElementService ){}

  @Input()
  analyses : Analyse[] = []
  idEchantillon : string = "0" ;
  coupures : Coupure[]=[]
  elements : Elementt[]=[]
  cols : any[] = [];

  analyseResult : AnalyseResult[]=[];

  newAnalyse : Analyse = new Analyse()
  submitted ?: boolean;
  updateDialog ?: boolean;
  deleteDialog ?: boolean;
  currentAnalyse = new Analyse();
  elementList: any[] = []
  ngOnInit() : void {
    
    this.idEchantillon =this.detailEchantillonComponent.echantillon?.echantillonId?.toString()!;
    
    
    this.retrieveByEchantillon(this.idEchantillon);
    this.retrieveCoupures();
    this.retrieveElements();

    this.cols = [
      { field : "co2", header : "CO2"},
      { field : "o2", header : "O2"}
    ]
  }

  retrieveByEchantillon(idEchantillon : string){
    console.log('******** idEchantillon',idEchantillon);
    
    this.analyseService.getAnalysesByEchantillon(idEchantillon).subscribe(
      data=>{
        this.analyses = data;
        let resultatAnalyse =new AnalyseResult();
        resultatAnalyse.echantillon=this.analyses[0].echantillon;
        resultatAnalyse.analyseList=this.analyses;
        this.analyseResult.push(resultatAnalyse);
        console.warn('-------------- analyseResult: ' ,this.analyseResult);

        // Get Element Codes
       this.analyses.forEach(analyse=>{
        let name = analyse.element?.elementCode;
        if(!this.elementList.some(e => e === name)){
          this.elementList.push(name);
        }
       })
       console.log(this.elementList);
       
      }
    )
  }

  

  retrieveCoupures(){
    this.coupuresService.retrieveCoupures().subscribe(
      data => {
        this.coupures = data;
        console.log(this.coupures);
        
      }
    )
  }

  retrieveElements(){
    this.elementService.retrieveElements().subscribe(
      data => {
        this.elements = data;
        console.log(this.elements);
        
      }
    )
  }


  updateAnalyse(analyse : Analyse){
    this.analyseService.updateAnalyse(analyse).subscribe(
      {

      }
    )
    this.updateDialog = false;
    this.newAnalyse = {};
  }

  editAnalyse(analyse : Analyse){
    this.updateDialog = true;
    this.currentAnalyse = analyse
  }

  hideDialog2(){
    this.updateDialog = false;
    this.submitted = false;
  }

  eraseAnalyse(analyse : Analyse){
    this.deleteDialog = true;
    this.currentAnalyse = analyse
  }

  hideDialog3(){
    this.deleteDialog = false;
    this.submitted = false;
  }

  DeleteAnalyse(){
    this.analyseService.deleteAnalyse(this.currentAnalyse.analyseId!).subscribe(
      () =>
      {
        this.analyses.forEach((element,index)=>{
          if(element.analyseId==this.currentAnalyse.analyseId!) this.analyses.splice(index,1);
       });
      }
    )
    this.deleteDialog = false;
    this.newAnalyse = {}
  }

}
