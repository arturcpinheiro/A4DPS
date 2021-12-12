import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DbService } from '../services/db.service';
import { WebServiceService } from '../services/web-service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.page.html',
  styleUrls: ['./my-list.page.scss'],
})
export class MyListPage implements OnInit {
  searchTerm: string = '';
  isLoading = false;
  results: Observable<any>;
  Data: any[] = []

  constructor(private webService: WebServiceService,
    private db: DbService,
    private toast: ToastController) { }
  ngOnInit() {

    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchDrivers().subscribe(item => {
          this.Data = item
        })
      }
    });
  }

  deleteSong(id){
    this.db.deleteDriver(id).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Driver deleted',
        duration: 2500
      });
      toast.present();      
    })
  }


  searchChanged() {
    this.isLoading = true;
    this.results = this.webService.searchDriver(this.searchTerm);
    this.isLoading = false;
  }

  

}
