import { Component, OnInit } from '@angular/core';
import { Evenement } from '../evenement/evenement';
import { UserService } from '../shared_service/user.service';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { FormControl, FormGroup, Validators, ReactiveFormsModule,  } from '@angular/forms';
import {EvenementService} from '../shared_service/evenement.service'; 
import { InterestEvent } from '../evenement/interestEvent';
import { Place } from '../evenement/place';



@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit {

  deteleEvent : any;
  updateEvent: any;
  OneEventByUser: any;
  OneEventByUser2: any;
  urls: any;
  event: Evenement;
  ev:any;
  idPlace: any;
  idIns:any;
  idInterestss: any;
  photo: any;


  allPlaces;
  allCentre;
  allInst: any;


  statusCode: number;

  constructor(private evenementservice : EvenementService, public http: Http, private route: ActivatedRoute, private router: Router,private location: Location) { }

  ngOnInit() {

    this.route.params
        // .switchMap((params: Params) => this.userService.getInstitutionById(+params['id']))
        // .subscribe(institution => this.institution = institution);
        .subscribe(

          
          params => {
            let id = +params['id'];
            this.getEventId(id);
            this.getEventId2(id);
            // Bon aussi 
    });
    this.getAllPlaces();
    this.getAllInstitutionByUser();
    this.getAllCentre();
           
  }


  getEventId2(id) {

    this.evenementservice.getEventById(id).subscribe(
      data => {
        this.OneEventByUser2 = data.event;
        console.log(this.OneEventByUser2);
        console.log("COOLLLLLLL ");

        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
  } 

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


getEventId(id) {

  this.evenementservice.getEventById(id).subscribe(
    data => {
      this.OneEventByUser = data.event;
      this.evenementForm.controls['nom'].setValue(data.event.nomEvent);
      this.evenementForm.controls['desc'].setValue(data.event.descriptionEvent);
      this.evenementForm.controls['date'].setValue(data.event.dateEvent);



      //this.evenementForm.controls['heuredeb'].setValue(data.event.longitudeIns);
      //this.evenementForm.controls['heurefin'].setValue(data.event.telephoneIns);
      this.evenementForm.controls['place'].setValue(data.event.idPlace.nomPlace);
      this.idPlace=data.event.idPlace.idPlace;
      this.evenementForm.controls['ins'].setValue(data.event.idInstitution);
      this.idIns=data.event.idInstitution.idInstitution;
      console.log(" INSTITUTION  ");
      console.log(this.idIns);
      this.updateEvent = data.event.idEvent;

      this.evenementForm.controls['interet'].setValue(data.event.idInstitution.interestIdInterest);
      this.idInterestss=data.event.idInstitution.interestIdInterest.idInterest;
      console.log(" CCOOOOOOLLLLLLL INTERESTS ");
      console.log(this.idInterestss);
      this.photo=data.event.photoEvent;
      console.log(" Photo ");
      console.log(this.photo);


      this.urls = data.urls;

      console.log(this.OneEventByUser);
      },
    errorCode => {
      this.statusCode = errorCode
      }
  );
} 


  

  deleteEventByUser(idEvent) {
    this.evenementservice.deleteEventByUser(idEvent).subscribe(
      data => {
        this.deteleEvent = data.message;
        this.router.navigateByUrl('/dashboard');
        console.log(this.deteleEvent);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
  } 


  updateEventByUser(){
    
    
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

    if (!ins){
      ins = this.idIns;
    }else{
      ins = +json.ins;
    }


    if (!interet){
      interet = this.idInterestss;
    }else{
      interet = +json.interet;
    }


    if (!place){
      place = this.idPlace;
    }else{
      place = +json.place;
    }


    let evenements = new Evenement(this.updateEvent, nom, desc,date,heuredeb,heurefin,this.idPlace,ins,this.photo,interet,interet);
    let eventIntrest = new InterestEvent(null,heuredeb,heurefin,interet,null);
    // let evenement : any;
    console.log("EVENEMENT ");
    console.log(evenements);

   this.evenementservice.updateEventByUser(evenements, this.updateEvent).subscribe(
      data => {
        this.updateEvent = data.message;
        this.router.navigateByUrl('/dashboard');
        console.log(this.updateEvent);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
    
  }



  //Fetch all places
  getAllPlaces() {
    this.evenementservice.getAllPlaces()
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
    this.evenementservice.getAllCentre()
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
    this.evenementservice.getAllInstitutionByUser()
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


}
