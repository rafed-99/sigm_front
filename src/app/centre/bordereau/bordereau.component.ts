import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ArchiveComponent } from 'src/app/geologie/archive/archive.component';
import { Archive } from 'src/app/model/archive';
import { Bordereau } from 'src/app/model/bordereau';
import { Echantillon } from 'src/app/model/echantillon';
import { ArchiveService } from 'src/app/services/archive.service';
import { BordereauService } from 'src/app/services/bordereau.service';
import { EchantillonService } from 'src/app/services/echantillon.service';


@Component({
  selector: 'app-bordereau',
  templateUrl: './bordereau.component.html',
  styleUrls: ['./bordereau.component.scss']
})
export class BordereauComponent {

  constructor(private bordereauService : BordereauService, private archiveService : ArchiveService, private messageService: MessageService , private echantillonService : EchantillonService){}

  @Input()
  archiveId ?:number;

  @Output()
  fermer : EventEmitter<boolean>  = new EventEmitter()
  @ViewChild('filter') filter!: ElementRef;

  bordereaux : Bordereau[] = [];
  deleteDialog ?: boolean;
  currentBordereau = new Bordereau();
  currentBordereau1 : Bordereau[] = [];
  submitted ?: boolean;
  newBordereau = new Bordereau();
  archiveDialog ?: boolean;
  archives ?: Archive[] = []
  filterArchives ?: Archive[] = []
  selectedBordereau ?: Bordereau[] = []
  a = new Bordereau()
  checkButton ?: boolean
  currentArchive ?:Archive;
  modeArchive : boolean = false;

  selectedBordereauDetail : Bordereau = new Bordereau();
  detailBordereauON :boolean =false

  echantillons : Echantillon[] = [];
  checkStatus = true;
  role : string = ""

  ngOnInit() : void{
    this.role = sessionStorage.getItem('role')!;
    if(this.archiveId){
      this.modeArchive=true;
    }
    if(!this.modeArchive){
      this.retrieveBordereaux();
      this.retrieveArchives();
    }else{
      this.filterBordereauByArchive()
    }
    
    
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}
onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}
  retrieveBordereaux(){
    return this.bordereauService.getBordereaux().subscribe(
      data =>{
        this.bordereaux = data;
        console.log("bordereaux : ", this.bordereaux);
        this.bordereaux.sort((a, b) => a.bordereauId! > b.bordereauId! ? 1 : -1);
        this.changeStatus();
        
      }
    )
    
  }

  retrieveArchives(){
    if(sessionStorage.getItem('profile')=='CENTRE'){
       this.archiveService.retrieveArchives().subscribe(
        data=>{
          this.archives = data;
          for(let i=0;i<this.archives.length;i++){
            if(this.archives[i].archiveType=="Bordereau"){
              this.filterArchives?.push(this.archives[i])
            }
          }
          console.log("/////// : ",this.filterArchives)
  
        }
      )
    }
    
  }

  //open delete dialog
  deleteNew(bordereau : Bordereau){
    this.deleteDialog = true;
    this.currentBordereau = bordereau;
  }

  //close delete dialog
  hideDialog2(){
    this.deleteDialog = false;
    this.submitted = false;
  }

  //delete operation
  deleteBordereau(){
    this.bordereauService.deleteBordereau(this.currentBordereau.bordereauId!).subscribe(
      ()=>{
        this.messageService.add({severity:'error', summary:'Receipt '+this.currentBordereau.bordereauCode, detail:'Deleted with success' , life:3000});
        this.bordereaux.forEach((a,index)=>{
        if(a.bordereauId == this.currentBordereau.bordereauId!) this.bordereaux.splice(index,1);
     });
  })
    this.deleteDialog = false;
    this.newBordereau = {};

  }



  //close update dialog
  hideDialog1(){
    this.archiveDialog = false;
    this.submitted = false;
  }

 

  updateBordereau(){
    
    //console.log("this.currentBordereau : ",this.currentBordereau);
    console.log("*****this.selectedBordereau! ", this.selectedBordereau!);
    for(let i=0;i<this.selectedBordereau?.length!;i++){
      console.log("/*/*/*/*/*/*",this.selectedBordereau![i]);
      this.selectedBordereau![i].archive = this.currentArchive;
    }
      this.bordereauService.archiveBordereaux(this.selectedBordereau!).subscribe(
      
        data =>{
          // this.selectedBordereau![i] = data
          console.log("this.selectedBordereau! ", this.selectedBordereau!);
          
          console.log("update : ",data);
          // this.bordereaux.splice(this.bordereaux.indexOf(this.selectedPoints[i]),1);
        }
      )
    
    
    this.archiveDialog = false;
    this.newBordereau = {}
    this.selectedBordereau=[];
  }



  openDialogArchive(){
    this.archiveDialog = true;
  }

  buttonSendCondition(){
    this.checkButton = true;
    if(this.selectedBordereau?.length!=0){
      this.checkButton = false;
    }
    return this.checkButton
  }

  filterBordereauByArchive(){
    if(sessionStorage.getItem("profile")=="CENTRE"){
    this.bordereauService.retrieveBordereauxByArchive(this.archiveId!).subscribe(
      data=>{
        this.bordereaux=data
      }
    )
    }
  }

  retourToArchive(){
    this.fermer.emit(true)
  }

  exportExcel(){
    this.bordereauService.exportExcel().subscribe(
      response => {
        
            const blob = new Blob([response]);
            FileSaver.saveAs(blob, "receipts.xls");
          }
        )
  }

  exportExistBordereau(bordereauHtml :Bordereau){
    console.log(this.currentBordereau.bordereauId!);
    this.currentBordereau = bordereauHtml
    
    this.bordereauService.retrieveEchantillonListFromBordereau(this.currentBordereau.bordereauId!).subscribe(
      response =>{
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
      }
    )
  }

  detailBordereau(bordereauHtml:Bordereau){
    this.detailBordereauON=true;
    this.selectedBordereauDetail=bordereauHtml;
  }
  
 

  changeStatus(){
    for(let index = 0; index<this.bordereaux.length;index++){
      let status="On Hold"
      this.echantillonService.retrieveEchantillonByBordereau(this.bordereaux[index].bordereauId!).subscribe(
        data =>{
          this.echantillons = data;
          for(let i=0;i<this.echantillons.length;i++){
            let test : boolean = this.echantillons[i].etatEchantillon == "To Verify";
            console.log("test ",test);

            let receiveEch = this.echantillons.filter(ech =>{
              return ech.etatEchantillon == "Received"
            })
            let analyseEch = this.echantillons.filter(ech =>{
              return ech.etatEchantillon == "Analysed"
            })

            if(this.echantillons[i].etatEchantillon=="To Verify"){
              {status = "To Verify"}     
            }
            if((this.echantillons[i].etatEchantillon=="Received")&&(receiveEch.length==this.echantillons.length)){
              {status = "In progress"}
            }
            if(this.echantillons[i].etatEchantillon=="Analysed"){
              status = "In progress"
            }
            if((this.echantillons[i].etatEchantillon=="Analysed")&&(analyseEch.length==this.echantillons.length)){
              {status = "Analysed"}
            }
          }
          this.bordereaux[index].etatsBordereaux=status
            this.bordereauService.updateBordereau(this.bordereaux[index]).subscribe(()=>{
              console.warn("this.bordereaux ",this.bordereaux[index])
              })
        })
        
        
    }
  }
}
