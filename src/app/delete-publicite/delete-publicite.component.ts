import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared_service/user.service';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Institution } from '../institution/institution';
import { FormControl, FormGroup, Validators, ReactiveFormsModule,  } from '@angular/forms';
import { Publicite } from '../publicite/publicite';

@Component({
  selector: 'app-delete-publicite',
  templateUrl: './delete-publicite.component.html',
  styleUrls: ['./delete-publicite.component.css']
})
export class DeletePubliciteComponent implements OnInit {

  urls: any;
  statusCode: number;
  photo : any;
  typePublicite: any;
  idPublicite : any;
  detelePublicite : any;
  updatePublicite : any;
  datePublicite : any;



  constructor(private userService : UserService, public http: Http, private router : Router, private route: ActivatedRoute) { }

  ngOnInit() {


    this.route.params
        // .switchMap((params: Params) => this.userService.getInstitutionById(+params['id']))
        // .subscribe(institution => this.institution = institution);
        .subscribe(
          params => {
            let id = +params['id'];
            this.getPubliciteByIdUser(id);
            // this.getInstitutionById2(id);
            // Bon aussi 
    });
  }


  publiciteForm = new FormGroup({

    titrePublicite: new FormControl('', Validators.required),
    typePublicite: new FormControl('', Validators.required),
    //longitudeIns: new FormControl('', Validators.required),
    //photoPublicite: new FormControl('', Validators.required)
  });

  
 
  getPubliciteByIdUser(id) {

    this.userService.getPubliciteByIdUser(id).subscribe(
      data => {
        // this.OneInstitutionByUser = data.institution;
        this.publiciteForm.controls['titrePublicite'].setValue(data.publicite.titrePublicite);
        this.publiciteForm.controls['typePublicite'].setValue(data.publicite.typePublicite);
        this.photo = data.publicite.photoPublicite;
        this.typePublicite = data.publicite.typePublicite;
        this.idPublicite = data.publicite.idPublicite;
        this.datePublicite = data.publicite.datePublicite;
        console.log(this.idPublicite);

        console.log(data.publicite);
        //// selected.id
        this.urls = data.urls;

        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
  } 


  /* 
  getInstitutionById2(id) {

    this.userService.getInstitutionById(id).subscribe(
      data => {
        this.OneInstitutionByUser2 = data.institution;
        console.log(this.OneInstitutionByUser2);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
  } 

  
  */
  deletePubliciteByUser(idPublicite) {
    console.log(idPublicite);
    console.log("OOOOOOOO ");

    this.userService.deletePubliciteByUser(idPublicite).subscribe(
      data => {
        this.detelePublicite = data.message;
        this.router.navigateByUrl('/dashboard');

        console.log(this.detelePublicite);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
  }

  updatePubliciteByUser(){
    var json = this.publiciteForm.value;

    let titrePublicite = json.titrePublicite;
    let typePublicite = json.typePublicite;



    let publicite = new Publicite(this.idPublicite, this.datePublicite, titrePublicite, typePublicite,this.photo);
    console.log(" COOOOOLLLLLLLLL ");
    console.log(publicite);

    this.userService.updatePubliciteByUser(this.idPublicite, publicite).subscribe(
      data => {
        this.updatePublicite = data.publicite;
        this.router.navigateByUrl('/dashboard');

       console.log("BON");
        console.log(this.updatePublicite);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
    

  }
  


}
