import { ProfilService } from './../../service/profil.service';
import { CustomOption } from './../../service/CustomOption';
import { TokenService } from './../../service/token.service';
import { user } from './../../login/user';
import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  utilisateur : any;
  profilOk : boolean;
  constructor(private tokenservice: TokenService, private toastr: ToastsManager,vcr: ViewContainerRef, private profil: ProfilService) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.profilOk = true;
    this.utilisateur = JSON.parse(this.tokenservice.getUtilisateur());
  }

  UpdateUser(){
    this.profilOk = false;
    this.profil.ModifierUtilisateur(this.utilisateur).subscribe(
      data => {
        console.log(data);
        this.profilOk = true;        
        this.toastr.success("ok", "Information !", CustomOption);          
      },
      erreur => {
        this.profilOk = true;                
        this.toastr.success("Erreur", "Information !", CustomOption);   
      });
  }

}
