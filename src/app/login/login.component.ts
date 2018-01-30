import { CustomOption } from './../service/CustomOption';
import { TokenService } from './../service/token.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as $ from 'jquery';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username:string;
    password:string;
    loginOK:boolean;
    

  constructor(private router : Router, private http: HttpClient, private tokenservice: TokenService,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.loginOK = true;
    $(document).ready(function() {
      document.body.classList.add("full-lg");
            //Login animation to center 
            function toCenter() {
                var mainH = $("#main").outerHeight();
                var accountH = $(".account-wall").outerHeight();
                var marginT = (mainH - accountH) / 2;
                if (marginT > 30) {
                    $(".account-wall").css("margin-top", marginT - 80);
                } else {
                    $(".account-wall").css("margin-top", 100);
                }
            }
            toCenter();
            var toResize;
            $(window).resize(function(e) {
                clearTimeout(toResize);
                toResize = setTimeout(toCenter(), 1000);
            });

        });
  }

  getRegister(){
    this.router.navigateByUrl('/register');
  }

  activerCompte(){
    this.router.navigateByUrl('/sendemail');
  }

  authentification(){
    this.loginOK = false;
    setTimeout(()=>{    
      this.http.post('http://213.246.59.111:8080/LIVINDKR_API3/login',
      new HttpParams().set('pseudo', this.username).set('password', this.password)).subscribe(
      data => {
        
          if(data["status"] !== undefined && data["status"] === "0"){
            setTimeout(()=>{
             this.tokenservice.setToken(data["key"]);
             this.toastr.success('ok', 'Information!', CustomOption);
             location.href = "/dashboard";
            },100);
          }else{
            this.toastr.success(data["corps"], 'Information!', CustomOption);
          }
          this.loginOK = true;
      },
      error => {
        this.toastr.error('Serveur non accéssible. Veuillez reesayer.', 'Erreur!',CustomOption);
        this.loginOK = true;
      });
 },2000);
    
  }
}
