import { RegisterService } from './../service/register.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
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
  constructor(private service : RegisterService,private route: ActivatedRoute, private router: Router) { }

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
          this.router.navigateByUrl("/login");
        },
        error => {
          console.log(error);
        });
    }
    $(document).ready(function() {
      //Login animation to center 
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
          toResize = setTimeout(toCenter(), 500);
      });
  });
  }

  sendEmail(){

    if(this.email === undefined ){
      alert("Veuillez renseigner le mail");
    }else{
      this.loginOK = false;
      this.service.Verifier_Email(this.email,1).subscribe(
        data => {
          switch(data["status"]){
            case "1" : alert("Vous n'avez pas de compte ou votre est incorrecte !"); break;
            case "2" : alert("Nous n'avons pas vous envoyez le mail de validation. Veuillez reéssayer!"); break;
            case "3" : alert("le mail de validation vous a étè envoyé. Veuillez vérifier votre boite!"); break;
          }
          console.log(data);
          this.loginOK = true;
        },
        error => {
          console.log(error);
          this.loginOK = true;
        });
    }
    
  }

}
