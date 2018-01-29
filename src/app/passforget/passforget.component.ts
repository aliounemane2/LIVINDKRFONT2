import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-passforget',
  templateUrl: './passforget.component.html',
  styleUrls: ['./passforget.component.css']
})
export class PassforgetComponent implements OnInit {

  constructor(private router: Router) { }

  register(){
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    $(document).ready(function() {
            //Login animation to center 
            function toCenter() {
                var mainH = $("#main").outerHeight();
                var accountH = $(".account-wall").outerHeight();
                var marginT = (mainH - accountH) / 2;
                if (marginT > 30) {
                    $(".account-wall").css("margin-top", marginT - 15);
                } else {
                    $(".account-wall").css("margin-top", 30);
                }
            }
            toCenter();
            var toResize;
            $(window).resize(function(e) {
                clearTimeout(toResize);
                toResize = setTimeout(toCenter(), 500);
            });
        });
  }

}
