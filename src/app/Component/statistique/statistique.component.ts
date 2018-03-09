import { Component, OnInit } from '@angular/core';
import { Evenement } from '../../evenement/evenement';
import { UserService } from '../../shared_service/user.service';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { FormControl, FormGroup, Validators, ReactiveFormsModule,  } from '@angular/forms';
import {EvenementService} from '../../shared_service/evenement.service'; 
import { InterestEvent } from '../../evenement/interestEvent';
import { Place } from '../../evenement/place';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

  constructor(private userService : UserService,private evenementservice : EvenementService, public http: Http, private route: ActivatedRoute, private router: Router,private location: Location) { }


  eventsToCome : any;
  urls: any;
  statusCode: number;
  OneEventByUser: any;
  OneEventByUser2: any;
  updateEvent: any;

  event: Evenement;
  ev:any;
  idPlace: any;
  idIns:any;
  idInterestss: any;
  photo: any;

  ngOnInit() {

    this.getEventsToCome();
  }


  getEventsToCome(){
    this.userService.getEventsToCome().subscribe(
      data => {
        this.eventsToCome = data.events;
        this.urls=data.urls;
        console.log(this.eventsToCome);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
  }


 





}
