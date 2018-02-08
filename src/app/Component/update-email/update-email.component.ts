import { RegisterService } from './../../service/register.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { RedirectService} from './../../service/redirect.service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css']
})
export class UpdateEmailComponent implements OnInit {

  code:string;
  emailnew:string;
  emailold:string;

  constructor(private route: ActivatedRoute, private service: RegisterService, private redirect: RedirectService) { }

  ngOnInit() {
    this.route.params.subscribe(params => 
      {
        this.code = params['code']; 
        this.emailnew = params['emailnew']; 
        this.emailold = params['emailold']; 
      }); 

      if(this.code !== undefined && this.emailnew !== undefined && this.emailold != undefined){
        this.service.UpdateEmailConfirmation(this.code,this.emailnew,this.emailold).subscribe(
        data => {
          if(data["status"] === 0 || data["status"] === 2){
            this.redirect.redirectTologinForParam("Votre email a étè mise à jour .")
          }else{
              this.redirect.redirectTologinForParam("Erreur de mise à jour de votre email ressayer encore.")
           }
        },
        errors =>{
          this.redirect.redirectTologinForParam("Erreur de mise à jour de votre email ressayer encore.")
        }
      );
      }else{
        this.redirect.redirectTologinForParam("Les données de validations sont incorrectes. Veuillez sélectionner encore l'email de validation.");
      }
      
  }

}
