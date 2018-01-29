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
    private baseUrl:string = 'http://213.246.59.111:8080/LIVINDKR_API3';


  constructor(private router : Router, private http: HttpClient, private tokenservice: TokenService,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    
   }

  ngOnInit() {
    this.loginOK = true;
    $(document).ready(function() {
            //Login animation to center 
            function toCenter() {
                var mainH = $("#main").outerHeight();
                var accountH = $(".account-wall").outerHeight();
                var marginT = (mainH - accountH) / 2;
                if (marginT > 30) {
                    $(".account-wall").css("margin-top", marginT - 15);
                } else {
                    $(".account-wall").css("margin-top", 30);
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

  getRegister(){
    this.router.navigateByUrl('/register');
  }

  activerCompte(){
    this.router.navigateByUrl('/sendemail');
  }

  authentification(){
    this.loginOK = false;
    setTimeout(()=>{    
      this.http.post(this.baseUrl+'/login',
      new HttpParams().set('pseudo', this.username).set('password', this.password)).subscribe(
      data => {
        
          if(data["status"] !== undefined && data["status"] === "0"){
             this.tokenservice.setToken(data["key"]);
			 this.router.navigateByUrl('/institution');
             // alert(this.tokenservice.getToken());
          }else{
            this.toastr.error(data["corps"], 'Information!',{showCloseButton:true,positionClass:'toast-top-center',animate:'flyLeft'});
          }
          this.loginOK = true;
      },
      error => {
        this.toastr.error(error["message"], 'Success!',{showCloseButton:true,positionClass:'toast-top-center',animate:'flyLeft'});
        this.loginOK = true;
      });
 },2000);
    
  }
}
