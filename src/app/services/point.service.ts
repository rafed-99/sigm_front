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
    return this._http.get<Point[]>(apiURl+"/point/showpoints");
  }

  addPoint(point : Point):Observable<Point>{
    return this._http.post<Point>(apiURl+"/point/addpoint",point);
  }

  updatePoint(point : Point):Observable<Point>{
    return this._http.put<Point>(apiURl+"/point/updatepoint",point);
  }

  deletePoint(pointId : number):Observable<Point>{
    return this._http.delete<Point>(apiURl+"/point/deletepoint/"+pointId);
  }

  retrievePointsByGisement(id : number) : Observable<Point[]>{
    return this._http.get<Point[]>(apiURl+"/point/showpointsbygisement/"+id)
  }

  addPointWithAffectation(point : Point, idGisement : number):Observable<Point>{
    return this._http.post<Point>(apiURl+"/point/addaffect/"+idGisement,point);
  }

  retrievePointsById(id : number) : Observable<Point[]>{
    return this._http.get<Point[]>(apiURl+"/point/showpoint/"+id)
  }

}
