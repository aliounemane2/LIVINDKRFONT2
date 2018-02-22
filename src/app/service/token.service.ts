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
    const isAuthorized: boolean = !!localStorage.getItem('token') && !! localStorage.getItem('pseudo');
    return isAuthorized;
  }

  public setDiscussion(message){
    localStorage.setItem("discussion",message)
  }

  public getDiscussion(){
    return localStorage.getItem("discussion");
  }

  public removeDiscussion(){
    localStorage.removeItem("discussion");
  }

  public setUtilisateurTampon(user: user){
    localStorage.setItem("tampon", JSON.stringify(user));
  }

  public getPseudo(){
    return localStorage.getItem("pseudo");
  }

  public setPseudo(pseudo: string){
    localStorage.setItem("pseudo", pseudo);
  }

  public removePseudo(){
    localStorage.removeItem("pseudo");
  }

  public getUtilisateurTampon(){
    return localStorage.getItem("tampon");
  }

  public removeUtilisateurTampon(){
    localStorage.removeItem("tampon");
  }

  public removeUtilisateur(){
    localStorage.removeItem("user");
  }

  public removeToken(){
    localStorage.removeItem("token");
  }


}
