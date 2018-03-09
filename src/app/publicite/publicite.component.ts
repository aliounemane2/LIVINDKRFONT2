import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Http, Headers,Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';


// import {institution} from '../../'

import {User} from '../classes/user';
import {UserService} from '../shared_service/user.service';
import { Institution } from '../institution/institution';
import { Publicite } from './publicite';
declare var $:any;

@Component({
  selector: 'app-publicite',
  templateUrl: './publicite.component.html',
  styleUrls: ['./publicite.component.css']
})
export class PubliciteComponent implements OnInit {

  statusCode: number;
  requestProcessing = false;
  processValidation = false;
  photo : any;


  constructor(private userService : UserService, public http: Http, private router : Router) { }

  ngOnInit() {
  }


  publiciteForm = new FormGroup({

    titrePublicite: new FormControl('', Validators.required),
    typePublicite: new FormControl('', Validators.required),
    //longitudeIns: new FormControl('', Validators.required),
    //photoPublicite: new FormControl('', Validators.required)
  });


  onPubliciteFormSubmit() {
    this.processValidation = true; 
    

    if (this.publiciteForm.invalid) {
        console.log("okkk no");
         return; //Validation failed, exit from method.
    } 
    //Form is valid, now perform create or update
      this.preProcessConfigurations();
    

      var json = this.publiciteForm.value;
 
      let titrePublicite = json.titrePublicite;
      let typePublicite = json.typePublicite;
      let date = new Date();
      let datePublicite = date.getFullYear()+ '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

      // alert(datePublicite);

      let publicite = new Publicite(null, datePublicite, titrePublicite,typePublicite,this.photo);
      console.log(publicite);
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
      
      this.userService.createPublicite(publicite)
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


   fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      let headers = new Headers();
      //headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      this.http.post(this.userService.URL_PHOTO2, formData, options)
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
