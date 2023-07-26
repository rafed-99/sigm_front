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
}
