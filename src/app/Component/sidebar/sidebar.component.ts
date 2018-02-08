import { RegisterService } from './../../service/register.service';
import { HeaderComponent } from './../header/header.component';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { ProfilService } from './../../service/profil.service';
import { CustomOption } from './../../service/CustomOption';
import { TokenService } from './../../service/token.service';
import { user } from './../../login/user';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { RedirectService } from '../../service/redirect.service';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [HeaderComponent, DashboardComponent],
  animations: [
    trigger('heroState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)',
        left: '-415px',
        height: '0px'
      })),
      state('active', style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)',
        left: '0',
        height: '60px'
      })),
      transition('inactive => active', animate('1000ms ease-in', keyframes([
        style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
        style({ opacity: 1, transform: 'translateY(35px)', offset: 0.5 }),
        style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
      ]))),
      transition('active => inactive', animate('1000ms ease-out', keyframes([
        style({ opacity: 0, transform: 'translateY(-55%)', offset: 0 }),
        style({ opacity: 1, transform: 'translateY(45px)', offset: 0.5 }),
        style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
      ])))
    ])
  ]
})
export class SidebarComponent implements OnInit {

  file: File;
  url: string = "http://213.246.59.111/LIVINDKR/PhotosProfil/";
  password: string;
  passwordConfirm: string;
  oldpassword : string;
  utilisateur: user = new user();
  utilisateurTest: user = new user();
  profilOk: boolean;
  message: string;
  state: string = 'inactive';
  verifpassword: boolean;
  nom: string;
  prenom: string;
  telephone: string;
  dateNaissance: string;
  emailnew: string ;
  email:string;
  statusemail : boolean;
  invalidemail : boolean;
  memeEmail : boolean;

  constructor(private service: RegisterService, private dashboard: DashboardComponent, private cheader: HeaderComponent, private redirect: RedirectService, private tokenservice: TokenService, private toastr: ToastsManager, vcr: ViewContainerRef, private profil: ProfilService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  ngOnInit() {
    this.memeEmail = false;
    this.statusemail = false;
    this.invalidemail = true;
    this.verifpassword = true;
    this.profilOk = true;
    this.message = "";
    this.state = 'inactive';
    if (this.tokenservice.isAuthorized() === false) {
      this.redirect.redirectTologinForParam("Veuillez vous connecter pour accéder aux ressources de l'application");
    } else {
      let pseudo: string = this.tokenservice.getPseudo();
      this.profil.getUtilisateur(pseudo).subscribe(
        data => {
          this.utilisateur = data["user"];
          this.tokenservice.setUtilisateur(this.utilisateur);
          this.utilisateurTest = JSON.parse(this.tokenservice.getUtilisateur());
          this.tokenservice.removeUtilisateur();
          this.ChangeDetailUser(this.utilisateur.nom, this.utilisateur.prenom,this.utilisateur.photo,this.url);
          if(this.utilisateur === null || this.utilisateur == undefined){
            this.redirect.redirectTologinForParam("Veuillez vous connecter à nouveau.");
          }
        },
        errors => {
          console.log(errors);
        }
      );
    }

    

  }

  setPhotoProfil() {
    this.getPhotoProfil(this.url);
  }

  fileChange(event) {
    console.log(event);
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) 
    {
      this.file = fileList[0];
    }
  }

  getPhotoProfil(photo){
    $(document).ready(function () {
      $(".fileinput-preview img:last-child").remove()
      $('.fileinput-preview').prepend('<img class="img img-responsive" src="'+photo+'" />');
    });
  }

  deleteImage(e){
    e.preventDefault();
    let fileList: FileList = e.target.files;
    fileList = null;
    this.file = null;  
    console.log(e);
  }

  UpdateImage(event){
    this.profilOk = false;
    if(this.file == null || this.file == undefined){
      this.messageToggle("Vous n'avez pas sélectionné d'image !");
    }else{
      this.profil.Update_Photo(this.file,this.utilisateur.pseudo).subscribe(
        data =>{
          if(data["status"] === 1){
            this.messageToggle("votre photo a étè changé.")
          }
          this.profilOk = true;
          console.log(data);
        },
        errors =>{
          this.profilOk = true;
          console.log(errors);
        }
      );
    }
  }

  UpdatePassword() {
    this.profilOk = false;
    if (this.verifpassword == false) {
      alert("Les mots de passe sont différents.");
      this.profilOk = true;
    } else {
      this.profil.UpdatePassword(this.utilisateurTest.email,this.password,0,this.oldpassword).subscribe(
        data => {
            if(data["corps"] === "0"){
                this.toastr.success('Votre email est incorrecte !', 'Information!', CustomOption);
            }else{
              if(data["corps"] == "1"){
                this.tokenservice.removeToken();
                this.tokenservice.removeUtilisateur();
                this.tokenservice.removePseudo();
                location.href = "/login/"+data["message"];
                //this.redirect.redirectTologinForParam();
              }
              if(data["corps"] == "4"){
                this.message = "Votre ancien mot de passe est incorrecte";
              }
              
              if(data["corps"] == "2"){
                this.message = "Veuillez reessayer la modification. Nous avons pas pu vous envoyer le mail de validation.";
              }
            }
            console.log(data);
            this.profilOk = true;
        },
        error => {
            this.toastr.error('Serveur non accéssible. Veuillez reesayer.', 'Erreur!',CustomOption);
            this.profilOk = true;
        });
    }
  }

  UpdateEmail() {
    this.profilOk = false;
    if(!this.statusemail || !this.memeEmail){
        this.profil.UpdateEmail(this.email, this.emailnew,this.utilisateur.pseudo).subscribe(
        data => {
          this.profilOk = true; 
          if(data["status"] === 2){
            this.messageToggle("Veuillez valider le mail de validation envoyé dans votre nouveau email");
          } else{
            this.messageToggle("Erreur de mise à jour. Veuillez reessayer !");
          }       
        },
        errors =>{
          this.messageToggle("Erreur de mise à jour. Veuillez reessayer !");
        }
      );
    }
    
  }

  Verifier_Email(){
    if(this.email !== "" && this.email !== this.emailnew){
      this.service.Verifier_Email(this.emailnew,0).subscribe(
      data => {
        this.statusemail = data["corps"]==="0" ? true : false;
        this.memeEmail = false;
      },
      error => {
        console.log(error);
      });
    }else{
      this.memeEmail = true;
      this.messageToggle("Les emails sont identiques");
      this.emailnew = "";
    }
    
  }

  Verifier_Email1(){
    if(this.email !== "" && this.email === this.emailnew){
      this.memeEmail = true;
      this.emailnew = "";
      this.messageToggle("Les emails sont identiques");
    }else{
      this.memeEmail = false;
    }
    
  }

  VerifierExiste(){
    if(this.email !== this.utilisateur.email){
      this.messageToggle("Votre email est incorrecte");
      this.email = "";
    }
    
  }

  UpdateUser() {
    if (this.utilisateur.nom === this.utilisateurTest.nom && this.utilisateur.prenom === this.utilisateurTest.prenom
      && this.utilisateur.telephone === this.utilisateurTest.telephone && this.utilisateur.dateNaissance === this.utilisateurTest.dateNaissance) {
      this.profilOk = false;
      setTimeout(() => {
        this.profilOk = true;
      }, 500);
      this.messageToggle("Aucune Modification a étè détecté sur vos données personnelles");
    } else {
      this.profilOk = false;
      this.profil.ModifierUtilisateur(this.utilisateur).subscribe(
        data => {
          console.log(data);
          let result = data["status"];
          let user = data["user"];
          if (result === 0) {
            this.profilOk = true;
            this.messageToggle("Vos données personnées ont étè modifiées");
            this.tokenservice.setUtilisateur(user);
            this.utilisateurTest = JSON.parse(this.tokenservice.getUtilisateur());
            this.tokenservice.removeUtilisateur();
            this.ChangeDetailUser(user.nom, user.prenom,this.utilisateur.photo,this.url);

            /*let dashboard = new DashboardComponent(this.tokenservice, this.redirect);
            dashboard.ngOnInit();*/
            //this.cheader.utilisateur = result.user;
            
            //this.dashboard.ngOnInit();
          } else {
            this.messageToggle("Nous avons rencontre un probléme de modification de vos données personnelles. Veuillez reessayer !");
          }
        },
        erreur => {
          this.profilOk = true;
          this.toastr.success("Erreur", "Information !", CustomOption);
        });
    }
  }

  messageToggle(message) {
    this.message = message
    this.state = 'active';
    setTimeout(() => {
      this.state = 'inactive';
    }, 5000);
  }

  ChangeDetailUser(nom, prenom,photo, url) {
    $(document).ready(function () {
      $('.nom').html(" " + nom);
      $('.prenom').html(" " + prenom);
      $('.imageProfil').attr('src', url);
    });
  }

  VerifierPassword() {
    this.verifpassword = this.password !== this.passwordConfirm
      && this.passwordConfirm != undefined
      && this.password != undefined ? false : true;
  }

}
