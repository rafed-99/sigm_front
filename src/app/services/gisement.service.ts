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
    return this._http.get<Gisement[]>(apiURl+"/gisement/showgisements")
  }

  addGisement(gisement : Gisement):Observable<Gisement>{
    return this._http.post<Gisement>(apiURl+"/gisement/addgisement",gisement)
  }

  updateGisement(gisement : Gisement):Observable<Gisement>{
    return this._http.put<Gisement>(apiURl+"/gisement/updategisement",gisement)
  }

  getGisementByID(gisementId : number): Observable<Gisement>{
    return this._http.get<Gisement>(apiURl+"/gisement/showgisements/"+gisementId)
  }

  deleteGisement(gisementId : number):Observable<Gisement>{
    return this._http.delete<Gisement>(apiURl+"/gisement/deletegisement/"+gisementId)
  }
}
