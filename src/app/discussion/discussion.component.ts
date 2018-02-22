import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ChatWebsocketService } from '../service/chat-websocket.service';
import { TokenService } from './../service/token.service';
import { discussion } from './discussion';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {

message:string;
idUtilisateur:number;
headers = new HttpHeaders({'Authorization':this.tokenservice.getToken()});
private serverUrl = 'http://localhost:8181/chat';
public socket = new SockJS(this.serverUrl,null,{headers:this.headers});
public stompClient = Stomp.over(this.socket);
public messages:any;
private pseudo:string;
//headers = new HttpHeaders({'Authorization':this.tokenservice.getToken()});

  constructor(private chatwebsocket: ChatWebsocketService, private tokenservice : TokenService) { }

  ngOnInit() {
     $('#loading').css('background-image',"url('assets/img/Eclipse-1s-200px.svg')");
      $('#loading').css('background-repeat',"no-repeat");
      $('#loading').css('background-position',"center");
      $('#loading1').css('opacity',"0.02");
      setTimeout(()=>{
        $('#loading').css('background-image',"");
        $('#loading').css('background-repeat',"");
        $('#loading').css('background-position',"");
        $('#loading1').css('opacity',"");
      },5000);
      this.pseudo = this.tokenservice.getPseudo();
      this.connecter();
      this.getMesMessage();
      this.idUtilisateur = +this.tokenservice.getDiscussion();
  }

  sendMessage(){
    let dis:discussion = new discussion();
    dis.corps = this.message;
    dis.idEnvoyeur.idUser = this.tokenservice.getDiscussion();
    dis.idReceveur.idUser = "61";
    this.sendMessageChat(dis);
  }

  getMesMessage(){
    this.chatwebsocket.getAllMessageByUser().subscribe(
      data => {
        this.messages = data;
      });
  }

  connecter(){
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.subscribeToChat();
    },function(erreur){
      console.log(erreur);
    });
  }

  subscribeToChat(){
    this.stompClient.subscribe("/livindkr/"+this.pseudo, (message) => {
      console.log(message.body);
      this.messages.push(JSON.parse(message.body));
      console.log("-------------Data---------------");
      console.log(this.messages);
    });
  }

  sendMessageChat(message){
    if(!this.stompClient.connected){
      this.connecter();
    }
    this.stompClient.send("/app/chat.sendMessage" , {}, JSON.stringify(message));
  }

}
