import { RedirectService } from './../service/redirect.service';
import { RegisterService } from './../service/register.service';
import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CustomOption } from '../service/CustomOption';
import 'rxjs/add/operator/switchMap';
import { Route } from '@angular/router/src/config';

import * as $ from 'jquery'; 

@Component({
  selector: 'app-sendemail',
  templateUrl: './sendemail.component.html',
  styleUrls: ['./sendemail.component.css']
})
export class SendemailComponent implements OnInit {

  loginOK: boolean;
  email:string;
  code:string;
  constructor(private redirect: RedirectService, private service : RegisterService,private route: ActivatedRoute,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.loginOK = true;
    this.route.params.subscribe(params => 
        {
          this.code = params['code']; 
        });  
    if(this.code !== undefined){
      this.service.Activer_Compte(this.code).subscribe(
        data => {
          console.log(data);
          switch(data["message"]){
            case "0" : 
            this.redirect.redirectTologinForParam("Votre compte est déjà activé. Veuillez vous connecter.!");
            break;
            case "1" :
            setTimeout(()=>{
              this.toastr.warning("Vous n'avez pas de compte ou votre mail est incorrecte !","Information!", CustomOption); 
            },5000)
             break;
            case "2" : this.toastr.warning("Nous n'avons pas pu vous envoyez le mail de validation. Veuillez reéssayer!","Information!", CustomOption); break;
            case "3" : this.toastr.success("le mail de validation vous a étè envoyé. Veuillez vérifier votre boite!","Information!", CustomOption);
            break;
          }
        },
        error => {
          this.toastr.error('Serveur non accéssible. Veuillez reesayer.', 'Erreur!',CustomOption);
        });
    }
    $(document).ready(function() {
      //Login animation to center 
      document.body.classList.add("full-lg")
      function toCenter() {
          var mainH = $("#main").outerHeight();
          var accountH = $(".account-wall").outerHeight();
          var marginT = (mainH - accountH) / 2;
          if (marginT > 45) {
              $(".account-wall").css("margin-top", marginT - 120);
          } else {
              $(".account-wall").css("margin-top", 140);
          }
      }
      toCenter();
      var toResize;
      $(window).resize(function(e) {
          clearTimeout(toResize);
          toResize = setTimeout(()=>{toCenter()}, 1000);
      });
  });
  }

  sendEmail(){

    if(this.email === undefined ){
      this.toastr.info("Veuillez renseigner le mail");
    }else{
      this.loginOK = false;
      this.service.Verifier_Email(this.email,1).subscribe(
        data => {
          switch(data["corps"]){
            case "1" : this.toastr.warning("Vous n'avez pas de compte ou votre mail est incorrecte !","Information!", CustomOption); break;
            case "2" : this.toastr.warning("Nous n'avons pas pu vous envoyez le mail de validation. Veuillez reéssayer!","Information!", CustomOption); break;
            case "3" : 
            setTimeout(()=>{
              this.toastr.success("le mail de validation vous a étè envoyé. Veuillez vérifier votre boite!","Information!", CustomOption);
              this.redirect.redirectTologin();
            },5000);
            
            break;
            case "4" : 
            setTimeout(()=>{
              this.toastr.success("Votre compte est déjà activé. Veuillez vous connecter.!","Information!", CustomOption);
              this.redirect.redirectTologin();
            },5000);
            break;
          }
          this.loginOK = true;
        },
        error => {
          this.toastr.error('Serveur non accéssible. Veuillez reesayer.', 'Erreur!',CustomOption);
          this.loginOK = true;
        });
    }
    
  }

  register(){
    this.redirect.redirectToRegister();
  }

  connecter(){
    this.redirect.redirectTologin();
  }

}
