import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared_service/user.service';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Institution } from '../institution/institution';
import { FormControl, FormGroup, Validators, ReactiveFormsModule,  } from '@angular/forms';
import { Article } from '../article/article';

@Component({
  selector: 'app-delete-article',
  templateUrl: './delete-article.component.html',
  styleUrls: ['./delete-article.component.css']
})
export class DeleteArticleComponent implements OnInit {

  constructor(private userService : UserService, public http: Http, private router : Router, private route: ActivatedRoute) { }

  urls: any;
  statusCode: number;
  photo : any;
  deteleArticle : any;
  typePublicite: any;
  idArticle : any;
  detelePublicite : any;
  updatePublicite : any;
  datePublicite : any;
  tagDecouverte: any;
  idTag: any;

  ngOnInit() {

    this.route.params
        // .switchMap((params: Params) => this.userService.getInstitutionById(+params['id']))
        // .subscribe(institution => this.institution = institution);
        .subscribe(
          params => {
            let id = +params['id'];
            this.getArticleByIdUser(id);
            // this.getInstitutionById2(id);
            // Bon aussi 

            this.getTagDecouverte();

    });
    
  }


  articleForm = new FormGroup({

    contenu_article: new FormControl('', Validators.required),
    titre_article: new FormControl('', Validators.required),
    id_tag_decouverte: new FormControl('', Validators.required),
    //longitudeIns: new FormControl('', Validators.required),
    //photoPublicite: new FormControl('', Validators.required)
  });


   
  getArticleByIdUser(id) {

    this.userService.getOneArticleByUser(id).subscribe(
      data => {
        // this.OneInstitutionByUser = data.institution;
        this.articleForm.controls['contenu_article'].setValue(data.article.contenuArticle);
        this.articleForm.controls['titre_article'].setValue(data.article.titreArticle);
        this.articleForm.controls['id_tag_decouverte'].setValue(data.article.idTagDecouverte);
        this.idArticle= data.article.idArticle;
        this.photo = data.article.image;
        this.idTag= data.article.idTagDecouverte;
        console.log("Trop cool");
        console.log(this.idTag);
        // this.typePublicite = data.publicite.typePublicite;
        // this.idPublicite = data.publicite.idPublicite;
        //this.datePublicite = data.publicite.datePublicite;
        //console.log(this.idPublicite);

        // console.log(data.publicite);
        //// selected.id
        this.urls = data.urls;
        console.log(data.article);

        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
  } 



  deleteArticleByUser(idArticle) {
    console.log(idArticle);
    console.log("OOOOOOOO ");

    this.userService.deleteArticleyUser(idArticle).subscribe(
      data => {
        this.deteleArticle = data.message;
        this.router.navigateByUrl('/dashboard');

        console.log(this.detelePublicite);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
  }



  updateArticleByUser(){
    var json = this.articleForm.value;

    let contenu_article = json.contenu_article;
    let titre_article = json.titre_article;
    let idTagDecouverte = +json.id_tag_decouverte;

    let date = new Date();
    let dateArticle = date.getFullYear()+ '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    if (!idTagDecouverte){
      idTagDecouverte = this.idTag;
    }else{
      idTagDecouverte=+json.id_tag_decouverte;
    }

    let article = new Article(this.idArticle, contenu_article, dateArticle,0, titre_article, 1,idTagDecouverte,this.photo);
    console.log(" COOOOOLLLLLLLLL ");
    console.log(article);


    console.log(article);

    this.userService.updateArticleByUser(article, this.idArticle).subscribe(
      data => {
        this.updatePublicite = data.article;
        this.router.navigateByUrl('/dashboard');

       console.log("BON");
        console.log(this.updatePublicite);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
    
    

  }



  getTagDecouverte(){

    this.userService.getTagDecouvertes().subscribe(
      data => {
        this.tagDecouverte = data.notes;
        console.log(" Tag Decouverte ");
        console.log(this.tagDecouverte);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
 
  }




}
