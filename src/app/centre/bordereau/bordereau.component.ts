import { Component } from '@angular/core';
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

  constructor(private bordereauService : BordereauService, private archiveService : ArchiveService){}

  bordereaux : Bordereau[] = [];
  deleteDialog ?: boolean;
  currentBordereau = new Bordereau();
  submitted ?: boolean;
  newBordereau = new Bordereau();
  updateDialog ?: boolean;
  archives ?: Archive[] = []
  

  ngOnInit() : void{
    this.retrieveBordereaux();
    this.retrieveArchives();
  }

  retrieveBordereaux(){
    return this.bordereauService.getBordereaux().subscribe(
      data =>{
        this.bordereaux = data;
        console.log("bordereaux : ", this.bordereaux);
        
      }
    )
  }

  retrieveArchives(){
    return this.archiveService.retrieveArchives().subscribe(
      data=>{
        this.archives = data;
        console.log("/////// : ",data)

      }
    )
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
        this.bordereaux.forEach((a,index)=>{
        if(a.bordereauId == this.currentBordereau.bordereauId!) this.bordereaux.splice(index,1);
     });
  })
    this.deleteDialog = false;
    this.newBordereau = {};

  }

  // open update dialog
  editNew(bordereau : Bordereau){
    this.updateDialog = true;
    this.currentBordereau = bordereau;
  }

  //close update dialog
  hideDialog1(){
    this.updateDialog = false;
    this.submitted = false;
  }

  //update operation 'archive bordereau'
  updateBordereau(){
    console.log("this.currentBordereau : ",this.currentBordereau);
    
    this.bordereauService.updateBordereau(this.currentBordereau).subscribe(
      
      data =>{
        console.log("update : ",data);
        
      }
    )
    this.updateDialog = false;
    this.newBordereau = {}
  }


  
}
