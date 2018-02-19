import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ChatWebsocketService } from '../service/chat-websocket.service';


@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {

  constructor(private chatwebsocket: ChatWebsocketService) { }

  ngOnInit() {
    this.chatwebsocket.connecter();
  }

}
