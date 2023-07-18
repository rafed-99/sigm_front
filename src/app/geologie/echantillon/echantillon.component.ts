import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { Echantillon } from 'src/app/model/echantillon';
import { EchantillonService } from 'src/app/services/echantillon.service';
import { DetailPointComponent } from '../point/detail-point/detail-point.component';
import { Geologie } from 'src/app/model/geologie';
import { GeologieService } from 'src/app/services/geologie.service';
import { Table } from 'primeng/table';
import { AnalyseService } from 'src/app/services/analyse.service';
import { Analyse } from 'src/app/model/analyse';
import { Observable, forkJoin } from 'rxjs';
import { BordereauService } from 'src/app/services/bordereau.service';
import { Bordereau } from 'src/app/model/bordereau';
import {saveAs} from 'file-saver';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
class AnalyseResult{
  echantillon?:Echantillon;
  analyseList?:Analyse[];
}
@Component({
  selector: 'app-echantillon',
  templateUrl: './echantillon.component.html',
  styleUrls: ['./echantillon.component.scss']
})
export class EchantillonComponent {

  constructor(private echantillonService : EchantillonService, @Inject(DetailPointComponent) private detailPointComponent : DetailPointComponent, private geologieService : GeologieService, private analyseService: AnalyseService , private bordereauService : BordereauService, private messageService : MessageService){}

  @ViewChild('filter') filter!: ElementRef;
  newEchantillon :Echantillon = new Echantillon();
  submitted !: boolean;
  addDialog !: boolean;
  editDialog !:boolean;
  deleteDialog !: boolean;
  sendDialog !: boolean;
  currentEchantillon : Echantillon = new Echantillon();
  etatEchantillons ?: any [];
  geologies ?: Geologie[] = [];
  selectedGeology ?: Geologie;
  @Input()
  echantillons : Echantillon[] = []
  analyses : Analyse[] = []
  analysePoint:Analyse[]=[];
  resultatAnalysesList:AnalyseResult[]=[];
  idPoint ?: string = "0";
  detailButton : boolean = false;
  selectedEchantillon : Echantillon = new Echantillon();
  geologyFilter : Geologie[]=[];
  elementList : any[]=[]
  selectedechantillons ?: AnalyseResult[] = [];
  selectedAnalyses: string[] = [];
  bordereau = new Bordereau();
  selectedUrgency ?:string;
  checkSelectedEchantillon ?: boolean;
  echantillonsToSend : Echantillon[] = []
  modeArchive = false;

  

  ngOnInit() : void{
    console.log('NG ONINIT');
    this.modeArchive=this.detailPointComponent.modeArchive;
    
    this.etatEchantillons = [
      {label: 'NOUVEAU', value: 'Nouveau'},
      {label: 'A VERIFIER', value: 'A_Verifier'},
      {label: 'ENVOYE', value: 'Envoye'},
      {label: 'REÇU', value: 'Recu'},
      {label: 'ANALYSÉE', value: 'Analyse'},
      {label: 'TERMINÉE', value: 'Termine'},
    ]
    this.idPoint = this.detailPointComponent.point?.pointId!.toString();
    //this.retrieveAnalyses()
    this.retrieveAnalyses2()
    // this.retrieveAllEchantillons(this.idPoint);
    //this.retrieveGeologie();
    
    setTimeout(() => {
      this.geologies=this.detailPointComponent.geologiesComponent.geologies;

    }, 1000);
    
    
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}
onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}


retrieveAnalyses(){
  this.analyseService.getAnalyses().subscribe(
    data => {
      this.analyses = data;


    this.analyses.forEach(analyse=>{
      if(analyse.echantillon?.geologie?.point?.pointId ==this.idPoint ) {
        this.analysePoint.push(analyse);
      }
    })
    this.analysePoint.sort((a, b) => a.echantillon?.echantillonId! > b.echantillon?.echantillonId! ? 1 : -1);
    let analyseResult = new AnalyseResult();
    let ana:Analyse[]=[];
    console.warn('analysePoint', this.analysePoint);

    
    let echantillon=this.analysePoint[0].echantillon;

    


    for(let i=0; i<this.analysePoint.length ; i++){
      console.log("----------- i= ",i)
       console.warn("echantillon?.echantillonId *****" , echantillon?.echantillonId);
      // console.log("---- condition 1 ----");
      // console.warn("echantillon " , echantillon);
      
      
       console.warn("this.analysePoint[i].echantillon?.echantillonId +++++", this.analysePoint[i].echantillon?.echantillonId)
      // console.log("---- condition 2 ----");
      // console.warn("analysePoint[i].echantillon ", this.analysePoint[i].echantillon);
      
      
      if(echantillon?.echantillonId == this.analysePoint[i].echantillon?.echantillonId && i!=this.analysePoint.length-1){
        // console.log("-----if works-----")
        // console.warn("this.analysePoint[i] ",this.analysePoint[i]);
        // console.log("------------------------")
          
        ana.push(this.analysePoint[i]);
          
          // console.warn('ana',ana);
          // console.log("------------------------")
      }
      else{
        
        
        if(i==this.analysePoint.length-1){
          // ana.push(this.analysePoint[i]);
          // echantillon=this.analysePoint[i].echantillon;
        }
        // console.log("condition 1 != condition 2")
        // console.log("-----else works-----")

        // echantillon=this.analysePoint[i].echantillon;
        analyseResult.echantillon=echantillon;
        // console.log("----------------------------");
        // console.error("analyseResult.echantillon :",analyseResult.echantillon);
        analyseResult.analyseList=ana;
        // console.log("----------------------------");
        // console.error("analyseResult.analyseList :",analyseResult.analyseList);
        
        this.resultatAnalysesList.push(analyseResult);
        ana = []
        analyseResult = new AnalyseResult();
        echantillon=this.analysePoint[i].echantillon;
        // console.log("----------------------------");
        // console.error("ana :",ana);
        
        
      }
      console.warn(this.resultatAnalysesList);

    }
    // console.warn(this.resultatAnalysesList);
    


    }
  )
}

retrieveAnalyses2(){
  this.echantillonService.retrieveByPoint(parseInt(this.idPoint!)).subscribe(
    EchList =>{
      console.log("**** ",EchList);

      const analyseSubscribe$:Observable<Analyse[]>[]=[];

      EchList.forEach(_echantillon =>{
        
        let req=this.analyseService.getAnalysesByEchantillon(_echantillon.echantillonId!.toString());
        analyseSubscribe$.push(req);
      })// End ForEach ech

      forkJoin(analyseSubscribe$).subscribe(data=>{
        console.log('......', data);
        
        for (let i=0; i<data.length;i++){
        let analyseResult = new AnalyseResult();
        analyseResult.echantillon=EchList[i];
        // analyseResult.echantillon = data[i][0].echantillon;
        this.analyses = data[i];
       console.error("****** ",this.analyses);

       analyseResult.analyseList=data[i];
       this.resultatAnalysesList.push(analyseResult);
       this.resultatAnalysesList.sort((a, b) => a.echantillon?.echantillonId! > b.echantillon?.echantillonId! ? 1 : -1);

       // Create Element List headers
       this.analyses.forEach(analyse =>{
        let name = analyse.element?.elementCode;
        console.warn("this.elementList ",this.elementList);
        if(!this.elementList.some(e => e === name)){
          this.elementList.push(name);
        }  
      })
        }
        console.log("******** resultatAnalyseList : ",this.resultatAnalysesList);

      })
       // console.log("****** ",data);


      
       


     

      for(let i=0; i< this.analyses.length;i++){
        // this.analyses[i].valeurAnalyse;
        // console.warn("value  **** :",this.analyses[i].valeurAnalyse);

        this.analyses[i].echantillon;
        console.warn("echantillon  **** :",this.analyses[i].echantillon);

        // if( typeof(this.analyses[i].echantillon) == "undefined"){
        //   let a = new Analyse();
        //   a.valeurAnalyse = 0.0;
        //   this.analyses[i]= a;

          
        //   console.warn("aaaaaaaaaaa : ",this.analyses[i].valeurAnalyse);
          
        // }
    }

      console.log("******",this.resultatAnalysesList)
      
    }
  )
}

  retrieveAllEchantillons(idPoint : string){
    this.echantillonService.retrieveByPoint(parseInt(idPoint)).subscribe(
      data => {
          this.echantillons = data;

      }
    )
  }


  retrieveGeologie(){
    this.geologieService.showGeologies().subscribe(
      data => {
        this.geologies = data;
      }
      )
    }
    


  addEchantillon(){
    console.log("selected geology : ",this.selectedGeology);
    
    this.newEchantillon.geologie = this.selectedGeology;
    console.log(this.newEchantillon);
    
    this.echantillonService.addEchantillon(this.newEchantillon).subscribe(
      echantillon => {
        console.log(echantillon);
        let analyseResult = new AnalyseResult()
        analyseResult.echantillon = echantillon;
        this.resultatAnalysesList.push(analyseResult);
        this.messageService.add({severity :"success", summary:"Sample", detail:"Added with success", life : 3000})
      }
    )
    this.addDialog = false;
    this.newEchantillon =new Echantillon()
  }

  openNew(){
    this.addDialog = true;
    this.submitted = false;
    this.newEchantillon = new Echantillon()
  }

  hideDialog1(){
    this.addDialog = false;
    this.submitted = false;
  }

  updateEchantillon(echantillon : Echantillon){
    this.echantillonService.updateEchantillon(echantillon).subscribe(
      ()=>{
        this.messageService.add({severity :"info", summary:"Sample "+echantillon.echantillonId, detail:"Updated with success", life : 3000})
      }
    )
    this.editDialog = false;
    this.newEchantillon = new Echantillon()
  }

  editEchantillon(echantillonHtml : Echantillon){
    this.editDialog = true;
    this.currentEchantillon = echantillonHtml;
  }

  hideDialog2(){
    this.editDialog = false;
    this.submitted = false;
  }

  eraseEchantillon(){
    this.echantillonService.deleteEchantillon(this.currentEchantillon.echantillonId!).subscribe(
      () => {
        this.messageService.add({severity :"error", summary:"Sample "+this.currentEchantillon.echantillonId, detail:"Deleted with success", life : 3000})
        this.resultatAnalysesList.forEach((element,index)=>{
          if(element.echantillon!.echantillonId==this.currentEchantillon.echantillonId!) this.resultatAnalysesList.splice(index,1);
       });
      }
    )
    this.deleteDialog = false;
    this.newEchantillon = new Echantillon()
  }

  deleteEchantillon(echantillonHtml : Echantillon){
    this.deleteDialog = true;
    this.currentEchantillon = echantillonHtml;
    // this.ngOnInit();
  }

  hideDialog3(){
    this.deleteDialog = false;
    this.submitted = false;
  }

  echantillonDetails(echantillon : Echantillon){
    this.detailButton = true;
    this.selectedEchantillon = echantillon;
  }

  openSend(){
    this.sendDialog = true;
    this.submitted = false;
  }

  hideSend(){
    this.sendDialog = false;
    this.submitted = false;
  }

  buttonSendCondition(){
  this.checkSelectedEchantillon = true;
    if(this.selectedechantillons?.length!=0){
      this.checkSelectedEchantillon = false;
    }
    return this.checkSelectedEchantillon;
  }

  sendBordereau(){
    //console.log("/*/*/*/*/*/",this.resultatAnalysesList.length)
    console.log("/*/*/*/*",this.selectedechantillons?.length);
    for(let j:number=0 ; j<this.selectedechantillons?.length!;j++){
      console.log("/*/*/*/*",this.selectedechantillons![j].echantillon!);

      this.echantillonsToSend.push(this.selectedechantillons![j].echantillon!);
      
    }
    console.log("#####", this.echantillonsToSend);
    let ch:string =this.selectedAnalyses[0];
    for(let i=1; i<this.selectedAnalyses.length ; i++){
      ch=ch+", "+this.selectedAnalyses[i];
    }
    this.bordereau.analyseDemande = ch;
    this.bordereau.urgences = this.selectedUrgency;
    this.bordereauService.addBordereau(this.bordereau).subscribe(data =>
      {
        this.bordereau = data;
        this.echantillonService.envoyerEchantillonList(this.bordereau.bordereauId!,this.echantillonsToSend!).subscribe(
          {next:          response => {
            this.messageService.add({severity :"success", summary:"Receipt "+this.bordereau.bordereauCode, detail:"Added with success", life : 3000})
            const blob = new Blob([response], { type: 'application/pdf' });
           
            // let fileName='RAfedBord';
            // console.warn(fileName);
            // const file=new File([blob],fileName, { type: 'application/pdf' })
            // saveAs(file);

            let newVariable: any = window.navigator;
          if (newVariable && newVariable.msSaveOrOpenBlob) {
            
            newVariable.msSaveOrOpenBlob(blob);
            return;
          }
          const data = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = data;
          link.target = '_blank'
          console.warn(link);

          link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
          },
          error:(e)=>{
            console.warn(e , '\n Error Service Bordereau');
            
          },complete:()=>{
            this.echantillonsToSend=[];
            this.selectedechantillons=[];
            this.newEchantillon = new Echantillon();
          }
        }
        )
      }
    )

    this.bordereau = new Bordereau();
    this.sendDialog = false;  
      
    console.log(this.bordereau);
    
  }

  exportExcel(){
    this.echantillonService.exportExcel(parseInt(this.idPoint!)).subscribe(
      response => {
        
            const blob = new Blob([response]);
            FileSaver.saveAs(blob, "samples.xls");
          }
        )
  }

  
}
