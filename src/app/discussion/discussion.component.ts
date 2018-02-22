import { ChatwebsocketService } from './../service/chatwebsocket.service';
import { TokenService } from './../service/token.service';
import { ProfilService } from './../service/profil.service';
import { user } from './../login/user';
import { DiscussionService } from './../service/discussion.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {

  messages: any;
  userconnect:user = new user();
  message:string;
  
  constructor(private servicediscussion: DiscussionService, private tokenservice: TokenService, private chatservice: ChatwebsocketService) { }

  ngOnInit() {
    this.chatservice.connecter();
    this.userconnect.idUser = +this.tokenservice.getIdentification();
    //this.mesMesages();
  }

  mesMesages(){
    this.servicediscussion.mesMessages().subscribe(
      data => {
        this.messages = data;
        console.log(this.messages);
      },
      errors => {
        console.log(errors);
      }
    );
  }

  sendMessage(){
    this.chatservice.sendMessage(this.message);
  }

  addUser(){
    this.chatservice.addUser();
  }

}
