import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { apiURl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http : HttpClient) { }

  retrieveUsers():Observable<User[]>{
    return this._http.get<User[]>(apiURl + "/admin/user/showusers")
  }

  deleteUser(id : number):Observable<User[]>{
    return this._http.delete<User[]>(apiURl + "/admin/user/deleteuser/" + id)
  }

  updateUser(user : User):Observable<User>{
    return this._http.put<User>(apiURl + "/admin/user/updateuser",user)
  }

  countAdmin():Observable<any>{
    return this._http.get(apiURl+"/admin/user/countadmin")
  }

  countGeoAdmin():Observable<any>{
    return this._http.get(apiURl+"/admin/user/countgeologyadmin")
  }

  countGeoUser():Observable<any>{
    return this._http.get(apiURl+"/admin/user/countgeologyuser")
  }

  countGeoConsult():Observable<any>{
    return this._http.get(apiURl+"/admin/user/countgeologyconsult")
  }

  countCenterAdmin():Observable<any>{
    return this._http.get(apiURl+"/admin/user/countcenteradmin")
  }

  countCenterUser():Observable<any>{
    return this._http.get(apiURl+"/admin/user/countcenteruser")
  }

  countCenterConfirm():Observable<any>{
    return this._http.get(apiURl+"/admin/user/countcenterconfirm")
  }

}
