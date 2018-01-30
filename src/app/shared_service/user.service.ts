import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// import {User} from '../institution';
import { Institution } from '../institution/institution';



@Injectable()
export class UserService {

  private baseUrl:string = 'http://213.246.59.111:8080/LIVINDKR_API/';
  public URL_PHOTO = 'http://213.246.59.111:8080/LIVINDKR_API/institution/upload/';
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});

  constructor(private _http:Http) { }

  getInstitutions(){

    return this._http.get(this.baseUrl+'/institution', this.options).map((response:Response)=>response.json())
    .catch(this.errorHandler);
  }

  getInstitution(id:Number){

    return this._http.get(this.baseUrl+'/institution/'+id, this.options).map((response:Response)=>response.json())
    .catch(this.errorHandler);
  }



  createInstitution(institution:Institution){

    return this._http.post(this.baseUrl+'/institution/saveInstitution/', JSON.stringify(institution), this.options).map((response:Response)=>response.json())
    .catch(this.errorHandler);
  }

  //Fetch all Category
  getAllCategory() {
    return this._http.get(this.baseUrl+'/category/list_category')
      .map(this.extractData)
        .catch(this.handleError);

  }

    //Get Institution By User
    getInstitutionByUser(idUser:Number) {
      return this._http.get(this.baseUrl+'/institution/InstitutionByUser/'+idUser)
        .map(this.extractData)
          .catch(this.handleError);
  
    }


     //Get FindInstitutionById 
     getInstitutionById(idInstitution:Number) {
      return this._http.get(this.baseUrl+'/institution/getInstitution/'+idInstitution)
        .map(this.extractData)
          .catch(this.handleError);
  
    }



    //Delete Institution By User
    deleteInstitutionByUser(idInstitution:Number) {
      return this._http.delete(this.baseUrl+'/institution/delete_institution/'+idInstitution)
        .map(this.extractData)
          .catch(this.handleError);
  
    }



    //Update Institution By User
    updateInstitutionByUser(institution:Institution, idInstitution:Number) {
      console.log("idInstitution");
      console.log(idInstitution);
      return this._http.put(this.baseUrl+'/institution/update_institution_by_user/'+idInstitution, JSON.stringify(institution), this.options)
        .map(this.extractData)
          .catch(this.handleError);
  
    }


    //Fetch all Category By Souscategory
    getAllCategoryBySouscategory(idCategory) {
      return this._http.get(this.baseUrl+'/sous_category/list_sous_category/'+idCategory)
        .map(this.extractData)
          .catch(this.handleError);
  
    }




  // Fetch All Interests
  getAllInterets() {
    return this._http.get(this.baseUrl+'/interests/list_interests')
      .map(this.extractData)
        .catch(this.handleError);

  }

  // Fetch All Types Offres
  getAllTypesOffres() {
    return this._http.get(this.baseUrl+'/typeOffre/listTypeOffres/')
      .map(this.extractData)
        .catch(this.handleError);

  }


  getEventByUser(idUser:Number){
    return this._http.get(this.baseUrl+'/event/events_by_user/'+idUser)
    .map(this.extractData)
      .catch(this.handleError);

  }








  /*
   getAllCategory(): Observable<>
 
  getAllArticles(): Observable<Article[]> {
    return this.http.get(this.allArticlesUrl)
	.map(this.extractData)
        .catch(this.handleError);
} 
  */

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
      return body;
  }
  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

  
  errorHandler(error:Response){
    return Observable.throw(error||" SERVER ERROR ");
  }
  

}
