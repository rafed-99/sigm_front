import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Couche } from 'src/app/model/couche';
import { CoucheService } from 'src/app/services/couche.service';

@Component({
  selector: 'app-couche',
  templateUrl: './couche.component.html',
  styleUrls: ['./couche.component.scss'],
  providers : [MessageService]
})
export class CoucheComponent {

  constructor(private coucheService: CoucheService, private messageService : MessageService){}

  @ViewChild('filter') filter!: ElementRef;
  couches : Couche[]=[];
  newCouche = new Couche();
  submitted ?: boolean;
  addDialog ?: boolean;
  currentCouche = new Couche();
  updateDialog ?:boolean;
  deleteDialog ?:boolean

  ngOnInit(): void { 
    this.getCouches();
  }

  getCouches(){
    this.coucheService.retieveCouches().subscribe( data => {
      this.couches = data;
      console.log(this.couches);
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  
  openNew() {
    this.newCouche = {};
    this.submitted = false;
    this.addDialog = true;
  }

  hideDialog() {
    this.addDialog = false;
    this.submitted = false;
  }

  saveCouche(){
    let codeExist = false;
    this.submitted = true;
    this.couches.forEach(c =>{
      if(c.coucheCode == this.newCouche.coucheCode){
        this.messageService.add({severity:'warn', summary:'Archive', detail:'Cannot add with existant code' , life:3000});
        this.hideDialog();
        codeExist = true;
        return;
      }
    })
    if(!codeExist){
      this.coucheService.addCouche(this.newCouche).subscribe(couche =>{
        this.couches.push(couche);
        this.messageService.add({severity:'success', summary:'Couche', detail:'Added with success' , life:3000});
      } 
      )
      this.addDialog = false;
      this.newCouche = {}
    }

  }

  hideDialog1() {
    this.updateDialog = false;
    this.submitted = false;
  }

  editNew(CoucheHtml: Couche){
    this.updateDialog = true;
    this.currentCouche = CoucheHtml;
  }

  updateCouche(couche : Couche){
    this.coucheService.updateCouche(couche).subscribe(
      () => {
        this.messageService.add({severity:'info', summary:'Couche', detail:'Updated with success' , life:3000});
      }
    )
    this.updateDialog = false;
    this.newCouche = {};
  }

  hideDialog2() {
    this.deleteDialog = false;
    this.submitted = false;
  }

  deleteNew(coucheHtml : Couche){
    this.deleteDialog = true;
    this.currentCouche = coucheHtml;
  }

  deleteCouche(){
    this.coucheService.deleteCouche(this.currentCouche.coucheId!).subscribe(
      ()=> {
        this.messageService.add({severity:'error', summary:'Couche '+this.currentCouche.coucheLibelle, detail:'Deleted with success' , life:3000});
        this.couches.forEach((element,index)=>{
          if(element.coucheId==this.currentCouche.coucheId!) this.couches.splice(index,1);
       });
      }
    );
    this.deleteDialog = false;
    this.newCouche ={};
  }


}
