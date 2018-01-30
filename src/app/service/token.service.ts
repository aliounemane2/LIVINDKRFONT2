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

}
