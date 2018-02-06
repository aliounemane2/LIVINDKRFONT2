import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpErrorResponse, HttpHeaders,HttpRequest } from '@angular/common/http';

@Injectable()
export class RegisterService {

  file: File;
  url = "http://192.168.1.130:8181";
  
  constructor(private http:HttpClient) { }

  Save_Inscription(file,utilisateur) {

      this.file = file;
      const userBlob = new Blob([JSON.stringify(utilisateur)],{ type: "application/json"});
      
      let formData: FormData = new FormData();
      formData.append('file', this.file);
      formData.append('user',userBlob);

      const req = new HttpRequest('POST', this.url+'/inscription', formData,{
        params: new HttpParams().set("type","0")
      });
      return this.http.request(req);
    }

  Verifier_Pseudo(pseudo){
    return this.http.get(this.url+'/verifierPseudo/'+pseudo)
  }

  getUtilisateur(pseudo){
    return this.http.get(this.url+'/userConnect/'+pseudo);
  }

  Verifier_Email(email,id){
    return this.http.get(this.url+'/verifierEmail/'+email+'/'+id,{
      params: new HttpParams().set('type','0')
    });
  }

  Activer_Compte(code){
    return this.http.post(this.url+'/ConfirmationEmail',
    new HttpParams().set('code', code).set('type','0'));
  }

  UpdatePassword(email, password, id){
    return this.http.post(
      this.url+'/updatePassword',
      new HttpParams().set('email', email).set('password', password).set("id", id)) ;
  }

}
