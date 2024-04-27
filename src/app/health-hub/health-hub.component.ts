import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-hub',
  templateUrl: './health-hub.component.html',
  styleUrl: './health-hub.component.scss'
})
export class HealthHubComponent implements OnInit {

  showArticleList: boolean = true;
  showPreviewArticle: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  setReadMore($event) {
    console.log('this is $event', $event);
    this.showPreviewArticle = true;
    this.showArticleList = false;
  }

}
