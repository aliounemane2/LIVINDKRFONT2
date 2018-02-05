import { RedirectService } from './../../service/redirect.service';
import { user } from './../../login/user';
import { TokenService } from './../../service/token.service';
import { Component, OnInit ,Input } from '@angular/core';
import * as $ from 'jquery';
import { Userconnect } from '../userconnect';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private tokenservice: TokenService, private redirect : RedirectService) { }

  ngOnInit() {
		//////////     TOGGLE  OPEN LEFT CANVAS MENU      //////////
	/*	$('body').on("click",".toggle-menu",function( e ) {
				e.stopImmediatePropagation();
				e.preventDefault();
				$('nav#menu').trigger( 'open.mm' );
		});*/
		
  }

  deconnecter(){
    this.tokenservice.removeToken();
    this.tokenservice.removeUtilisateur();
    this.redirect.redirectTologin();
  }

}
