
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Drivers } from './drivers';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  driverList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.createDBAndTables()
    })

  }

  createDBAndTables() {
    this.sqlite.create({
      name: 'db2.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.storage = db;
      this.storage.executeSql(`CREATE TABLE IF NOT EXISTS drivertable(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        givenName TEXT,
        familyName TEXT,
        driverId TEXT,
        urlText TEXT,
        dateOfBirth TEXT,
        nationality TEXT,
        comment TEXT
    )`, []).then(() => {
        this.getDrivers();
        this.isDbReady.next(true);
      })
        .catch(e => console.log(e));
    });

  }

  async checkExistence(id){    
    let check
    await this.fetchDrivers().subscribe(async paramMap => {
     check = await paramMap.some(e => e.driverId === id)
    })   
    //console.log("existence")
    console.log(check)
    return check
  }


  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchDrivers(): Observable<Drivers[]> {
    console.log("INSIDE db_fetchDrivers")
    return this.driverList.asObservable();
  }

  getDrivers() {
    console.log("INSIDE db_GetDrivers")
    return this.storage.executeSql('SELECT * FROM drivertable', []).then(res => {
      let items: Drivers[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            givenName: res.rows.item(i).givenName,
            familyName: res.rows.item(i).familyName,
            driverId: res.rows.item(i).driverId,
            urlText: res.rows.item(i).urlText,
            dateOfBirth: res.rows.item(i).dateOfBirth,
            nationality: res.rows.item(i).nationality,
            comment: res.rows.item(i).comment
          });
        }
      }
      this.driverList.next(items);
    });
  }


  addDriver(givenName, familyName, driverId, urlText, dateOfBirth, nationality, comment) {
    console.log("INSIDE db_addDriver")
    let data = [givenName, familyName, driverId, urlText, dateOfBirth, nationality, comment];
    return this.storage.executeSql('INSERT INTO drivertable (givenName, familyName, driverId, urlText, dateOfBirth, nationality, comment) VALUES (?, ?, ?, ?, ?, ?, ?)', data)
      .then(res => {
        this.getDrivers();
      });
  }

  // Get single object
  getDriver(id): Promise<Drivers> {
    return this.storage.executeSql('SELECT * FROM drivertable WHERE id = ?', [id]).then(res => {
      return {
        id: res.rows.item(0).id,
        givenName: res.rows.item(0).givenName,
        familyName: res.rows.item(0).familyName,
        driverId: res.rows.item(0).driverId,
        urlText: res.rows.item(0).urlText,
        dateOfBirth: res.rows.item(0).dateOfBirth,
        nationality: res.rows.item(0).nationality,
        comment: res.rows.item(0).comment
      }
    });
  }

  // Update
  updateDriver(id, driver: Drivers) {
    let data = [driver.givenName, driver.familyName, driver.driverId, driver.urlText, driver.dateOfBirth, driver.nationality, driver.comment];
    return this.storage.executeSql(`UPDATE drivertable SET givenName = ?, familyName = ?, driverId = ?, urlText = ?, dateOfBirth = ?, nationality = ?, comment = ? WHERE id = ${id}`, data)
      .then(data => {
        this.getDrivers();
      })
  }

  // Delete
  deleteDriver(id) {
    console.log("INSIDE db_deleteDriver")
    return this.storage.executeSql('DELETE FROM drivertable WHERE id = ?', [id])
      .then(_ => {
        this.getDrivers();
      });
  }
}