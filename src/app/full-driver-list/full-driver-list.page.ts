import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WebServiceService } from '../services/web-service.service';

@Component({
  selector: 'app-full-driver-list',
  templateUrl: './full-driver-list.page.html',
  styleUrls: ['./full-driver-list.page.scss'],
})
export class FullDriverListPage implements OnInit {
  results: Observable<any> 
 // results
  constructor(private webService: WebServiceService) { }

  ngOnInit() {    
      this.results = this.webService.searchAllDrivers();
     // console.log(this.results)
      //console.log("sss")
  }
}
