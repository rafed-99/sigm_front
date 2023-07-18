import { Component, Inject, Input } from '@angular/core';
import { Echantillon } from 'src/app/model/echantillon';
import { DetailBordereauComponent } from '../detail-bordereau/detail-bordereau.component';
import { Analyse } from 'src/app/model/analyse';
import { CoupureService } from 'src/app/services/coupure.service';
import { Coupure } from 'src/app/model/coupure';
import { ElementService } from 'src/app/services/element.service';
import { Elementt } from 'src/app/model/elementt';
import { AnalyseService } from 'src/app/services/analyse.service';
import { EchantillonService } from 'src/app/services/echantillon.service';

class AnalysesResultes{
  analyses ?: Analyse[];
  elements ?: Elementt;
}



@Component({
  selector: 'app-analyse-centre',
  templateUrl: './analyse-centre.component.html',
  styleUrls: ['./analyse-centre.component.scss']
})
export class AnalyseCentreComponent {

  constructor(@Inject(DetailBordereauComponent) private detailBordereauComponent : DetailBordereauComponent, private coupureService : CoupureService, private elementService : ElementService, private analyseService :AnalyseService, private echantillonService : EchantillonService){}

  @Input()
  echantillon ?: Echantillon;

  echantillons : Echantillon[] = [];
  addAnalyseON ?: boolean
  currentEchantillon = new Echantillon();
  submitted ?:boolean;
  buttonAddCheck = false;
  newAnalyse : Analyse = new Analyse();
  coupures : Coupure[] = [];
  elements : Elementt[] = [];
  selectedCoupure : Coupure = new Coupure();
  selectedElement : Elementt = new Elementt();
  analyses : Analyse[]=[]
  modalUpdate ?:boolean;
  currentAnalyse : Analyse = new Analyse();
  modalDelete ?: boolean;
  modalConfirm ?: boolean;
  modalValider ?: boolean;
  endBoolean : boolean = true;
  modalTerminer ?: boolean;
  analysesResult ?: AnalysesResultes[]
  elementList : any[] = []
  

  ngOnInit() :void{
    this.echantillons.push(this.echantillon!);
    this.retrieveCoupures();
    this.retrieveElements();
    // this.retrieveAnalyses();
    this.retrieveAnalyses2();
  }


  return(){
    this.detailBordereauComponent.butonAnalyseOn = false
  }

  retrieveCoupures(){
    this.coupureService.retrieveCoupures().subscribe(
      data=>{
        this.coupures = data;
        console.log("coupures ",this.coupures);
        
      }
    )
  }


  retrieveElements(){
    this.elementService.retrieveElements().subscribe(
      data=>{
        this.elements = data
        console.log("elements ",this.elements);
        
      }
    )
  }

  modalAddAnalyse(){
    console.log(this.echantillon);    
    if(this.echantillon!.etatEchantillon == "Received"){
      this.addAnalyseON = true
    }
    
  }

  hideModalAdd(){
    this.addAnalyseON = false
    this.submitted = false
  }

  addAnalyse(){

    
    console.log(this.echantillon!.dateAnalyse);

    this.echantillonService.updateEchantillon(this.echantillon!).subscribe()
    
    this.newAnalyse.echantillon=this.echantillon;
    this.newAnalyse.coupure = this.selectedCoupure;
    this.newAnalyse.element = this.selectedElement;
    
    this.analyseService.addAnalyse(this.newAnalyse).subscribe(
      data=>{
        this.analyses.push(data);
        console.log(data);
      }
    )
    
    
    this.addAnalyseON = false
    this.newAnalyse = new Analyse()
  }

  // retrieveAnalyses(){
  //   this.analyseService.getAnalysesByEchantillon(this.echantillon?.echantillonId?.toString()!).subscribe(
  //     data=>{
  //       this.analyses = data
  //       console.log("this.analyses ",this.analyses);
  //     }
  //   )
  // }

  retrieveAnalyses2(){
    this.analyseService.getAnalysesByEchantillon(this.echantillon?.echantillonId?.toString()!).subscribe(
      data=>{
        this.analyses = data
        console.log("this.analyses ",this.analyses);
        this.elementHeaderList();
      }
    )
  }

  elementHeaderList(){
    console.log("this.analyses ", this.analyses);
    
    this.analyses.forEach(analyse =>{
      let name = analyse.element?.elementCode;
      console.warn(this.elementList);
      if(!this.elements.some(e => e === name)){
        this.elementList!.push(name);
      }  
      console.warn("888888 ",this.elementList);
    }
    
    )
  }

  modalUpdatePopup(analysesHtml : Analyse){
    this.currentAnalyse = analysesHtml;
    this.modalUpdate= true;
  }

  hideModalUpdatePopup(){
    this.modalUpdate = false;
    this.submitted = false;
  }

  updateAnalyses(analyse :Analyse){
    this.analyseService.updateAnalyse(analyse).subscribe(
    )
    this.modalUpdate = false;
  }

  hideModalDeletePopup(){
    this.modalDelete = false;
    this.submitted = false;
  }

  modalDeleteAnalysePopup(analyseHtml : Analyse){
    this.currentAnalyse = analyseHtml;
    this.modalDelete = true
  }

  deleteAnalyse(){
    this.analyseService.deleteAnalyse(this.currentAnalyse.analyseId!).subscribe(
      ()=>{
        this.analyses.forEach((element,index)=>{
          if(element.analyseId==this.currentAnalyse.analyseId!) this.analyses.splice(index,1);
       });
      }
    )
    this.modalDelete = false;
  }

  modalConfirmerAnalysePopup(analyseHtml : Analyse){
    this.currentAnalyse = analyseHtml;
    this.modalConfirm = true;
  }

  hideConfirmerAnalysePopup(){
    this.modalConfirm = false;
    this.submitted = false;
  }

  confirmerAnalyse(){
    this.currentAnalyse.etatAnalyse = "Confirmed"
    this.analyseService.updateAnalyse(this.currentAnalyse).subscribe(
      data=>{
        console.log(data);
        
      }
    )
    this.modalConfirm = false;
  }
  
  modalValiderAnalysePopup(analyseHtml : Analyse){
    this.currentAnalyse = analyseHtml;
    this.modalValider = true;
  }

  hideValiderAnalysePopup(){
    this.modalValider = false;
    this.submitted = false;
  }

  validerAnalyse(){
    this.currentAnalyse.etatAnalyse = "Valid"
    this.analyseService.updateAnalyse(this.currentAnalyse).subscribe(
      data=>{
        console.log(data);
        
      }
    )
    this.modalValider = false;
  }

  modalTerminerAnalysePopup(analyseHtml : Analyse){
    this.currentAnalyse = analyseHtml;
    this.modalTerminer = true;
  }

  hideTerminerAnalysePopup(){
    this.modalTerminer = false;
    this.submitted = false;
  }

  terminerAnalyse(){
    this.echantillon!.dateAnalyse = new Date().toISOString();
    this.echantillon!.etatEchantillon = "Analysed"
    this.echantillonService.updateEchantillon(this.echantillon!).subscribe(
      data=>{
        console.log(data); }
    )
    this.modalTerminer = false;

    
  }

}
