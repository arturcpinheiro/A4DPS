import { Component, OnInit } from '@angular/core';
import { WebServiceService } from '../services/web-service.service';

@Component({
  selector: 'app-driver-result',
  templateUrl: './driver-result.page.html',
  styleUrls: ['./driver-result.page.scss'],
})
export class DriverResultPage implements OnInit {

  constructor(private web: WebServiceService) { }
  DriverList
  ngOnInit() {
    this.DriverList = this.web.getDriverResult(this.web.checkId())
  }

}
