import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-hub',
  templateUrl: './health-hub.component.html',
  styleUrl: './health-hub.component.scss'
})
export class HealthHubComponent implements OnInit {

  showArticleList: boolean = true;
  showPreviewArticle: boolean = false;
  showCreateArticle: boolean = false;
  blogId: string = '';

  constructor() { }

  ngOnInit(): void {

  }

  setReadMore($event) {
    console.log('this is $event', $event);
    this.blogId = $event;
    this.showPreviewArticle = true;
    this.showArticleList = false;
  }

  goBack() {
    this.showPreviewArticle = false;
    this.showCreateArticle = false;
    this.showArticleList = true;
  }

  setCreateArticle() {
    this.showPreviewArticle = false;
    this.showArticleList = false;
    this.showCreateArticle = true;
  }

}
