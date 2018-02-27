import { CustomOption } from './../service/CustomOption';
import { TokenService } from './../service/token.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as $ from 'jquery';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RedirectService } from '../service/redirect.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username:string;
    password:string;
    loginOK:boolean;
    message = undefined;
    

  constructor(private route : ActivatedRoute, private http: HttpClient, private tokenservice: TokenService,public toastr: ToastsManager, vcr: ViewContainerRef, private redirect: RedirectService) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {

    this.route.params.subscribe(params => { this.message = params['message']; });
    if(this.message !== undefined){
      this.toastr.warning(this.message, "", CustomOption);
    }

    this.loginOK = true;
    $(document).ready(function() {
      document.body.classList.add("full-lg");
      document.body.classList.remove("leftMenu");
      document.body.classList.remove("nav-collapse");
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
                toResize = setTimeout(()=>toCenter(), 1000);
            });

        });
  }

  getRegister(){
    this.redirect.redirectToRegister();
  }

  activerCompte(){
    this.redirect.redirectToactiverCompte();
  }

  authentification(){
    this.loginOK = false;
    setTimeout(()=>{    
      this.http.post('http://192.168.1.94:8088/login',
      new HttpParams().set('pseudo', this.username).set('password', this.password)).subscribe(
      data => {
        
          if(data["status"] !== undefined && data["status"] === "0"){
            setTimeout(()=>{
             this.tokenservice.setToken(data["key"]);
             this.tokenservice.setPseudo(data["user"].pseudo)
            
             //this.toastr.success('ok', 'Information!', CustomOption);
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
 },1000);
    
  }
}
