import { Component, OnInit } from '@angular/core';
import {Place} from '../institution/place';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Http, Headers,Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';




// import {institution} from '../../'

import {User} from '../classes/user';
import {UserService} from '../shared_service/user.service';
import { Institution } from '../institution/institution';
declare var $:any;


@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css']
})
export class InstitutionComponent implements OnInit {

  // private user:User; 
  valeur_souscategory : any;
  photo : any;
  allCategory: any;
  allInsterests: any;
  allTypeOffre : any;
  AllSousCategory : any;
  statusCode: number;
  idCategory : number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;


   // Create form Institution    null, adresseIns, latitudeIns,longitudeIns,nomIns,photoIns,telephoneIns,descriptionIns,solde,price,
   institutionForm = new FormGroup({
    adresseIns: new FormControl('', Validators.required),
    latitudeIns: new FormControl('', Validators.required),
    longitudeIns: new FormControl('', Validators.required),
    // longitude: new FormControl('', Validators.required),
    nomIns: new FormControl('', Validators.required),
    // photoIns: new FormControl('', Validators.required),
    telephoneIns: new FormControl('', Validators.required),
    descriptionIns: new FormControl('', Validators.required),
    solde: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    idTypeoffre: new FormControl('', Validators.required),
    idCategory: new FormControl('', Validators.required),
    idSousCategory: new FormControl('', Validators.required),
    // idUser: new FormControl('', Validators.required),
    interestIdInterest: new FormControl('', Validators.required)


});
  
  constructor(private userService : UserService, public http: Http, private router : Router) {this.valeur_souscategory=false }

  ngOnInit() {
    this.getAllCategory();
    // this.getAllCategoryBySouscategory(idCategory);
    this.getAllInterets();
    this.getAllTypesOffres();
    this.loadJquery();
    this.loadJquery2();

  }

  loadJquery(){
    $('nav#menu-right').mmenu({
			position	: 'right',
			searchfield	: true
		});
    
  }

  loadJquery2(){
    $('nav#menu-left').mmenu({
			position	: 'left',
			searchfield	: true
		});
    
  }


  loadJquery3(){

              // Menu Left
              var navMenu=$("nav#menu");
              navMenu.each(function(i) {
                  var nav=$(this), data=nav.data();
                  nav.mmenu({
                    searchfield   :  data.search ? false : true,	
                    slidingSubmenus	: true
                  }).on( "closing.mm", function(){
                    var highest=$(this).find("ul.mm-highest");
                    highest.find(".mm-subclose").trigger('click');
                    setTimeout(function () { closeSub() }, 200);
                  });
              });
  
              $(".nav-mini").on('click',function(){
                $("body").toggleClass( "in" );  	
                closeSub();
                if($(window).width() < 991 ){
                  navMenu.trigger( 'open.mm' );
                }
              });


            // Menu right
            var navRight=$('nav#menu-right');
            navRight.mmenu({
              position	: 'right',
              counters	: true,
              searchfield	: {
                add					: true,
                search				: true,
                showLinksOnly		: false,
              }
            });


            // function Auto close sub menu
            function closeSub(){
              if(navMenu.hasClass("mm-vertical")){
                navMenu.find("li").each(function(i) {
                  $(this).removeClass("mm-opened");	
                });
              }else{
                navMenu.find("ul").each(function(i) {
                  if(i==0){
                    $(this).removeClass("mm-subopened , mm-hidden").addClass("mm-current");	
                  }else{
                    $(this).removeClass("mm-opened , mm-subopened , mm-current  , mm-highest").addClass("mm-hidden");						
                  }	
                });
              }
            }

            //////////     TOGGLE  OPEN LEFT CANVAS MENU      //////////
            $("body").append('<div class="toggle-menu"/>');
            $('body').on("click",".toggle-menu",function( e ) {
                e.stopImmediatePropagation();
                e.preventDefault();
                $('nav#menu').trigger( 'open.mm' );
            });


            //////////     TOUCH TO OPEN CANVAS MENU      //////////
            $('li[data-counter-color]').each(function(i) {
              var counter=$(this).find("em.mm-counter");
              counter.css({"background-color":$.fillColor($(this)),"color":"#FFF" });
            });


            //////////     TOUCH TO OPEN CANVAS MENU      //////////
           /* var nav=document.getElementById("nav");
            if(nav){
              var wrapper= Hammer( nav );
              wrapper.on("dragright", function(event) {	// hold , tap, doubletap ,dragright ,swipe, swipeup, swipedown, swipeleft, swiperight
                if((event.gesture.deltaY<=7 && event.gesture.deltaY>=-7) && event.gesture.deltaX >100){
                  $('nav#menu').trigger( 'open.mm' );
                }
              });
              wrapper.on("dragleft", function(event) {
                if((event.gesture.deltaY<=5 && event.gesture.deltaY>=-5) && event.gesture.deltaX <-100){
                  $('nav#contact-right').trigger( 'open.mm' );
                }
              });
            }*/


  }


   // Fetch all Category
  getAllCategory() {

    this.userService.getAllCategory().subscribe(
        data => {
          this.allCategory = data.category;
          console.log(this.allCategory);
          },
        errorCode => {
          this.statusCode = errorCode
          }
      );
  } 


  getAllInterets(){

      this.userService.getAllInterets().subscribe(
        data => {
          this.allInsterests = data.interests;
          console.log(this.getAllInterets);
          },
        errorCode => {
          this.statusCode = errorCode
          }
      );

  }


  getAllTypesOffres(){

    this.userService.getAllTypesOffres().subscribe(
      data => {
        this.allTypeOffre = data.offres;
        console.log(this.getAllTypesOffres);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );

    
  }
  getAllCategoryBySouscategory(idCategory) {

    this.userService.getAllCategoryBySouscategory(idCategory).subscribe(
      data => {
        this.AllSousCategory = data.sous_category;
        
        if (this.AllSousCategory==null){
          this.valeur_souscategory=false;
        }else{
          this.valeur_souscategory=true;
        }
        console.log(this.AllSousCategory);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
  } 



  onInstitutionFormSubmit() {
    this.processValidation = true; 
    
    

    /*if (this.evenementForm.invalid) {
        console.log("okkk no");
         return; //Validation failed, exit from method.
    } */ 
    //Form is valid, now perform create or update
      this.preProcessConfigurations();
      
      
      
      
      
      /*
      
      let adresseIns = this.institutionForm.get('adresse').value.trim();
      let latitudeIns = this.institutionForm.get('latitude').value.trim();
      let longitudeIns = this.institutionForm.get('longitude').value.trim();
      let nomIns = this.institutionForm.get('nom').value.trim();
      let photoIns = this.institutionForm.get('photo').value.trim();
      let telephoneIns = this.institutionForm.get('telephone').value.trim();
      let descriptionIns = this.institutionForm.get('description').value.trim();
      let solde = this.institutionForm.get('solde').value.trim(); 
      let price = this.institutionForm.get('price').value.trim(); 
      let idTypeOffre = this.institutionForm.get('idTypeOffre').value.trim();  
      let idCategory = this.institutionForm.get('idCategory').value.trim();  
      let idSousCategory = this.institutionForm.get('idSousCategory').value.trim();  
      let interestIdInterest = this.institutionForm.get('interest').value.trim(); 
      
      */ 

      var json = this.institutionForm.value;
 
      let adresseIns = json.adresseIns;
      let latitudeIns = +json.latitudeIns;
      let longitudeIns = +json.longitudeIns;
      let nomIns = json.nomIns;
      // let photoIns = json.photoIns;
      let telephoneIns = +json.telephoneIns;
      let descriptionIns = json.descriptionIns;
      let solde = json.solde;
      let price = json.price;
      let idTypeoffre = +json.idTypeoffre;
      let idCategory = +json.idCategory;
      let idSousCategory = +json.idSousCategory;
      
      /*if (idCategory){
        idSousCategory = null;
      }*/
      if (idSousCategory==0){
        idSousCategory = null;
      }

      let interestIdInterest = +json.interestIdInterest;
      console.log(" adresseIns ");
      console.log(adresseIns);

      

      
      /*

      idTypeoffre: new FormControl('', Validators.required),
    idCategory: new FormControl('', Validators.required),
    idSousCategory: new FormControl('', Validators.required),
    // idUser: new FormControl('', Validators.required),
    interestIdInterest: new FormControl('', Validators.required)

    */ 

 
      //Handle create article





      let institution = new Institution(null, adresseIns, latitudeIns,longitudeIns,nomIns,this.photo,telephoneIns,descriptionIns,solde,price,idCategory,idSousCategory,idTypeoffre,4,interestIdInterest);
      console.log(institution);
      console.log("TEST VALEUR DE SOUS CATEGORIE ");

      // idTypeoffre, idCategory, idSousCategory, idUser, interestIdInterest

      /*
      if(!this.institutionForm.valid) {
        console.log("okkk no "+this.institutionForm.valid);
        console.log(" BAKHOUL ");
        console.log(institution);
        return; //Validation failed, exit from method.
      }
      */
      
      this.userService.createInstitution(institution)
        .subscribe(successCode => {
                this.statusCode = successCode;
                console.log(successCode);
                this.router.navigateByUrl('/dashboard');

          },
            errorCode => this.statusCode = errorCode);
            
            
    
   }
 
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
    this.requestProcessing = true;  
   }
   //Go back from update to create
   backToCreateArticle() {
      this.articleIdToUpdate = null;
      this.institutionForm.reset();  
    this.processValidation = false;
   }
 
    onChange(files) {
      console.log(files);
    }



    fileChange(event) {
      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        let file: File = fileList[0];
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
        //headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.post(this.userService.URL_PHOTO, formData, options)
          .map(res => res.json())  
          .catch(error => Observable.throw(JSON.parse(JSON.stringify(error))))
          .subscribe(
          data => {
            console.log(data);
            this.photo = data.message;

            },
          error => console.log(error)
          )
      }
    }


}
