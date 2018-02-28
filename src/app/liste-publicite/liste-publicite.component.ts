import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared_service/user.service';
import { Http, Headers,Response,RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-publicite',
  templateUrl: './liste-publicite.component.html',
  styleUrls: ['./liste-publicite.component.css']
})
export class ListePubliciteComponent implements OnInit {

  PubliciteByUser: any;
  urls: any;
  statusCode: number;

  constructor(private userService : UserService, public http: Http, private router : Router) { }

  ngOnInit() {
    this.getPubliciteByUser();
  }

  getPubliciteByUser() {

    this.userService.getPubliciteByUser().subscribe(
      data => {
        
        this.PubliciteByUser = data.publicite;
        this.urls = data.urls;

        console.log(this.PubliciteByUser);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
  } 

}
