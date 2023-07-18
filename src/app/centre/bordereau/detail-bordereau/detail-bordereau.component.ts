import { Component, Inject, Input } from '@angular/core';
import { Bordereau } from 'src/app/model/bordereau';
import { BordereauComponent } from '../bordereau.component';
import { BordereauService } from 'src/app/services/bordereau.service';
import { EchantillonService } from 'src/app/services/echantillon.service';
import { Echantillon } from 'src/app/model/echantillon';
import { echantillonStatus } from 'src/environments/environment'

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
  verifySampleDialog=false;
  currentEchantillon : Echantillon = new Echantillon();
  submitted ?: boolean;
  checkStatus = true;
  newEchantillon =new Echantillon()
  _echantillon :Echantillon = new Echantillon();
  severityString:string[]=[];
  butonAnalyseOn:boolean =false;
  selectedEchantillon = new Echantillon();


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

  updateSeverity(){
    this.severityString=[];
    this.echantillons.forEach(ech=>{
      if(ech.etatEchantillon==echantillonStatus.New.name){
        this.severityString.push(echantillonStatus.New.color)
      }
      if(ech.etatEchantillon==echantillonStatus.Sent.name){
        this.severityString.push(echantillonStatus.Sent.color)
      }
      if(ech.etatEchantillon==echantillonStatus.Received.name){
        this.severityString.push(echantillonStatus.Received.color)
      }
      if(ech.etatEchantillon==echantillonStatus.ToVerifiy.name){
        this.severityString.push(echantillonStatus.ToVerifiy.color)
      }
    })
  }
  retrieveEchantillonsByBordereau(){
    this.echantillonService.retrieveEchantillonByBordereau(this.bordereau?.bordereauId!).subscribe(
      data =>{
        this.echantillons = data;
        this.updateSeverity();
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
    let date = new Date().toISOString();
    console.log(date);
    this.currentEchantillon.dateReception = new Date(date);
    console.log(this.currentEchantillon.dateReception);
    
    this.currentEchantillon.etatEchantillon = echantillonStatus.Received.name;
    this.echantillonService.updateEchantillon(this.currentEchantillon).subscribe(
      data=>{
        console.log(this.currentEchantillon);
        this.bordereauComponent.changeStatus();
        this.updateSeverity();
      }
    );
    this.receiveSampleDialog = false;
    
  }

  modalVerifySample(echantillonHtml : Echantillon){
    this.verifySampleDialog = true;
    this.currentEchantillon = echantillonHtml;
  }

  hideModalVerifySample(){
    this.verifySampleDialog = false;
    this.submitted = false
  }

  verifySample(echantillon : Echantillon){
    if(echantillon.etatEchantillon != "Received"){
      echantillon.etatEchantillon = "To Verify"
    }
      this.echantillonService.updateEchantillon(echantillon).subscribe(
        ()=>{
          console.log("echantillon :",echantillon);
          this.bordereauComponent.changeStatus();
          this.updateSeverity();
        }
      )
    
    this.verifySampleDialog = false;
    this.newEchantillon = new Echantillon()
  }

  detailEchantillon(echantillon : Echantillon){
    
      this.butonAnalyseOn=true;
      this.selectedEchantillon = echantillon;
    
  }

  

}
