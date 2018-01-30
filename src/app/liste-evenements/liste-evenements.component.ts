import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/shared_service/user.service';
import { Http, Headers,Response,RequestOptions } from '@angular/http';


@Component({
  selector: 'app-liste-evenements',
  templateUrl: './liste-evenements.component.html',
  styleUrls: ['./liste-evenements.component.css']
})
export class ListeEvenementsComponent implements OnInit {


  EventByUser: any;
  urls: any;
  statusCode: number;


  constructor(private userService : UserService, public http: Http) { }

  ngOnInit() {
    this.getEventByUser();
  }

  getEventByUser() {

    this.userService.getEventByUser(4).subscribe(
      data => {
        this.EventByUser = data.events;
        this.urls = data.urls;

        console.log(this.EventByUser);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
  } 

}
