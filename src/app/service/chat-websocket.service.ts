import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable()
export class ChatWebsocketService {

  private serverUrl = 'http://localhost:8080/chat';
  private socket = new SockJS(this.serverUrl);;
  private stompClient = Stomp.over(this.socket);
  

  constructor() { }

  connecter(){
    this.socket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(this.socket);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.subscribeToChat();
      console.log(frame);
    },function(erreur){
      console.log(erreur);
    });
  }

  subscribeToChat(){
    this.stompClient.subscribe("/livindkr/public", (message) => {
      console.log(message);
    });
  }

  sendMessage(message){
      this.stompClient.send("/app/chat.sendMessage" , {}, message);
      console.log(message);
  }

}
