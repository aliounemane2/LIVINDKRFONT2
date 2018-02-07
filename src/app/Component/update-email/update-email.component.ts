import { RegisterService } from './../../service/register.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css']
})
export class UpdateEmailComponent implements OnInit {

  code:string;
  emailnew:string;
  emailold:string;

  constructor(private route: ActivatedRoute, private service: RegisterService) { }

  ngOnInit() {
    this.route.params.subscribe(params => 
      {
        this.code = params['code']; 
        this.emailnew = params['emailnew']; 
        this.emailold = params['emailold']; 
      }); 

      this.service.UpdateEmailConfirmation(this.code,this.emailnew,this.emailold).subscribe(
        data => {
          let status = data['body']['status'];
          console.log(data);
        },
        errors =>{
          console.log(errors);
        }
      );
  }

}
