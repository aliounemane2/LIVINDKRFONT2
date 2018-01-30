import { TokenService } from './../../service/token.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  utilisateur: any;
  urlimage : 'P:\\QualShore\\imageprofil\\';
  constructor(private tokenservice: TokenService) { }

  ngOnInit() {
    this.utilisateur = JSON.parse(this.tokenservice.getUtilisateur());
		//////////     TOGGLE  OPEN LEFT CANVAS MENU      //////////
	/*	$('body').on("click",".toggle-menu",function( e ) {
				e.stopImmediatePropagation();
				e.preventDefault();
				$('nav#menu').trigger( 'open.mm' );
		});*/
		
  }

}
