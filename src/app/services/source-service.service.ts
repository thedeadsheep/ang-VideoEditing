import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const WEB_API: string = "http://localhost:3000/"
@Injectable({
  providedIn: 'root'
})
export class SourceServiceService {

  constructor(private http: HttpClient) { }
  uploadSource(formdata: any) {
    return this.http.post<any>(WEB_API + "multiple", formdata);
    //return name of file on server
  }
}
