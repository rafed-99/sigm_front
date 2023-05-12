import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURl } from 'src/environments/environment';
import { Archive } from '../model/archive';


@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private _http:HttpClient) { }

  retrieveArchives():Observable<Archive[]>{
    return this._http.get<Archive[]>(apiURl+"/archive/showarchives");
  }

  saveArchive(archive : Archive):Observable<Archive>{
    return this._http.post<Archive>(apiURl+"/archive/addarchive",archive);
  }

  editArchive(archive : Archive):Observable<Archive>{
    return this._http.put<Archive>(apiURl+"/archive/updatearchive",archive);
  }

  deleteArchive(archiveId : number):Observable<Archive>{
    return this._http.delete<Archive>(apiURl+"/archive/deletearchive/"+archiveId)
  }
}
