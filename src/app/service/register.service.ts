import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpErrorResponse, HttpHeaders,HttpRequest } from '@angular/common/http';

@Injectable()
export class RegisterService {

  file: File;
  private baseUrl:string = 'http://213.246.59.111:8080/LIVINDKR_API3';

  constructor(private http:HttpClient) { }

  Save_Inscription(file,utilisateur) {

      this.file = file;
      const userBlob = new Blob([JSON.stringify(utilisateur)],{ type: "application/json"});
      
      let formData: FormData = new FormData();
      formData.append('file', this.file);
      formData.append('user',userBlob);

      const req = new HttpRequest('POST', this.baseUrl+'/inscription', formData);
      return this.http.request(req);
    }

  Verifier_Pseudo(pseudo){
    return this.http.get(this.baseUrl+'/verifierPseudo/'+pseudo)
  }

  Verifier_Email(email,id){
    return this.http.get(this.baseUrl+'/verifierEmail/'+email+'/'+id);
  }

  Activer_Compte(code){
    return this.http.get(this.baseUrl+'/ConfirmationEmail/'+code);
  }

}
