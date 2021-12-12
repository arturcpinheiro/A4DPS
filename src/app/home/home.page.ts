import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  
  constructor(private router: Router) {}

  toAllDriversPage(){
    this.router.navigate(['/my-list']);
  }
  toMyListPage(){    
    this.router.navigate(['/full-driver-list']);
  }

}
