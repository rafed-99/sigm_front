import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURl } from 'src/environments/environment';
import { Couche } from '../model/couche';

@Injectable({
  providedIn: 'root'
})
export class CoucheService {

  constructor(private _http : HttpClient) { }

  retieveCouches():Observable<Couche[]>{
    return this._http.get<Couche[]>(apiURl+"/couche/showcouches");
  }

  addCouche(couche : Couche):Observable<Couche>{
    return this._http.post(apiURl+"/couche/addcouche",couche);
  }

  updateCouche(couche : Couche):Observable<Couche>{
    return this._http.put<Couche>(apiURl+"/couche/updatecouche",couche);
  }

  deleteCouche(coucheId : number):Observable<Couche>{
    return this._http.delete<Couche>(apiURl+"/couche/deletecouche/"+coucheId)
  }

  exportExcel():Observable<Blob>{
    return this._http.get(apiURl+"/couche/exportexcelcouche",{responseType:'blob'})
  }
  // retrieveCoucheById()
}
