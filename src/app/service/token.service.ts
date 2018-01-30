import { Observable } from 'rxjs/Observable';
import { user } from './../login/user';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() { }

  public setToken (token: string){
    localStorage.setItem("token",token);
  }

  public getToken(){
    return localStorage.getItem("token");
  }

  public setUtilisateur(user: user){
    localStorage.setItem("user",JSON.stringify(user));
  }

  public getUtilisateur(){
    return localStorage.getItem("user");
  }

  public isAuthorized() {
    const isAuthorized: boolean = !!localStorage.getItem('token');
    return isAuthorized;
  }
}
