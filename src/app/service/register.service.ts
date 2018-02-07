import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable()
export class RegisterService {

  file: File;
  url = "http://192.168.1.130:8181";

  constructor(private http: HttpClient) { }

  Save_Inscription(file, utilisateur) {

    this.file = file;
    const userBlob = new Blob([JSON.stringify(utilisateur)], { type: "application/json" });

    let formData: FormData = new FormData();
    formData.append('file', this.file);
    formData.append('user', userBlob);

    const req = new HttpRequest('POST', this.url + '/inscription', formData, {
      params: new HttpParams().set("type", "0")
    });
    return this.http.request(req);
  }

  Update_Photo(file,pseudo) {

    this.file = file;
    let formData: FormData = new FormData();
    formData.append('file', this.file);

    const req = new HttpRequest('POST', this.url + '/updatephoto', formData, {
      params: new HttpParams().set("type", "0").set("pseudo",pseudo)
    });
    return this.http.request(req);
  }


  Verifier_Pseudo(pseudo) {
    return this.http.get(this.url + '/verifierPseudo/' + pseudo)
  }

  getUtilisateur(pseudo) {
    return this.http.get(this.url + '/userConnect/' + pseudo);
  }

  Verifier_Email(email, id) {
    return this.http.get(this.url + '/verifierEmail/' + email + '/' + id, {
      params: new HttpParams().set('type', '0')
    });
  }

  Activer_Compte(code) {
    return this.http.post(this.url + '/ConfirmationEmail',
      new HttpParams().set('code', code).set('type', '0'));
  }

  UpdateEmail(emailold,emailnew,pseudo) {
    return this.http.post(this.url + '/updateemail',
      new HttpParams().set('pseudo', pseudo)
                      .set('emailold', emailold)
                      .set('emailnew',emailnew));
  }

  UpdateEmailConfirmation(code,emailold,emailnew) {
    return this.http.post(this.url + '/updateemailconfirmation',
      new HttpParams().set('code', code)
                      .set('emailnew',emailnew)
                      .set('emailold', emailold));
  }

  UpdatePassword(email, password, id, oldpassword) {
    return this.http.post(
      this.url + '/updatePassword',
      new HttpParams().set('email', email)
        .set('password', password).set("id", id)
        .set('oldpassword', oldpassword));
  }

}
