import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Analyse } from '../model/analyse';
import { apiURl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {

  constructor(private _http : HttpClient) { }

  getAnalysesByEchantillon(idEchantillon : string):Observable<Analyse[]>{
    return this._http.get<Analyse[]>(apiURl + "/analyse/showanalysebyechantillon/"+idEchantillon)
  }


  updateAnalyse(analyse : Analyse):Observable<Analyse>{
    return this._http.put<Analyse>(apiURl+"/analyse/updateanalyse",analyse)
  }

  deleteAnalyse(idAnalyse : number):Observable<Analyse>{
    return this._http.delete<Analyse>(apiURl+"/analyse/deleteanalyse/"+idAnalyse)
  }

  getAnalyses():Observable<Analyse[]>{
    return this._http.get<Analyse[]>(apiURl+"/analyse/showanalyses")
  }

  addAnalyse(analyse : Analyse):Observable<Analyse>{
    return this._http.post<Analyse>(apiURl+"/analyse/addanalyse",analyse)
  }

  countNewAnalyse():Observable<any>{
    return this._http.get(apiURl+"/analyse/countnew")
  }

  countConfirmAnalyse():Observable<any>{
    return this._http.get(apiURl+"/analyse/countconfirm")
  }

  countValidAnalyse():Observable<any>{
    return this._http.get(apiURl+"/analyse/countvalid")
  }
}
