import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// import {User} from '../institution';
import { Institution } from '../institution/institution';
import {TokenService} from '../service/token.service';
import { Publicite } from '../publicite/publicite';
import { Article } from '../article/article';



@Injectable()
export class UserService {

  private baseUrl:string = 'http://192.168.1.26:8088';
  public URL_PHOTO = 'http://192.168.1.26:8088/institution/upload/';
  public URL_PHOTO2 = 'http://192.168.1.26:8088/publicite/upload/';
  public URL_PHOTO3 = 'http://192.168.1.26:8088/articles/upload/';

  private headers = new Headers({'Content-Type':'application/json',   'Authorization': this.tokenService.getToken()
});
  private options = new RequestOptions({headers:this.headers});

  constructor(private _http:Http, private tokenService :TokenService) { }
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




  getEventsToCome(){

    return this._http.get(this.baseUrl+'/event/events_by_user_after/', this.options).map((response:Response)=>response.json())
    .catch(this.errorHandler);
  }





  // Creation d'un article
  createArticle(article:Article){

    return this._http.post(this.baseUrl+'/articles/create_articles', JSON.stringify(article), this.options).map((response:Response)=>response.json())
    .catch(this.errorHandler);
  }


// Récupérer les articles que l'utilisateur a crée
  getArticlesByUser(){

    return this._http.get(this.baseUrl+'/articles/list_articles_by_user', this.options).map((response:Response)=>response.json())
    .catch(this.errorHandler);
  }


  // Récupérer l'article que l'utilisateur a cre2e en fonction en son IDENTIFIANT
  getOneArticleByUser(id:Number){

    return this._http.get(this.baseUrl+'/articles/getArticle/'+id, this.options).map((response:Response)=>response.json())
    .catch(this.errorHandler);
  }


    //Delete Article By User
    deleteArticleyUser(idArticle:Number) {
      return this._http.delete(this.baseUrl+'/articles/delete_article/'+idArticle, this.options)
        .map(this.extractData)
          .catch(this.handleError);
  
    }



    //Update Artcile By User
    updateArticleByUser(article:Article, idArticle:Number) {
      console.log("idArticle");
      console.log(idArticle);
      return this._http.put(this.baseUrl+'/articles/update_articles/'+idArticle, JSON.stringify(article), this.options)
        .map(this.extractData)
          .catch(this.handleError);
  
    }



  //Fetch all Category
  getAllCategory() {
    return this._http.get(this.baseUrl+'/category/list_category')
      .map(this.extractData)
        .catch(this.handleError);

  }

    //Get Institution By User
    getInstitutionByUser() {
      return this._http.get(this.baseUrl+'/institution/InstitutionByUser/', this.options)
        .map(this.extractData)
          .catch(this.handleError);
  
    }


     //Get FindInstitutionById 
     getInstitutionById(idInstitution:Number) {
      return this._http.get(this.baseUrl+'/institution/getInstitution/'+idInstitution)
        .map(this.extractData)
          .catch(this.handleError);
  
    }




         //Get FindInstitutionById 
     getTagDecouvertes() {
      return this._http.get(this.baseUrl+'/tagDecouverte/list_tag_decouverte')
        .map(this.extractData)
          .catch(this.handleError);
  
    }



    //Delete Institution By User
    deleteInstitutionByUser(idInstitution:Number) {
      return this._http.delete(this.baseUrl+'/institution/delete_institution/'+idInstitution, this.options)
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


    //Update Publicite By User   
    // , this.options
    updatePubliciteByUser(idPublicite:number, publicite:Publicite) {
      return this._http.put(this.baseUrl+'/publicite/updatePublicite/'+idPublicite, JSON.stringify(publicite), this.options)
        .map(this.extractData)
          .catch(this.handleError);
  
    }



    // Create Publicite by User
    createPublicite(publicite:Publicite){

      return this._http.post(this.baseUrl+'/publicite/createPublicite', JSON.stringify(publicite), this.options).map((response:Response)=>response.json())
      .catch(this.errorHandler);
    }


    //Get Publicite By User
    getPubliciteByUser() {
      return this._http.get(this.baseUrl+'/publicite/listPublicite', this.options)
        .map(this.extractData)
          .catch(this.handleError);
  
    }




  getPubliciteByIdUser(id:Number){

    return this._http.get(this.baseUrl+'/publicite/getIdPublicite/'+id, this.options).map((response:Response)=>response.json())
    .catch(this.errorHandler);
  }



       //Delete Publicite By User
       deletePubliciteByUser(idPublicite:Number) {
        return this._http.delete(this.baseUrl+'/publicite/deletePublicite/'+idPublicite, this.options)
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


  getEventByUser(){
    return this._http.get(this.baseUrl+'/event/events_by_user/', this.options)
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
