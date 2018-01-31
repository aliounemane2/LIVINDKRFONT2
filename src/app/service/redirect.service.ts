import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class RedirectService {

  constructor(private router: Router) { }

  redirectTologin(){
    this.router.navigateByUrl('/login');
  }

  redirectTologinForParam(message){
    this.router.navigate(['/login', message]);
  }

  redirectToactiverCompte(){
    this.router.navigateByUrl('/sendemail');
  }

  redirectToRegister(){
    this.router.navigateByUrl('/register');
  }
  
  redirectToFortgetPassword(){
    this.router.navigateByUrl("/updatePassword")
  }
}
