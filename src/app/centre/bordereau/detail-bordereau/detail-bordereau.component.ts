import { Component, Inject, Input } from '@angular/core';
import { Bordereau } from 'src/app/model/bordereau';
import { BordereauComponent } from '../bordereau.component';
import { BordereauService } from 'src/app/services/bordereau.service';
import { EchantillonService } from 'src/app/services/echantillon.service';
import { Echantillon } from 'src/app/model/echantillon';

@Component({
  selector: 'app-detail-bordereau',
  templateUrl: './detail-bordereau.component.html',
  styleUrls: ['./detail-bordereau.component.scss']
})
export class DetailBordereauComponent {

  constructor(@Inject(BordereauComponent) private bordereauComponent : BordereauComponent, private bordereauService : BordereauService, private echantillonService : EchantillonService){}

  @Input()
  bordereau ?:Bordereau;

  bordereaux : Bordereau[] = [];
  echantillons : Echantillon[] =[]
  selectedechantillons : Echantillon[] =[]

  receiveSampleDialog =false;
  currentEchantillon : Echantillon = new Echantillon();
  submitted ?: boolean;
  checkStatus = true;


  ngOnInit() :void {
    console.log(this.bordereau);
    this.bordereaux.push(this.bordereau!);
    console.log(this.bordereaux);
    this.retrieveEchantillonsByBordereau();
  }

  return(){
    this.bordereauComponent.detailBordereauON = false;
  }

  // exportPDF(bordereauHtml :Bordereau){
  //   {
  //     console.log("/*/*/*/*/",this.bordereau!.bordereauId!);
  //     this.bordereau = bordereauHtml;
      
  //     this.bordereauService.retrieveEchantillonListFromBordereau(this.bordereau!.bordereauId!).subscribe(
  //       response =>{
  //         const blob = new Blob([response], { type: 'application/pdf' });
             
  //             // let fileName='RAfedBord';
  //             // console.warn(fileName);
  //             // const file=new File([blob],fileName, { type: 'application/pdf' })
  //             // saveAs(file);
  
  //             let newVariable: any = window.navigator;
  //           if (newVariable && newVariable.msSaveOrOpenBlob) {
              
  //             newVariable.msSaveOrOpenBlob(blob);
  //             return;
  //           }
  //           const data = window.URL.createObjectURL(blob);
  //           const link = document.createElement('a');
  //           link.href = data;
  //           link.target = '_blank'
  //           console.warn(link);
  
  //           link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  //       }
  //     )
  //   }
  // }

  retrieveEchantillonsByBordereau(){
    this.echantillonService.retrieveEchantillonByBordereau(this.bordereau?.bordereauId!).subscribe(
      data =>{
        this.echantillons = data;
        console.log("////////",this.echantillons);
        
      }
    )
  }

  modalReceiveSample(echantillonHtml : Echantillon){
    this.receiveSampleDialog = true;
    this.currentEchantillon = echantillonHtml;
  }

  hideModalReceiveSample(){
    this.receiveSampleDialog = false;
    this.submitted = false
  }

  receiveSample(){
    this.echantillonService.receiveSample(this.currentEchantillon).subscribe();
    this.receiveSampleDialog = false;
  }

  changeReceiptStatusToInProgress(){
    let i = 0; 
    do{
      if(this.echantillons[i].etatEchantillon==="Received"){
        i++
      }else{
        this.checkStatus = false;
      }
    }while((i>this.echantillons.length)||(this.checkStatus==false))

    if(this.checkStatus){
      this.bordereauService.changeStatusToInProgress(this.bordereau!).subscribe();
    }
  }
}
