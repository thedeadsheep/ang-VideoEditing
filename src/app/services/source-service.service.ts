import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const WEB_API: string = "http://localhost:3000/"
@Injectable({
  providedIn: 'root'
})
export class SourceServiceService {

  constructor(private http: HttpClient) { }
  uploadSource(formdata: FormData, sessionID: string) {
    console.log(sessionID)
    let sId: string
    if (sessionID == "null") {
      sId = "noneSID"
    } else {
      sId = sessionID
    }


    return this.http.post<any>(WEB_API + "multiple/" + sId, formdata);
    //return name of file on server
  }
}
