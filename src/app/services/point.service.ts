import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURl } from 'src/environments/environment';
import { Point } from '../model/point';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(private _http : HttpClient) { }

  retrievePoints():Observable<Point[]>{
    return this._http.get<Point[]>(apiURl+"/geologie/point/showpoints");
  }

  addPoint(point : Point):Observable<Point>{
    return this._http.post<Point>(apiURl+"/geologie/point/addpoint",point);
  }

  updatePoint(point : Point):Observable<Point>{
    return this._http.put<Point>(apiURl+"/geologie/point/updatepoint",point);
  }

  deletePoint(pointId : number):Observable<Point>{
    return this._http.delete<Point>(apiURl+"/geologie/point/deletepoint/"+pointId);
  }

  retrievePointsByGisement(id : number) : Observable<Point[]>{
    return this._http.get<Point[]>(apiURl+"/geologie/point/showpointsbygisement/"+id)
  }

  addPointWithAffectation(point : Point, idGisement : number):Observable<Point>{
    return this._http.post<Point>(apiURl+"/geologie/point/addaffect/"+idGisement,point);
  }

  retrievePointsById(id : number) : Observable<Point>{
    return this._http.get<Point>(apiURl+"/geologie/point/showpoint/"+id)
  }

  retrievePointByArchive(idArchive : number):Observable<Point[]>{
    return this._http.get<Point[]>(apiURl+"/geologie/point/showpointbyarchive/"+idArchive)
  }

  exportExcel(id : number):Observable<Blob>{
    return this._http.get(apiURl+"/geologie/point/exportexcelpoint/"+id,{responseType:'blob'})
  }

  countPoint():Observable<any>{
    return this._http.get<Point>(apiURl+"/geologie/point/countpoint")
  }

  countPointRedeyef():Observable<any>{
    return this._http.get<Point>(apiURl+"/geologie/point/countpointredeyef")
  }

  countPointMoulares():Observable<any>{
    return this._http.get<Point>(apiURl+"/geologie/point/countpointmoulares")
  }

  countPointMetlaoui():Observable<any>{
    return this._http.get<Point>(apiURl+"/geologie/point/countpointmetlaoui")
  }

  countPointMdhilla():Observable<any>{
    return this._http.get<Point>(apiURl+"/geologie/point/countpointmdhilla")
  }
}
