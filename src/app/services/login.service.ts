import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { apiURl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http : HttpClient) { }

  


  getUsers():Observable<User[]>{
    return this._http.get<User[]>("http://localhost:3000/users") 
  }

  authenticate(email : string, password : string):Observable<User>{
    return this._http.post<User>(apiURl+"/v1/auth/authenticate",{email , password});
  }

  // register(email : string, password : string , firstName : string , lastName : string):Observable<User>{
  //   return this._http.post<User>(apiURl+"/v1/auth/register",{email , password, firstName ,lastName });
  // }

  register(user : User):Observable<User>{
    return this._http.post<User>(apiURl+"/v1/auth/register",user);
  }

  public getToken(): string {
    console.warn(sessionStorage.getItem('access_token'))
    return sessionStorage.getItem('access_token')!;
  }
  
}
