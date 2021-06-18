import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl:'./faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scrollTop(){
    document.getElementsByTagName('mat-sidenav-content')[0].scrollTo(0, 0);
    document.getElementsByClassName('')
  }

}
