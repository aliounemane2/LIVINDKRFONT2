import { ChatwebsocketService } from './../service/chatwebsocket.service';
import { TokenService } from './../service/token.service';
import { ProfilService } from './../service/profil.service';
import { user } from './../login/user';
import { DiscussionService } from './../service/discussion.service';
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
public socket ;
public stompClient ;
public messages:any;
private pseudo:string;
private monRole:string;
private otherPseudo: string;
private testRole:string = "SUPERADMIN";
private admins:any;
private idReceveur:number;
public discuter:string;
public sub:any;
public tabSub:any[] = [];
//headers = new HttpHeaders({'Authorization':this.tokenservice.getToken()});

  constructor(private chatwebsocket: ChatWebsocketService, private tokenservice : TokenService) { }

  ngOnInit() {
       
      this.pseudo = this.tokenservice.getPseudo();
      
      this.idUtilisateur = +this.tokenservice.getDiscussion();
      this.monRole = this.tokenservice.getRole();

      if(this.monRole === "ADMIN"){
        this.connecter(this.pseudo);
        this.getMesMessage(this.tokenservice.getDiscussion());
        this.discuter ="Discuster avec le super administrateur";
      }else{
        this.getAllAdministrateurs();
        this.discuter ="Discuster avec ...";
      }

  }

  sendMessage(){
    if(this.message !== undefined && this.message !== ""){
      let dis:discussion = new discussion();
      dis.corps = this.message;
      dis.idEnvoyeur.idUser = this.tokenservice.getDiscussion();
      dis.idReceveur.idUser = this.monRole === this.testRole ? this.idReceveur.toString() : "61";
      this.sendMessageChat(dis);
      this.message = "";
    }
    
  }

  getMesMessage(id){
    $('#loading').css('background-image',"url('assets/img/Eclipse-1s-200px.svg')");
      $('#loading').css('background-repeat',"no-repeat");
      $('#loading').css('background-position',"center");
      $('#loading1').css('opacity',"0.02");
    this.chatwebsocket.getAllMessageByUser(id).subscribe(
      data => {
        this.messages = data;
        $('#loading').css('background-image',"");
        $('#loading').css('background-repeat',"");
        $('#loading').css('background-position',"");
        $('#loading1').css('opacity',"");
        $(".chat").scrollTo = $(".chat").scrollHeight;
      });
  }

  connecter(toUser:string){
    this.socket = new SockJS(this.serverUrl,null,{headers:this.headers});
    this.stompClient = Stomp.over(this.socket);
    
    this.otherPseudo = toUser;
    let that = this;

    this.stompClient.connect({}, function(frame) {
      that.subscribeToChat(that.otherPseudo);
    },function(erreur){
      setTimeout(()=>{
        that.connecter(that.otherPseudo);
      },2000);
    });
  }

  subscribeToChat(toUser:string){
    if(this.monRole === this.testRole){
      this.pseudo = toUser;
    }
    let sub = this.stompClient.subscribe("/livindkr/"+this.pseudo, (message) => {
      this.messages.push(JSON.parse(message.body));
    }, {id : toUser});
    this.tabSub.push(sub);
  }

  sendMessageChat(message){
    this.stompClient.send("/app/chat.sendMessage" , {}, JSON.stringify(message));
  }

  connecterAvec7Admin(pseudo:string, idReceveur:number){
    this.checkSubcribe(pseudo);
    this.idReceveur = idReceveur;
    this.connecter(pseudo);
    this.getMesMessage(idReceveur);
    this.discuter ="Discuster avec l'administrateur "+pseudo;
  }

  getAllAdministrateurs(){
    this.chatwebsocket.getLesAdmin().subscribe(
    data =>{
      this.admins = data;
    },
    error =>{

    });
  }

  checkSubcribe(pseudo){
    this.tabSub.forEach(sub => {
      if (sub.id === pseudo) {
        sub.unsubscribe();
        this.tabSub.splice(sub);
      }
    });
  }

}
