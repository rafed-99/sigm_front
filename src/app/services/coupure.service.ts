import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURl } from 'src/environments/environment';
import { Coupure } from '../model/coupure';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoupureService {

  constructor(private _http : HttpClient) { }

  retrieveCoupures():Observable<Coupure[]>{
    return this._http.get<Coupure[]>(apiURl+"/coupure/showcoupures")
  }
}
