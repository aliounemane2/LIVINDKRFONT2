import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';


@Injectable()
export class ChatWebsocketService {

  private serverUrl = 'http://localhost:8181/chat';
  private url = 'http://localhost:8181/discussion';
    public messages:any;
  headers = new HttpHeaders({'Authorization':this.tokenservice.getToken()});  
  public socket = new SockJS(this.serverUrl,null,{headers:this.headers});
  public stompClient = Stomp.over(this.socket);

  constructor(private tokenservice : TokenService,private http: HttpClient) { }

  connecter(){
    this.stompClient.connect({}, function(frame) {
    },function(erreur){
      console.log(erreur);
    });
  }

  subscribeToChat(){
    this.stompClient.subscribe("/livindkr/public", (message) => {});
  }

  getAllMessageByUser(){
return this.http.get(this.url + '/mesMessage',{
      headers: this.headers
    });
  }

  getLesAdmin(){
    return this.http.get(this.url+'/lesAdmins',{
      headers: this.headers
    });
  }

}
