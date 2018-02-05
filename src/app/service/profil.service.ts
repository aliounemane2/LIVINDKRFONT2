import { Http,Headers , RequestOptions} from '@angular/http';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { user } from '../login/user';

@Injectable()
export class ProfilService {

  private url = "http://localhost:8181";
  private auth = "Authorization";
  private token : string;
  private formData: FormData = new FormData();

  constructor(private http: Http, private tokenservice: TokenService) { 
    
  }

  ModifierUtilisateur(user: user){
  let headers = new Headers({'Content-Type':'application/json','Authorization': this.tokenservice.getToken()});
  let options = new RequestOptions({headers:headers});

    return this.http.post(this.url+'/updateUser',user, options);
  }

}
