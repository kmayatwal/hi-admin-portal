import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hi-internet-offline',
  templateUrl: './hi-internet-offline.component.html',
  styleUrls: ['./hi-internet-offline.component.scss']
})
export class HiInternetOfflineComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.activeModal.close();
  }

}
