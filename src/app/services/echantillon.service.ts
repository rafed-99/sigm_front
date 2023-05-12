import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURl } from 'src/environments/environment';
import { Echantillon } from '../model/echantillon';

@Injectable({
  providedIn: 'root'
})
export class EchantillonService {

  constructor(private _http : HttpClient) { }

  retrieveAllEchantillons():Observable<Echantillon[]>{
    return this._http.get<Echantillon[]>(apiURl+"/echantillon/showechantillons");
  }

  addEchantillonWithAffectation(echantillon : Echantillon, idGeologie : number):Observable<Echantillon>{
    return this._http.post<Echantillon>(apiURl+"/echantillon/addaffect/"+idGeologie,echantillon)
  }

  updateEchantillon(echantillon : Echantillon):Observable<Echantillon>{
    return this._http.put<Echantillon>(apiURl+"/echantillon/updateechantillon",echantillon)
  }

  deleteEchantillon(idEchantillon : number):Observable<Echantillon>{
    return this._http.delete<Echantillon>(apiURl+"/echantillon/deleteechantillon/"+idEchantillon)
  }

  addEchantillon(echantillon : Echantillon):Observable<Echantillon>{
    return this._http.post<Echantillon>(apiURl+"/echantillon/addechantillon",echantillon)
  }

  retrieveByPoint(idPoint : number):Observable<Echantillon[]>{
    return this._http.get<Echantillon[]>(apiURl+"/echantillon/showechantillonsbypoint/"+idPoint)
  }

  
}
