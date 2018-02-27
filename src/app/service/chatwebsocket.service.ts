import { userchat } from './userchat';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable()
export class ChatwebsocketService {
cons
  socket = new SockJS('http://localhost:8080/ws');
  ws = Stomp.over(this.socket);

  constructor(private tokenservice : TokenService) { }

  connecter(){
    let that = this;
    this.ws.connect({}, 
      function(frame){
        //that.subscrite();
        console.log(frame);
      },
      function(err){
        console.log(err);
      });
  }

  subscrite(){
    this.ws.subscribe("/topic/public", (message) => {
      console.log(message);
    });
  }

  sendMessage(message){
    let u_chat = new userchat();
    u_chat.content= message;
    u_chat.sender = 'bass';
    u_chat.type = 'CHAT';
    this.ws.send("/app/chat.sendMessage" , {}, message);
  }

  addUser(){
    this.ws.send("/app/chat.addUser", {}, JSON.stringify({sender: 'bass', type: 'JOIN'}));
  }

}
