import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bordereau } from '../model/bordereau';
import { Observable } from 'rxjs';
import { apiURl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BordereauService {

  constructor(private _http : HttpClient) { }

  getBordereaux():Observable<Bordereau[]>{
    return this._http.get<Bordereau[]>(apiURl+"/bordereau/showbordereaux")
  }

  deleteBordereau(idBordereau : number):Observable<Bordereau>{
    return this._http.delete<Bordereau>(apiURl+"/bordereau/deletebordereau/"+idBordereau)
  }

  updateBordereau(bordereau : Bordereau):Observable<Bordereau>{
    return this._http.put<Bordereau>(apiURl+"/bordereau/updatebordereau",bordereau)
  }

  addBordereau(bordereau : Bordereau):Observable<Bordereau>{
    return this._http.post<Bordereau>(apiURl+"/bordereau/addbordereau",bordereau);
  }

  archiveBordereaux(bordereaux : Bordereau[]):Observable<any>{
    return this._http.put<any>(apiURl+"/bordereau/updatebord",bordereaux)
  }

  retrieveBordereauxByArchive(idArchive : number):Observable<Bordereau[]>{
    return this._http.get<Bordereau[]>(apiURl+"/bordereau/getbordereaubyarchive/"+idArchive)
  }

  exportExcel():Observable<Blob>{
    return this._http.get(apiURl+"/bordereau/exportexcelbordereau",{responseType:'blob'})
  }

  retrieveEchantillonListFromBordereau(idbordereau:number):Observable<Blob>{

    // return this.http.post(API_URL+'/echantillons/bordereau/report',listEchantillon,{responseType:'blob'});
    return this._http.get(apiURl+'/echantillon/bordereau/report/'+idbordereau,{responseType:'blob'});
  }

  retrieveBordereauByEchantillon(idEchantillon : number):Observable<Bordereau>{
    return this._http.get<Bordereau>(apiURl+'/bordereau/retrieveBordereauByEchantillon'+idEchantillon)
  }

  countToVerify():Observable<any>{
    return this._http.get(apiURl+"/bordereau/counttoverifyreceipt")
  }

  countOnHold():Observable<any>{
    return this._http.get(apiURl+"/bordereau/countonholdreceipt")
  }

  countInProgress():Observable<any>{
    return this._http.get(apiURl+"/bordereau/countinprogressreceipt")
  }

  countAnalysed():Observable<any>{
    return this._http.get(apiURl+"/bordereau/countanalysedreceipt")
  }

}
