import { CustomOption } from './../service/CustomOption';
import { RegisterService } from './../service/register.service';
import { Router , ActivatedRoute, ParamMap} from '@angular/router';
import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { RedirectService } from './../service/redirect.service';
import * as $ from 'jquery';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-passforget',
  templateUrl: './passforget.component.html',
  styleUrls: ['./passforget.component.css']
})
export class PassforgetComponent implements OnInit {

    email: string;
    password: string;
    passwordconfirm:string;
    statusemail:boolean;
    loginOK:boolean;
    verifpassword:boolean;

  constructor(private redirect: RedirectService, private router: Router, private service: RegisterService,private route: ActivatedRoute,public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
      this.verifpassword = true;
      this.statusemail = true;
      this.loginOK = true;

    this.route.params.subscribe(params => 
        {
          this.email = params['email']; 
          this.password = params['password']; 
        });

        if(this.email != undefined && this.password != undefined){
            this.service.UpdatePassword(this.email,this.password,1).subscribe(
                data => {
                    if(data["corps"] === "0"){
                        this.toastr.success('Votre email est incorrecte !', 'Information!', CustomOption);
                    }else{
                        setTimeout(()=>{
                            this.toastr.success(data["status"], 'Information!', CustomOption);
                            this.register();
                        },5000);
                        
                    }
                    
                },
                error => {
                    this.toastr.error('Serveur non accéssible. Veuillez reesayer.', 'Erreur!',CustomOption);
                });
        }

    $(document).ready(function() {
            //Login animation to center 
            document.body.classList.add("full-lg");
            function toCenter() {
                var mainH = $("#main").outerHeight();
                var accountH = $(".account-wall").outerHeight();
                var marginT = (mainH - accountH) / 2;
                if (marginT > 30) {
                    $(".account-wall").css("margin-top", marginT - 80);
                } else {
                    $(".account-wall").css("margin-top", 110);
                }
            }
            toCenter();
            var toResize;
            $(window).resize(function(e) {
                clearTimeout(toResize);
                toResize = setTimeout(()=>{toCenter()}, 500);
            });
        });
  }

 register(){
    this.redirect.redirectTologin();
  }
  VerifierEmail(){
      this.service.Verifier_Email(this.email,0).subscribe(
        data => {
            console.log(data);
            this.statusemail = data["corps"]==="0" ? true : false;
        },
        error => {
          console.log(error);
        });
  }

  UpdatePassword(){
    this.loginOK = false;
    this.service.UpdatePassword(this.email,this.password,0).subscribe(
        data => {
            if(data["corps"] === "0"){
                this.toastr.success('Votre email est incorrecte !', 'Information!', CustomOption);
            }else{
                this.toastr.success(data["corps"]+" "+data["message"], 'Information!', CustomOption);
                this.email = "";
                this.password = "";
                this.passwordconfirm = "";
            }
            
            console.log(data);
            this.loginOK = true;
        },
        error => {
            this.toastr.error('Serveur non accéssible. Veuillez reesayer.', 'Erreur!',CustomOption);
            this.loginOK = true;
        });
  }

  VerifierPassword(){
    this.verifpassword = this.password !== this.passwordconfirm
                        && this.passwordconfirm != undefined 
                        && this.password != undefined ? false : true;
  }
}
