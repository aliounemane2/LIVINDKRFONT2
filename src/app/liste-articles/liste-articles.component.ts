import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared_service/user.service';
import { Http, Headers,Response,RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-articles',
  templateUrl: './liste-articles.component.html',
  styleUrls: ['./liste-articles.component.css']
})
export class ListeArticlesComponent implements OnInit {


  ArticleByUser: any;
  urls: any;
  statusCode: number;

  constructor(private userService : UserService, public http: Http, private router : Router) { }

  ngOnInit() {
    this.getArticleByUsers();
  }


  getArticleByUsers() {

    this.userService.getArticlesByUser().subscribe(
      data => {
        
        this.ArticleByUser = data.article;
        this.urls = data.urls;

        console.log(this.ArticleByUser);
        },
      errorCode => {
        this.statusCode = errorCode
        }
    );
  } 

}
