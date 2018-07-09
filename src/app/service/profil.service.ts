import { Http,Headers , RequestOptions} from '@angular/http';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';

import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { user } from '../login/user';

@Injectable()
export class ProfilService {

  file: File;
  url = "http://192.168.1.26:8088";

  constructor(private http: HttpClient, private tokenservice: TokenService) { 
    
  }

  headers = new HttpHeaders({'Authorization':this.tokenservice.getToken()});

  ModifierUtilisateur(user: user){

    return this.http.post(this.url+'/user/updateUser',user,{
      headers: this.headers
    });
  }

  Update_Photo(file,pseudo) {

    this.file = file;
    let formData: FormData = new FormData();
    formData.append('file', this.file);

    const req = new HttpRequest('POST', this.url + '/user/updatephoto', formData, {
      params: new HttpParams().set("type", "0").set("pseudo",pseudo),
      headers: this.headers
    });
    return this.http.request(req);
  }

  getUtilisateur(pseudo) {
    return this.http.get(this.url + '/user/userConnect/' + pseudo,{
      headers: this.headers
    });
  }

  
  UpdateEmail(emailold,emailnew,pseudo) {
    return this.http.post(this.url + '/user/updateemail',
      new HttpParams().set('pseudo', pseudo)
                      .set('emailold', emailold)
                      .set('emailnew',emailnew),{
                        headers:this.headers
                      });
  }

  UpdateEmailConfirmation(code,emailold,emailnew) {
    return this.http.post(this.url + '/user/updateemailconfirmation',
      new HttpParams().set('code', code)
                      .set('emailnew',emailnew)
                      .set('emailold', emailold),
                    {
                      headers: this.headers
                    });
  }

  UpdatePassword(email, password,  oldpassword) {
    return this.http.post(
      this.url + '/user/updatePassword',
      new HttpParams().set('email', email)
        .set('oldpassword', oldpassword),
      {
        headers:this.headers
      });
  }


}
