import { Component, ElementRef, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Archive } from 'src/app/model/archive';
import { Point } from 'src/app/model/point';
import { ArchiveService } from 'src/app/services/archive.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  providers: [MessageService]
})
export class ArchiveComponent {

  constructor(private archiveService : ArchiveService, private messageService : MessageService){}

  @ViewChild('filter') filter!: ElementRef;
  archives : Archive[]=[];
  newArchive = new Archive();
  submitted ?: boolean;
  addDialog ?:boolean;
  updateDialog ?:boolean;
  deleteDialog ?: boolean;
  types ?: any[];
  currentArchive = new Archive();
  filterArchive : Archive[] = [];
  detailON=false;
  detailBordereauArchiveOn=false
  archiveDetailButton ?: boolean = false;
  selectedArchive =new Archive();
  filterPoint : Point[] = []

  archiveId?:number;

  
  archive?:Archive;
  ngOnInit() :void{
    // this.getArchives();
    // this.types = [
    //   {label: 'POINT', value: 'Point'},
    //   {label: 'BORDEREAU', value: 'Bordereau'},
    // ]
    this.getArchivesFilter();
    // this.showArchiveById(this.archive!)
  }

  getArchives(){
    this.archiveService.retrieveArchives().subscribe(
      data => {
        this.archives = data;
        console.log(data);
        
      }
    )
  }

  getArchivesFilter(){
    if(sessionStorage.getItem('profile')=='geologie'){
      this.archiveService.retrieveArchives().subscribe(
        data => {
          this.archives = data;
          for(let i=0;i<this.archives.length;i++){
            if(this.archives[i].archiveType==="Point"){
              this.filterArchive?.push(this.archives[i])
              console.log("filterArchive",this.filterArchive)
            }
          }
          console.log("/**/**/**",this.archives);
        }
      )
    }
    else{
      this.archiveService.retrieveArchives().subscribe(
        data => {
          this.archives= data
          for(let i=0;i<this.archives.length;i++){
            if(this.archives[i].archiveType==="Bordereau"){
              this.filterArchive?.push(this.archives[i])
            }
          }
          console.log("*/*/*/*/*",this.archives);
        }
      )
    }
    
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  
  openNew() {
    this.newArchive = {};
    this.submitted = false;
    this.addDialog = true;
  }

  hideDialog() {
    this.addDialog = false;
    this.submitted = false;
  }
  
  saveArchive(){
    if(sessionStorage.getItem('profile')=='geologie'){
      this.newArchive.archiveType = "Point"
    }
    else{
      this.newArchive.archiveType = "Bordereau"
    }
    this.archiveService.saveArchive(this.newArchive).subscribe(
      archive => {
        console.log(archive);
        this.filterArchive.push(archive);
        this.messageService.add({severity:'success', summary:'Archive', detail:'Added with success' , life:3000});
      }
    )
    this.addDialog = false;
    this.newArchive = {};
  }

  hideDialog1() {
    this.updateDialog = false;
    this.submitted = false;
  }

  editNew(ArchiveHtml: Archive){
    this.updateDialog = true;
    this.currentArchive = ArchiveHtml;
  }

  updateArchive(archive : Archive){
    this.archiveService.editArchive(archive).subscribe(
      () => {
        this.messageService.add({severity:'info', summary:'Archive', detail:'Updated with success' , life:3000});
      }
    )
    this.updateDialog = false;
    this.newArchive = {}
  }


  hideDialog2() {
    this.deleteDialog = false;
    this.submitted = false;
  }

  deleteNew(ArchiveHTML : Archive){
    this.deleteDialog = true;
    this.currentArchive = ArchiveHTML;
  }

  deleteArchive(){
     this.archiveService.deleteArchive(this.currentArchive.archiveId!).subscribe(
      ()=>{
        this.messageService.add({severity:'error', summary:'Archive '+this.currentArchive.archiveLibelle, detail:'Deleted with success' , life:3000});
        this.archives.forEach((element,index)=>{
          if(element.archiveId==this.currentArchive.archiveId!) this.archives.splice(index,1);
       });
      }
     )
     this.deleteDialog = false;
     this.newArchive = {}
  }

  showArchiveById(archive:Archive){
    if(archive.archiveType=='Point')
    { 
      this.detailON=true;
    }
    else{
      this.detailBordereauArchiveOn=true
    }

    this.archiveId=archive.archiveId
       
  }

  closepoint(isopen : boolean){
    this.detailON = !isopen;
  }

  closebordereau(isopen : boolean){
    this.detailBordereauArchiveOn = !isopen
  }

  exportExcel(){
    if(sessionStorage.getItem("profile")=="geologie"){
      this.archiveService.exportArchiveByPoint().subscribe(
        response => {
        
          const blob = new Blob([response]);
          FileSaver.saveAs(blob, "archivePoints.xls");
        }
      )
    }
    else{
      this.archiveService.exportArchiveByBordereau().subscribe(
        response => {
        
          const blob = new Blob([response]);
          FileSaver.saveAs(blob, "archiveReceipts.xls");
        }
      )
    }
  }
}
