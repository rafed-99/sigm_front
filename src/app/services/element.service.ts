import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Elementt } from '../model/elementt';
import { apiURl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  constructor(private _http : HttpClient) { }

  retrieveElements():Observable<Elementt[]>
  {
    return this._http.get<Elementt[]>(apiURl+"/centre/element/showelements")
  }

  addElement(element : Elementt):Observable<Elementt>{
    return this._http.post<Elementt>(apiURl+"/centre/element/addelement",element)
  }

  deleteElement(idElement : number):Observable<Elementt>{
    return this._http.delete<Elementt>(apiURl+"/centre/element/deleteelement/"+idElement)
  }

  updateElement(element : Elementt):Observable<Elementt>{
    return this._http.put<Elementt>(apiURl + "/centre/element/updateelement", element);
  }
  exportExcel():Observable<Blob>{
    return this._http.get(apiURl+"/centre/element/exportexcelelement",{responseType:'blob'})
  }
}
