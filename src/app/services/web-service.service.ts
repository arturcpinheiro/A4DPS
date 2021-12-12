import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {

  private url = "https://ergast.com";
  private jsonExt = ".json";
  private urlDriver = "/api/f1/drivers";
  
  driverList = [];
  driverID
  constructor(private http: HttpClient) { }
  
  searchAllDrivers(): Observable<any>{      
    var completeURL = this.url + this.urlDriver  + this.jsonExt 
    return this.http.get(completeURL).pipe(map(data => data['MRData']['DriverTable']['Drivers']))
  }
  searchDriver(query) : Observable<any>{
    var completeURL = this.url + this.urlDriver + "/" + query + this.jsonExt
    return this.http.get(completeURL).pipe(map(data => data['MRData']['DriverTable']['Drivers']))
  }
  getDriverResult(driverID){
    var completeURL = this.url + this.urlDriver + "/" + driverID + "/results" + this.jsonExt; 
    return this.http.get(completeURL).pipe(map(data => data['MRData']['RaceTable']['Races']))
  }
  setId(idd){
    this.driverID = idd;
  }
  checkId(){
    return this.driverID;
  }

}
