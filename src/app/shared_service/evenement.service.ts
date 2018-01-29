import { Injectable } from '@angular/core';
import { Http, Headers,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Place } from '../evenement/place';
import { Evenement } from '../evenement/evenement';
import { InterestEvent } from '../evenement/interestEvent';
import { TokenService } from '../service/token.service';

@Injectable()
export class EvenementService {
	private BACKEND_URL = 'http://192.168.1.94:8088';
	//private BACKEND_URL = 'http://localhost:8080';
  public URL_PHOTO = 'http://192.168.1.94:8088/event/upload/';
	private headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.tokenService.getToken()});
	private options = new RequestOptions({headers: this.headers});

  constructor(public http: Http, private tokenService :TokenService) { }

  /*createEvenement(evenement) {
    let body = JSON.stringify(evenement);
    return this.http.post(this.BACKEND_URL+'/event/add_event/', body, this.options ).map((res: Response) => res.json());
  }*/

  getPlace(){
    return this.http.get(this.BACKEND_URL+'/place/list_place')
    .map((res:Response) => {
        let evenements:any = res.json();
        console.log(evenements);
        return evenements;
    });
  }

  

    private extractData(res: Response) {
      let body = res.json();
      console.log(body);
        return body;
    }
    private handleError (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.status);
    }

    //Create Evenement
    /*createEvenement(evenement: Evenement):Observable<number> {
      return this.http.post(this.BACKEND_URL+'/event/saveEvent/', evenement, this.options)
      //return this.http.post(this.BACKEND_URL+'/event/add_event/', evenement, this.options)
       .map(success => success.status)
       //.map(success => success.status)
       .catch(this.handleError);
    }*/

    createEvenement(evenement: Evenement,interestEvent: InterestEvent){
      let body= {evenement ,interestEvent}; 
      console.log(body);
      return this.http.post(this.BACKEND_URL+'/interestsEvents/saveInterestsEvents', JSON.stringify(evenement), this.options).map((response:Response)=>response.json())
      .catch(this.handleError);
    }


    //Create Interest event
    createInterestEvent(interestEvent: InterestEvent):Observable<number> {
      return this.http.post(this.BACKEND_URL+'/event/saveEvent/', interestEvent, this.options)
      //return this.http.post(this.BACKEND_URL+'/event/add_event/', evenement, this.options)
       .map(success => success.status)
       .catch(this.handleError);
    }

    //Fetch all institution by user
    getAllInstitutionByUser() {
        return this.http.get(this.BACKEND_URL+'/institution/InstitutionByUser/')
          .map(this.extractData)
            .catch(this.handleError);

    }

    //Fetch all places
    getAllPlaces() {
        return this.http.get(this.BACKEND_URL+'/place/list_place')
          .map(this.extractData)
            .catch(this.handleError);

    }

    //Fetch all places
    getAllCentre() {
        return this.http.get(this.BACKEND_URL+'/interests/list_interests')
          .map(this.extractData)
            .catch(this.handleError);

    }


    //Delete Event By User
    deleteEventByUser(idEvent:Number) {
      return this.http.delete(this.BACKEND_URL+'/event/delete_event/'+idEvent, this.options)
        .map(this.extractData)
          .catch(this.handleError);
  
    }

    getEventByUser(){
      return this.http.get(this.BACKEND_URL+'/event/events_by_user/', this.options)
      .map(this.extractData)
        .catch(this.handleError);
  
    }

    //Get Find Event ById 
    getEventById(idEvent:Number) {
      return this.http.get(this.BACKEND_URL+'/event/getEvent/'+idEvent)
        .map(this.extractData)
          .catch(this.handleError);
  
    }

    //Update Event By User
    updateEventByUser(event:Evenement, idEvent:Number) {
      return this.http.put(this.BACKEND_URL+'/event/update_events_by_user/'+idEvent, JSON.stringify(event), this.options)
        .map(this.extractData)
          .catch(this.handleError);
  
    }
  

    upload(fileToUpload: any) {
      let input = new FormData();
      input.append("file", fileToUpload);

      return this.http.post("/api/uploadFile", input); // /Utilisateurs/Mane/.m2
    }

    
}
