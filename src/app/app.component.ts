import { RedirectService } from './service/redirect.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template : `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  constructor(private redirect: RedirectService){
  }
  
  ngOnInit(): void {
    let that = this;
    window.addEventListener("offline",function(){
      that.redirect.redirectTologinForParam("Veuillez vous connecter à internet s'il vous plait !");
    });
  }
  title = 'app';
  solo = true;
}
