import { Component } from '@angular/core';
import { Elementt } from 'src/app/model/elementt';
import { ElementService } from 'src/app/services/element.service';


@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent {

  constructor(private elementService : ElementService){}

  elements : Elementt[] = []
  newElement = new Elementt();
  submitted ?: boolean;
  addDialog ?: boolean;
  editDialog ?: boolean;
  deleteDialog ?: boolean;
  currentElement = new Elementt();

  ngOnInit() :void{
    this.showELements();
  }

  showELements(){
    this.elementService.retrieveElements().subscribe(
      data => {
        this.elements = data;
        console.log("***** " , data)
      }
    )
  }

  openNew(){
    this.newElement = {};
    this.submitted = false;
    this.addDialog = true;
  }

  hideDialog1(){
    this.addDialog = false;
    this.submitted = false;
  }

  editNew(element : Elementt){
    this.editDialog = true;
    this.currentElement = element;
  }

  hideDialog2(){
    this.editDialog = false;
    this.submitted = false;
  }

  deleteNew(element : Elementt){
    this.deleteDialog = true;
    this.currentElement = element;
  }

  hideDialog3(){
    this.deleteDialog = false;
    this.submitted = false;
  }

  addElement(){
    this.elementService.addElement(this.newElement).subscribe(element =>{
      this.elements.push(element);
    });
    this.addDialog = false;
    this.newElement = {};
  }

  updateElement(){
    this.elementService.updateElement(this.currentElement).subscribe()
    this.editDialog = false;
    this.newElement = {};
  }

  confirmDeleteElement(){
    this.elementService.deleteElement(this.currentElement.elementId!).subscribe(
      ()=>{
      this.elements.forEach((a,index)=>{
        if(a.elementId==this.currentElement.elementId!) this.elements.splice(index,1);
     });
  })
    this.deleteDialog = false;
    this.newElement = {};
  }
}
