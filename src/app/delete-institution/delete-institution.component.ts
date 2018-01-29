import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared_service/user.service';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Institution } from '../institution/institution';
import { FormControl, FormGroup, Validators, ReactiveFormsModule,  } from '@angular/forms';



@Component({
  selector: 'app-delete-institution',
  templateUrl: './delete-institution.component.html',
  styleUrls: ['./delete-institution.component.css']
})
export class DeleteInstitutionComponent implements OnInit {

  deteleInstitution : any;
  idInterests : any;
  idOffres : any;
  idCategories : any;
  idSousCategories : any;
  photo : any;



  updateInstitution: any;
  OneInstitutionByUser: any;
  OneInstitutionByUser2: any;
  urls: any;
  institution: Institution;
  ins:any;

  allCategory: any;
  allInsterests: any;
  allTypeOffre : any;
  AllSousCategory : any;
  statusCode: number;
  idCategory : number;
  valeur_souscategory : any;




  constructor(private userService : UserService, public http: Http, private route: ActivatedRoute, private router: Router,private location: Location) { }

  ngOnInit() {
    // this.getInstitutionById();
    this.getAllInterets();
    this.getAllCategory();
    this.getAllTypesOffres();


    this.route.params
        // .switchMap((params: Params) => this.userService.getInstitutionById(+params['id']))
        // .subscribe(institution => this.institution = institution);
        .subscribe(

          
          params => {
            let id = +params['id'];
            this.getInstitutionById(id);
            this.getInstitutionById2(id);
            // Bon aussi 
    });
  }


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
    // interestIdInterest: new FormControl('', Validators.required)
    interestIdInterest: new FormControl('', Validators.required)


});

  
  
  getInstitutionById(id) {

    this.userService.getInstitutionById(id).subscribe(
      data => {
        this.OneInstitutionByUser = data.institution;
        this.institutionForm.controls['nomIns'].setValue(data.institution.nomIns);
        this.institutionForm.controls['adresseIns'].setValue(data.institution.adresseIns);

        this.institutionForm.controls['latitudeIns'].setValue(data.institution.latitudeIns);
        this.institutionForm.controls['longitudeIns'].setValue(data.institution.longitudeIns);
        this.institutionForm.controls['telephoneIns'].setValue(data.institution.telephoneIns);
        this.institutionForm.controls['descriptionIns'].setValue(data.institution.descriptionIns);
        this.institutionForm.controls['solde'].setValue(data.institution.solde);
        this.institutionForm.controls['price'].setValue(data.institution.price);
        // this.institutionForm.controls['idTypeoffre'].setValue(data.institution.idTypeoffre);
        this.institutionForm.controls['idTypeoffre'].setValue(data.institution.idTypeoffre);
        this.idOffres=data.institution.idTypeoffre.idTypeOffre;

        console.log("COOL  3333 ");
        this.institutionForm.controls['idCategory'].setValue(data.institution.idCategory);
        this.idCategories=data.institution.idCategory.idCategory;
        this.institutionForm.controls['idSousCategory'].setValue(data.institution.idSousCategory);
        this.idSousCategories=data.institution.idSousCategory.idSousCategory;
        this.institutionForm.controls['interestIdInterest'].setValue(data.institution.interestIdInterest);
        this.idInterests=data.institution.interestIdInterest.idInterest;
        this.photo= data.institution.photoIns;
        this.updateInstitution=data.institution.idInstitution;

        console.log(" PHOTO ");
        console.log(this.updateInstitution);

        //// selected.id

        this.urls = data.urls;

        console.log(this.OneInstitutionByUser);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
  } 

  getInstitutionById2(id) {

    this.userService.getInstitutionById(id).subscribe(
      data => {
        this.OneInstitutionByUser2 = data.institution;
        console.log(this.OneInstitutionByUser2);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
  } 

  

  deleteInstitutionByUser(idInstitution) {
    console.log(idInstitution);
    console.log("OOOOOOOO ");

    this.userService.deleteInstitutionByUser(idInstitution).subscribe(
      data => {
        this.deteleInstitution = data.message;
        this.router.navigateByUrl('/dashboard');

        console.log(this.deteleInstitution);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
  } 


  updateInstitutionByUser(){


    var json = this.institutionForm.value;
    // let idInstitution = json.idInstitution;

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
    

    let interestIdInterest = +json.interestIdInterest;
    console.log("ID INTERETS "); 
    console.log(this.idInterests);  

    if (!interestIdInterest){
        interestIdInterest = this.idInterests;
    }else{
      interestIdInterest=+json.interestIdInterest;
    }


    if (!idTypeoffre){
      idTypeoffre = this.idOffres;
    }else{
      idTypeoffre=+json.idTypeoffre;
    }


    if (!idCategory){
      idCategory = this.idCategories;
    }else{
      idCategory=+json.idCategory;
    }



    if (!idSousCategory){
      idSousCategory = this.idSousCategories;
    }else{
      idSousCategory=+json.idSousCategory;
    }

    let institution = new Institution(this.updateInstitution, adresseIns, latitudeIns,longitudeIns,nomIns,this.photo,telephoneIns,descriptionIns,solde,price,idCategory,idSousCategory,idTypeoffre,interestIdInterest);
    console.log(" COOOOOLLLLLLLLL ");
    console.log(institution);

    this.userService.updateInstitutionByUser(institution, institution.idInstitution).subscribe(
      data => {
        this.updateInstitution = data.institution;
       console.log("BON");
       this.router.navigateByUrl('/dashboard');

        console.log(this.updateInstitution);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
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


}


