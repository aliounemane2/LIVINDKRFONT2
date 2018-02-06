import { HeaderComponent } from './../header/header.component';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { ProfilService } from './../../service/profil.service';
import { CustomOption } from './../../service/CustomOption';
import { TokenService } from './../../service/token.service';
import { user } from './../../login/user';
import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { RedirectService } from '../../service/redirect.service';
import { trigger, state, style, animate,transition, keyframes} from '@angular/animations';
import * as $ from 'jquery';
import { RegisterService } from '../../service/register.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [HeaderComponent,DashboardComponent],
  animations : [
    trigger('heroState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)',
        left: '-415px',
        height: '0px'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)',
        left: '0',
        height:'60px'
      })),
      transition('inactive => active', animate('1000ms ease-in', keyframes([
        style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
        style({opacity: 1, transform: 'translateY(35px)',  offset: 0.5}),
        style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
      ]))),
      transition('active => inactive', animate('1000ms ease-out',keyframes([
        style({opacity: 0, transform: 'translateY(-55%)', offset: 0}),
        style({opacity: 1, transform: 'translateY(45px)',  offset: 0.5}),
        style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
      ])))
    ])
  ]
})
export class SidebarComponent implements OnInit {

  password : string;
  passwordConfirm : string;
  utilisateur : user = new user();
  utilisateurTest: user = new user();
  profilOk : boolean;
  message: string;
  state:string = 'inactive';
  verifpassword :boolean;

  constructor(private service: RegisterService, private dashboard: DashboardComponent, private cheader : HeaderComponent, private redirect: RedirectService, private tokenservice: TokenService, private toastr: ToastsManager,vcr: ViewContainerRef, private profil: ProfilService) {
    this.toastr.setRootViewContainerRef(vcr);
   }

   toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  ngOnInit() {
    this.verifpassword= true;
    this.profilOk = true;
    if(this.tokenservice.isAuthorized() === false){
      this.redirect.redirectTologinForParam("Veuillez vous connecter pour accéder aux ressources de l'application");
    }else{
      let pseudo:string = this.tokenservice.getPseudo();
      this.service.getUtilisateur(pseudo).subscribe(
        data => {
          this.utilisateur = data["user"];
          this.tokenservice.setUtilisateur(this.utilisateur);
          this.utilisateurTest = JSON.parse(this.tokenservice.getUtilisateur());

          this.tokenservice.removeUtilisateur();
          this.ChangeDetailUser(this.utilisateur.nom, this.utilisateur.prenom);
        },
        errors =>{
          console.log(errors);
        }
      );
      
    }
    
  }

  setPhotoProfil(){
    $(document).ready(function(){
      $('.fileinput-preview').prepend('<img class="img img-responsive" src="assets/img/avatar_defaut.png" />');
    });
  }

  UpdatePassword(){
    if(this.verifpassword == false){
      alert("Les mots de passe sont différents.");
    }else{
      alert("ok");
    }
  }

  UpdateEmail(){
    this.profilOk = false;
    this.service.UpdatePassword(this.utilisateur.email,this.password,0).subscribe(
        data => {
            if(data["corps"] === "0"){
                this.toastr.success('Votre email est incorrecte !', 'Information!', CustomOption);
            }else{
                this.message = data["message"];
            }
            this.profilOk = true;
        },
        error => {
            this.toastr.error('Serveur non accéssible. Veuillez reesayer.', 'Erreur!',CustomOption);
            this.profilOk = true;
        });
  }

  UpdateUser(){
    if(this.utilisateur.nom === this.utilisateurTest.nom && this.utilisateur.prenom === this.utilisateurTest.prenom
    && this.utilisateur.telephone === this.utilisateurTest.telephone && this.utilisateur.dateNaissance === this.utilisateurTest.dateNaissance){
      this.profilOk = false;
      setTimeout(()=>{
        this.profilOk = true;
      },500);
      this.messageToggle("Aucune Modification a étè détecté sur vos données personnelles");
    }else{
      this.profilOk = false;
      this.profil.ModifierUtilisateur(this.utilisateur).subscribe(
      data => {
        let result = JSON.parse(data["_body"]);
        if(result.status === 0){
          this.profilOk = true;     
          this.messageToggle("Vos données personnées ont étè modifiées");
          this.tokenservice.setUtilisateur(result.user);
          this.utilisateurTest = result.user;
          /*let dashboard = new DashboardComponent(this.tokenservice, this.redirect);
          dashboard.ngOnInit();*/
          //this.cheader.utilisateur = result.user;
          this.ChangeDetailUser(result.user.nom, result.user.prenom);
          //this.dashboard.ngOnInit();
        }else{
          this.messageToggle("Nous avons rencontre un probléme de modification de vos données personnelles. Veuillez reessayer !");
        }      
      },
      erreur => {
        this.profilOk = true;                
        this.toastr.success("Erreur", "Information !", CustomOption);   
      });
  }
    }
    
    messageToggle(message){
      this.message = message
        this.state = 'active';
      setTimeout(()=>{
        this.state = 'inactive';
      },5000);
    }

    ChangeDetailUser(nom,prenom){
      $(document).ready(function() {
        $('.nom').html(" "+nom);
        $('.prenom').html(" "+prenom);
      });
    }

    VerifierPassword(){
      this.verifpassword = this.password !== this.passwordConfirm
                          && this.passwordConfirm != undefined 
                          && this.password != undefined ? false : true;
    }

}
