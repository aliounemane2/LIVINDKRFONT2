import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared_service/user.service';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Institution } from '../institution/institution';
import { FormControl, FormGroup, Validators, ReactiveFormsModule,  } from '@angular/forms';
import { Article } from '../article/article';

@Component({
  selector: 'app-events-to-come',
  templateUrl: './events-to-come.component.html',
  styleUrls: ['./events-to-come.component.css']
})
export class EventsToComeComponent implements OnInit {

  constructor(private userService : UserService, public http: Http, private router : Router, private route: ActivatedRoute) { }
  
  eventsToCome : any;
  urls: any;
  statusCode: number;

  // getEventsToCome

  ngOnInit() {

    this.route.params
    // .switchMap((params: Params) => this.userService.getInstitutionById(+params['id']))
    // .subscribe(institution => this.institution = institution);
    .subscribe(
      params => {
        let id = +params['id'];
        this.getEventsToCome();

        // this.getPubliciteByIdUser(id);
        // this.getInstitutionById2(id);
        // Bon aussi 
    });

  }



  getEventsToCome(){
    this.userService.getEventsToCome().subscribe(
      data => {
        this.eventsToCome = data.events;
        console.log(this.eventsToCome);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
  }



}
