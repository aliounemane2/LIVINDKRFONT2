import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DiscussionService {

  url = "http://localhost:8181";

  constructor(private http: HttpClient) { }

  mesMessages(){
    return this.http.get(this.url+'/chat/mesMessage');
  }

}
