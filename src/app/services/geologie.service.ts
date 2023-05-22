import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURl } from 'src/environments/environment';
import { Geologie } from '../model/geologie';

@Injectable({
  providedIn: 'root'
})
export class GeologieService {

  constructor(private _http: HttpClient) { }

  showGeologies():Observable<Geologie[]>{
    return this._http.get<Geologie[]>(apiURl + "/geologie/showgeologies");
  }

  showGeologieById(id : number):Observable<Geologie>{
    return this._http.get<Geologie>(apiURl+"/showgeologie/"+id);
  }

  showGeologiesByPoint(idPoint : number):Observable<Geologie[]>{
    return this._http.get<Geologie[]>(apiURl+"/geologie/showgeologiesbypoint/"+idPoint);
  }

  addGeologie(geologie : Geologie):Observable<Geologie>{
    return this._http.post<Geologie>(apiURl+"/geologie/addgeologie",geologie)
  }

  updateGeologie(geologie : Geologie):Observable<Geologie>{
    return this._http.put<Geologie>(apiURl+"/geologie/updategeologie",geologie)
  }

  deleteGeologie(idGeologie: number):Observable<Geologie>{
    return this._http.delete<Geologie>(apiURl+"/geologie/deletegeologie/"+idGeologie)
  }
  exportExcel(id : number):Observable<Blob>{
    return this._http.get(apiURl+"/geologie/exportexcelgeologie/"+id,{responseType:'blob'})
  }
}
