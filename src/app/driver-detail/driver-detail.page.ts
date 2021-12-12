import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../services/db.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { WebServiceService } from '../services/web-service.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.page.html',
  styleUrls: ['./driver-detail.page.scss'],
})
export class DriverDetailPage implements OnInit {
  mainForm: FormGroup;  
  driver
  hasId = false;

  constructor(private navCtrl: NavController,
    private activated_router: ActivatedRoute,
    private db: DbService,
    private web: WebServiceService,
    public formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastController) { }

  ngOnInit() {
    if(this.mainForm){
      this.mainForm.reset();
    }
    this.activated_router.paramMap.subscribe(paramMap => {
      this.driver = paramMap['params']
      if(paramMap.has('id')){
        this.hasId = true;
      }
      if(paramMap.has('urlText'))
      {
        this.mainForm = this.formBuilder.group({        
          givenName: this.driver.givenName,
          familyName: this.driver.familyName,
          driverId: this.driver.driverId,
          urlText: this.driver.urlText,
          dateOfBirth: this.driver.dateOfBirth,
          nationality: this.driver.nationality,
          comment: this.driver.comment
        })
      }else{
        this.mainForm = this.formBuilder.group({        
          givenName: this.driver.givenName,
          familyName: this.driver.familyName,
          driverId: this.driver.driverId,
          urlText: this.driver.url,
          dateOfBirth: this.driver.dateOfBirth,
          nationality: this.driver.nationality,
          comment: this.driver.comment
        })
      }      
    })
  }

  async storeData() {
      let check = await this.db.checkExistence(this.mainForm.value.driverId)
      if (check) {
        //Toast
        console.log("INSIDE storeData if")
        console.log("INSIDE Toast")
        let toast = await this.toast.create({
          message: 'Driver Already in List',
          duration: 2500
        });
        toast.present();      
      }else{
        var com;
        if(this.mainForm.value.comment == null){
          com = '';
        }else{
          com = this.mainForm.value.comment
        }
        console.log("INSIDE storeData Else")
        await this.db.addDriver(
          this.mainForm.value.givenName,
          this.mainForm.value.familyName,
          this.mainForm.value.driverId,
          this.mainForm.value.urlText,
          this.mainForm.value.dateOfBirth,
          this.mainForm.value.nationality,
          com
        ).then((res) => {
         this.router.navigate(['/my-list']);  
          //this.mainForm.reset();
        })
      }
        
  }
  updateData() {
    console.log("INSIDE updateData")
    this.db.updateDriver(this.driver.id, this.mainForm.value)  
    this.router.navigate(['/my-list']);  
  }

  results() {
    this.web.setId(this.driver.driverId);
    this.router.navigate(['/driver-result']);    
  }

  redirect() {

  }
}
