import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  userName: string = '';
  today: Date = new Date();

  constructor() { }

  ngOnInit(): void {
    this.userName = 'Alexa A.'
  }

}
