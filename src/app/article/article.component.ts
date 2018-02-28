import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Http, Headers,Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';


import {User} from '../classes/user';
import {UserService} from '../shared_service/user.service';
import { Institution } from '../institution/institution';
import { Article } from '../article/article';
declare var $:any;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {


  statusCode: number;
  requestProcessing = false;
  processValidation = false;
  tagDecouverte : any;
  photo: any;


  constructor(private userService : UserService, public http: Http, private router : Router) { }

  ngOnInit() {
    this.getTagDecouverte();
  }


  articleForm = new FormGroup({

    contenu_article: new FormControl('', Validators.required),
    titre_article: new FormControl('', Validators.required),
    id_tag_decouverte: new FormControl('', Validators.required),
    //longitudeIns: new FormControl('', Validators.required),
    //photoPublicite: new FormControl('', Validators.required)
  });

  onArticleFormSubmit(){

    this.processValidation = true; 
    

    /*if (this.articleForm.invalid) {
        console.log("okkk no");
         return; //Validation failed, exit from method.
    } */ 
    //Form is valid, now perform create or update
      this.preProcessConfigurations();
      
      var json = this.articleForm.value;
 
      let contenu_article = json.contenu_article;
      let titre_article = json.titre_article;
      let id_tag_decouverte = +json.id_tag_decouverte;
      

      let article = new Article(null, contenu_article, new Date(),0,titre_article,1,id_tag_decouverte, this.photo);
      console.log(article);
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
      
 
      
      this.userService.createArticle(article)
        .subscribe(successCode => {
                this.statusCode = successCode;
                console.log(successCode);
                this.router.navigateByUrl('/dashboard');

          },
            errorCode => this.statusCode = errorCode);

            

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


    //Perform preliminary processing configurations
    preProcessConfigurations() {
      this.statusCode = null;
    this.requestProcessing = true;  
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
