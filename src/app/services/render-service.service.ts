import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const WEB_API: string = "http://localhost:3000/"
@Injectable({
  providedIn: 'root'
})
export class RenderServiceService {

  constructor(private http: HttpClient) { }

  renderRequest(renderData: any) {
    return this.http.post(WEB_API + "", renderData);
    //if done server return link to download or watch video rendered
    //or not server will sent error
  }

}
