import { Component, Inject, Input } from '@angular/core';
import { EchantillonComponent } from '../echantillon.component';
import { Echantillon } from 'src/app/model/echantillon';
import { Analyse } from 'src/app/model/analyse';
import { BordereauService } from 'src/app/services/bordereau.service';
import { Bordereau } from 'src/app/model/bordereau';
import { EchantillonService } from 'src/app/services/echantillon.service';

@Component({
  selector: 'app-detail-echantillon',
  templateUrl: './detail-echantillon.component.html',
  styleUrls: ['./detail-echantillon.component.scss']
})
export class DetailEchantillonComponent {

  constructor(@Inject(EchantillonComponent) private echantillonComponent :EchantillonComponent, private bordereauService : BordereauService, private echhantillonService:EchantillonService){}

  @Input()
  echantillon ?:Echantillon
  echantillons : Echantillon[] = []
  Tabindex:number=0;
  analysess : Analyse[] = []
  bordereau : Bordereau = new Bordereau()
  updateNoteGeo :boolean = false;
  submitted ?:boolean;
  role : string = ""

  ngOnInit() : void {
    this.echantillons.push(this.echantillon!);
    console.log("-*-*-*-*-*-*-*-*",this.echantillon);
    this.role = sessionStorage.getItem('role')!
  }

  retour(){
    this.echantillonComponent.detailButton = false;
  }

  exportExistBordereau(){
    console.log(this.echantillon?.bordereau?.bordereauId);
    this.bordereauService.retrieveEchantillonListFromBordereau(this.echantillon?.bordereau?.bordereauId!).subscribe(
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

  updateNoteGeologie(){
    
    this.echhantillonService.updateEchantillon(this.echantillon!).subscribe(
      date=>{
        console.log(date.notesGeologie);
        
      }
    )
    this.updateNoteGeo = false
  }

  
  
}
