import { Userconnect } from './../userconnect';
import { user } from './../../login/user';
import { HeaderComponent } from './../header/header.component';
import { TokenService } from './../../service/token.service';
import { ChatWebsocketService } from './../../service/chat-websocket.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { RedirectService } from '../../service/redirect.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private tokenservice: TokenService, private redirect: RedirectService) { 
  }
    
  ngOnInit() {
    document.body.classList.remove("full-lg");
    document.body.classList.add("leftMenu");
    document.body.classList.add("nav-collapse");
    if(this.tokenservice.isAuthorized() === false){
        this.redirect.redirectTologinForParam("Veuillez vous connecter pour accéder aux ressources de l'application");
    }
  }
}
