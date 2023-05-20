import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ArchiveComponent } from 'src/app/geologie/archive/archive.component';
import { Archive } from 'src/app/model/archive';
import { Bordereau } from 'src/app/model/bordereau';
import { ArchiveService } from 'src/app/services/archive.service';
import { BordereauService } from 'src/app/services/bordereau.service';


@Component({
  selector: 'app-bordereau',
  templateUrl: './bordereau.component.html',
  styleUrls: ['./bordereau.component.scss']
})
export class BordereauComponent {

  constructor(private bordereauService : BordereauService, private archiveService : ArchiveService, private messageService: MessageService){}

  @Input()
  archiveId ?:number;

  @Output()
  fermer : EventEmitter<boolean>  = new EventEmitter()


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
  ngOnInit() : void{

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

  retrieveBordereaux(){
    return this.bordereauService.getBordereaux().subscribe(
      data =>{
        this.bordereaux = data;
        console.log("bordereaux : ", this.bordereaux);
        this.bordereaux.sort((a, b) => a.bordereauId! > b.bordereauId! ? 1 : -1);
      }
    )
    
  }

  retrieveArchives(){
    if(sessionStorage.getItem('profile')=='centre'){
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

  // open update dialog
  // editNew(bordereau : Bordereau){
  //   this.archiveDialog = true;
  //   this.currentBordereau = bordereau;
  // }

  //close update dialog
  hideDialog1(){
    this.archiveDialog = false;
    this.submitted = false;
  }

  //update operation 'archive bordereau'
  // updateBordereau(){
    
  //   //console.log("this.currentBordereau : ",this.currentBordereau);
  //   console.log("*****this.selectedBordereau! ", this.selectedBordereau!);
  //   for(let i=0;i<this.selectedBordereau?.length!;i++){
  //     console.log("/*/*/*/*/*/*",this.selectedBordereau![i]);
      
  //     this.bordereauService.updateBordereau(this.selectedBordereau![i]).subscribe(
      
  //       data =>{
  //         this.selectedBordereau![i] = data
  //         console.log("this.selectedBordereau! ", this.selectedBordereau![i]);
          
  //         console.log("update : ",data);
          
  //       }
  //     )
  //   }
    
  //   this.archiveDialog = false;
  //   this.newBordereau = {}
  // }

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

  // openSend(bordereau : Bordereau){
  //   this.archiveDialog = true;
  //   this.currentBordereau = bordereau
  // }

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
    if(sessionStorage.getItem("profile")=="centre"){
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
  
}
