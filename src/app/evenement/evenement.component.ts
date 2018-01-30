/*

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


*/


import { Component, OnInit, ViewChild } from '@angular/core';
import { Place } from './place';
import { EvenementService } from '../shared_service/evenement.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Evenement } from './evenement';
import { InterestEvent } from './interestEvent';
import { Http, Headers,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import {RouterModule, Routes} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {
  @ViewChild("fileInput") fileInput;
  allPlaces;
  allCentre;
  allInst: any;
  statusCode: number;
   requestProcessing = false;
   articleIdToUpdate = null;
   processValidation = false;
   myBirtday: any;
   institu: any;
   lPlaces: any;
   valRech: any;;
   place: any;
   idPlace: number;
   photo: any;
   public currentDate:Date = new Date();

   //Create form
   evenementForm = new FormGroup({
       nom: new FormControl('', Validators.required),
       desc: new FormControl('', Validators.required),
       date: new FormControl('', Validators.required),
       heuredeb: new FormControl('', Validators.required),
       heurefin: new FormControl('', Validators.required),
       //lieu: new FormControl('', Validators.required),
       place: new FormControl('', Validators.required),
       ins: new FormControl('', Validators.required),
       interet: new FormControl('', Validators.required)
   });

  constructor(private eventService : EvenementService,public http: Http, private router: Router) {
    this.valRech = true;
    console.log(this.valRech);
  }

  ngOnInit() : void{
  	this.getAllPlaces();
    this.getAllInstitutionByUser();
    this.getAllCentre();
  }

  //Fetch all places
   getAllPlaces() {
      this.eventService.getAllPlaces()
      .subscribe(
        data => {
          this.allPlaces = data.place;
          //this.allPlaces = data;
          console.log(this.allPlaces);
          },
        errorCode => {
          this.statusCode = errorCode
          } 
      );   
   }

   //Fetch all places
   getAllCentre() {
      this.eventService.getAllCentre()
      .subscribe(
        data => {
          this.allCentre = data.interests;
          //this.allCentre = data;
          console.log(this.allCentre);
          },
        errorCode => {
          this.statusCode = errorCode
          } 
      );   
   }

   getAllInstitutionByUser() {
      this.eventService.getAllInstitutionByUser()
      .subscribe(
        data => {
          this.allInst = data.institution;
          //this.allInst = data;
          console.log(this.allInst);
            },
        errorCode => {
          this.statusCode = errorCode
          }
      );   
   }

   onEvenementFormSubmit() {
    this.processValidation = true;   
    if(!this.evenementForm.valid) {
        console.log("okkk no");
         return; //Validation failed, exit from method.
    } 

    if(this.photo == null) {
        console.log("no photo");
         return; //Validation failed, exit from method.
    }  
    //Form is valid, now perform create or update
      this.preProcessConfigurations();
      var json = this.evenementForm.value;

      let nom = json.nom;
      let desc = json.desc;
      let date =json.date;
      let heuredeb = json.heuredeb;
      let heurefin = json.heurefin;
      //let lieu = json.lieu;
      let place = +json.place;
      let ins = +json.ins;
      let interet = +json.interet;
      let evenement= new Evenement(null, nom, desc,date,heuredeb,heurefin,this.idPlace,ins,this.photo,1,4,interet);
      let eventIntrest = new InterestEvent(null,heuredeb,heurefin,interet,null);
      console.log(evenement); 
      console.log(eventIntrest); 
      /*let nom = this.evenementForm.get('nom').value.trim();
      let desc = this.evenementForm.get('desc').value.trim();
      let date = this.evenementForm.get('date').value.trim();
      let heuredeb = this.evenementForm.get('heuredeb').value.trim();
      let heurefin = this.evenementForm.get('heurefin').value.trim();
      let lieu = this.evenementForm.get('lieu').value.trim();
      let place = this.evenementForm.get('place').value.trim();
      let ins = this.evenementForm.get('ins').value.trim(); */
      //Handle create article
      
      
      this.eventService.createEvenement(evenement, eventIntrest)
        .subscribe(successCode => {
                this.statusCode = successCode;
                console.log(successCode);
                this.router.navigateByUrl('/dashboard');
            
          },
            errorCode => this.statusCode = errorCode);
     
   }

   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
    this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateArticle() {
      this.articleIdToUpdate = null;
      this.evenementForm.reset();   
    this.processValidation = false;
   }

    onChange(files) {
      console.log(files);
    }

    getItemsPlaces(ev) {
    
    // Reset items back to all of the items
    this.valRech = false;
    console.log(this.valRech);
    
    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log(val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      if(this.allPlaces != null){
        this.lPlaces = this.allPlaces.filter((item) => {
          return (item.nomPlace.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      else{
        console.log("Pas de lieu disponible");

      }
      
    }
    if (val == '' || !val){
      this.lPlaces = this.allPlaces;
    }
    console.log(this.lPlaces);
    console.log(this.allPlaces);
  }

  chooseItem(tag: any) {    
    this.place = this.allPlaces.filter((item) => {
      console.log(item.idPlace);
      this.idPlace = +item.idPlace;
      this.valRech = true;
      console.log(this.valRech);
      this.evenementForm.controls['place'].setValue(tag.nomPlace);
        return (item.nomPlace.toLowerCase().indexOf(tag.nomPlace.toLowerCase()) > -1);
      })
    //this.viewCtrl.dismiss(this.insRecherche);
  }

  addFile(): void {
  let fi = this.fileInput.nativeElement;
  if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.eventService
          .upload(fileToUpload)
          .subscribe(res => {
              console.log(res);
          });
      }
  }

  fileChange(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
          let file: File = fileList[0];
          let formData: FormData = new FormData();
          formData.append('uploadFile', file, file.name);
          let headers = new Headers();
          //headers.append('Accept', 'application/json');
          let options = new RequestOptions({ headers: headers });
          this.http.post(this.eventService.URL_PHOTO, formData, options)
            .map(res => res.json())  
            .catch(error => Observable.throw(JSON.parse(JSON.stringify(error))))
            .subscribe(
            data => {
              console.log(data);
              this.photo = data.message;

              },
            error => console.log(error)
            )
        }
      }

}

