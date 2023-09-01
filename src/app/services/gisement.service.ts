import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gisement } from '../model/gisement';
import { Observable } from 'rxjs';
import { apiURl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GisementService {

  constructor(private _http:HttpClient) { }

 


  retrieveGisements():Observable<Gisement[]>
  {
    return this._http.get<Gisement[]>(apiURl+"/geologie/gisement/showgisements")
  }

  addGisement(gisement : Gisement):Observable<Gisement>{
    return this._http.post<Gisement>(apiURl+"/geologie/gisement/addgisement",gisement)
  }

  updateGisement(gisement : Gisement):Observable<Gisement>{
    return this._http.put<Gisement>(apiURl+"/geologie/gisement/updategisement",gisement)
  }

  getGisementByID(gisementId : number): Observable<Gisement>{
    return this._http.get<Gisement>(apiURl+"/geologie/gisement/showgisement/"+gisementId)
  }

  deleteGisement(gisementId : number):Observable<Gisement>{
    return this._http.delete<Gisement>(apiURl+"/geologie/gisement/deletegisement/"+gisementId)
  }

  exportExcel():Observable<Blob>{
    return this._http.get(apiURl+"/geologie/gisement/exportexcelgisements",{responseType:'blob'})
  }

  countGisementBySecteur():Observable<any>{
    return this._http.get(apiURl+"/geologie/gisement/countgisement")
  }

  countGisementByRedeyef():Observable<any>{
    return this._http.get(apiURl+"/geologie/gisement/countbyredeyef")
  }

  countGisementByMoulares():Observable<any>{
    return this._http.get(apiURl+"/geologie/gisement/countbymoulares")
  }

  countGisementByMetlaoui():Observable<any>{
    return this._http.get(apiURl+"/geologie/gisement/countbymetlaoui")
  }

  countGisementByMdhilla():Observable<any>{
    return this._http.get(apiURl+"/geologie/gisement/countbymdhilla")
  }
}
