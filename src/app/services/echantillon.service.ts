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

  envoyerEchantillonList(idbordereau:number , listEchantillon:Echantillon[]):Observable<Blob>{

    // return this.http.post(API_URL+'/echantillons/bordereau/report',listEchantillon,{responseType:'blob'});
    return this._http.post(apiURl+'/echantillon/bordereau/'+idbordereau+'/report',listEchantillon,{responseType:'blob'});
  }

  exportExcel(id :number):Observable<Blob>{
    return this._http.get(apiURl+"/echantillon/exportexcelechantillon/"+id,{responseType:'blob'})
  }

  retrieveEchantillonByBordereau(id : number):Observable<Echantillon[]>{
    return this._http.get<Echantillon[]>(apiURl+"/echantillon/showechantillonbybordereau/"+id)
  }

  countToVerify():Observable<any>{
    return this._http.get<Echantillon>(apiURl+"/echantillon/counttoverify")
  }

  countReceive():Observable<any>{
    return this._http.get<Echantillon>(apiURl+"/echantillon/countreceived")
  }

  countSent():Observable<any>{
    return this._http.get<Echantillon>(apiURl+"/echantillon/countsent")
  }

  countAnalysed():Observable<any>{
    return this._http.get<Echantillon>(apiURl+"/echantillon/countanalysed")
  }

}
