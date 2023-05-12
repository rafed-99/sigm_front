import { Component, Inject, Input } from '@angular/core';
import { EchantillonComponent } from '../echantillon.component';
import { Echantillon } from 'src/app/model/echantillon';
import { Analyse } from 'src/app/model/analyse';

@Component({
  selector: 'app-detail-echantillon',
  templateUrl: './detail-echantillon.component.html',
  styleUrls: ['./detail-echantillon.component.scss']
})
export class DetailEchantillonComponent {

  constructor(@Inject(EchantillonComponent) private echantillonComponent :EchantillonComponent){}

  @Input()
  echantillon ?:Echantillon
  echantillons : Echantillon[] = []
  Tabindex:number=0;
  analysess : Analyse[] = []

  ngOnInit() : void {
    this.echantillons.push(this.echantillon!);
    console.log("-*-*-*-*-*-*-*-*",this.echantillon);
    
  }

  retour(){
    this.echantillonComponent.detailButton = false;
  }
  
}
