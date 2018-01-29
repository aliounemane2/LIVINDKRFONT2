import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared_service/user.service';
import { Http, Headers,Response,RequestOptions } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Institution } from '../institution/institution';


@Component({
  selector: 'app-listes-institutions',
  templateUrl: './listes-institutions.component.html',
  styleUrls: ['./listes-institutions.component.css']
})
export class ListesInstitutionsComponent implements OnInit {
  
  InstitutionByUser: any;
  urls: any;
  institution1: Institution;

  statusCode: number;


  constructor(private userService : UserService, public http: Http, private router : Router) { }

  ngOnInit() {
    this.getInstitutionByUser();
    
  }

  getInstitutionByUser() {

    this.userService.getInstitutionByUser().subscribe(
      data => {
        this.InstitutionByUser = data.institution;
        this.urls = data.urls;

        console.log(this.InstitutionByUser);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
  } 



}
