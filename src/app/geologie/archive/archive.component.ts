import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Archive } from 'src/app/model/archive';
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

  ngOnInit() :void{
    this.getArchives();
    // this.types = [
    //   {label: 'POINT', value: 'Point'},
    //   {label: 'BORDEREAU', value: 'Bordereau'},
    // ]
  }

  getArchives(){
    this.archiveService.retrieveArchives().subscribe(
      data => {
        this.archives = data;
        console.log(data);
        
      }
    )
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
        this.archives.push(archive);
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

}
