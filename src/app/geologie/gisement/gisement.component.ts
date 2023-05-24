import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Gisement } from 'src/app/model/gisement';
import { GisementService } from 'src/app/services/gisement.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-gisement',
  templateUrl: './gisement.component.html',
  styleUrls: ['./gisement.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class GisementComponent implements OnInit{
  

  constructor(private gisementService: GisementService , private router : Router ,  private confirmationService : ConfirmationService , private messageService : MessageService){}
  
  @ViewChild('filter') filter!: ElementRef;
  gisements : Gisement[]=[];
  submitted ?: boolean;
  addDialog ?: boolean;
  deleteDialog ?: boolean;
  updateDialog ?: boolean;
  newGisement = new Gisement();
  currentGisement = new Gisement();
  secteur ?: any[];
  
  ngOnInit(): void {
   this.getGisements();
   this.secteur = [
    {label: 'REDEYEF', value: 'Redeyef'},
    {label: 'MOULARES', value: 'Moulares'},
    {label: 'METLAOUI', value: 'Metlaoui'},
    {label: 'MDHILLA', value: 'Mdhilla'},
  ]
  }
  getGisements(){
    this.gisementService.retrieveGisements().subscribe(
      data =>{
        this.gisements = data;
        console.log(this.gisements);
        
      }
    )
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}
onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

openNew() {
  this.newGisement = {};
  this.submitted = false;
  this.addDialog = true;
}

hideDialog() {
  this.addDialog = false;
  this.submitted = false;
}

saveProduct() {
  let codeExist=false;
  this.submitted = true;
this.gisements.forEach(gis=>{
  if(this.newGisement.gisementCode == gis.gisementCode){
    this.messageService.add({severity:'warn', summary:'Gisement', detail:'Cannot add with existant code' , life:3000});
    this.hideDialog();
    codeExist=true;
    return;
  }

})
if(!codeExist)
{
  this.gisementService.addGisement(this.newGisement).subscribe(gisement => {
    console.log(gisement);
    this.gisements.push(gisement);
    this.messageService.add({severity:'success', summary:'Gisement', detail:'Added with success' , life:3000});
    localStorage.setItem('routes','Rafed')
    })
} 
    this.addDialog = false;
    this.newGisement = {};
}

hideDialog1() {
  this.updateDialog = false;
  this.submitted = false;
}

editProduct(gisementHTML: Gisement) {

  console.log(gisementHTML);
  this.updateDialog = true;
 this.currentGisement=gisementHTML;
}

updateGisement(gisement : Gisement){
  this.gisementService.updateGisement(gisement).subscribe(
    () => {
      this.messageService.add({severity:'info', summary:'Gisement', detail:'Updated with success' , life:3000});
    }
  )
  this.updateDialog = false
  this.newGisement = {}
}

hideDialog2() {
  this.deleteDialog = false;
  this.submitted = false;
}

deleteGisement(gisementHTML: Gisement) {

  console.log(gisementHTML);
  this.deleteDialog = true;
  this.currentGisement=gisementHTML;
}

confirmDeleteGisement(){
  console.log(this.currentGisement);
  this.gisementService.deleteGisement(this.currentGisement.gisementId!).subscribe(
    ()=>{
    
    this.messageService.add({severity:'error', summary:'Gisement '+this.currentGisement.gisementLibelle!, detail:'Deleted with success' , life:3000});
    this.gisements.forEach((element,index)=>{
      if(element.gisementId==this.currentGisement.gisementId!) this.gisements.splice(index,1);
   });
  }
  );
  this.getGisements();
  
  this.deleteDialog = false;
  this.newGisement = {}
}

exportExcel(){
  this.gisementService.exportExcel().subscribe(
    response => {
      
          const blob = new Blob([response]);
          FileSaver.saveAs(blob, "fields.xls");
        }
      )
}

}










