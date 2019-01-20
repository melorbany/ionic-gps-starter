import { Injectable } from '@angular/core';
import {Geolocation, Diagnostic} from 'ionic-native';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController, AlertController} from "ionic-angular";

/*
  Generated class for the Location provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationProvider {

  public tracking: boolean = false;
  public watch: any;
  public latitude: number = 0;
  public longitude: number = 0;
  public updated_at : number;



  constructor(public http: Http,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController) {
    console.log('Hello Location Provider');
  }


  /**
   *
   */
  isLocationAvailable(){
    Diagnostic.isLocationEnabled()
        .then((state) => {
          if (state == true){
            // do something
          } else {
            this.openGeoSettingAlert();
          }
        }).catch(e => console.error(e));
  }

  /**
   *
   */
  getCurrentLocation(){

    let options = {
      maximumAge: 3000,
      timeout: 5000,
      enableHighAccuracy: true
    };

    Geolocation.getCurrentPosition(options).then((location) => {


      this.latitude = location.coords.latitude;
      this.longitude = location.coords.longitude;
      this.updated_at = Date.now();

      let toast = this.toastCtrl.create({
        message: 'getCurrentPosition: '+this.latitude+':'+this.longitude ,
        duration: 1500,
      });

      toast.present();


    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  /**
   *
   */
  startTracking() {

    console.log('start tacking');

    //Check for GPS location Setting.
    this.isLocationAvailable();

    this.getCurrentLocation();


    if(this.tracking && this.getStatus())
      return;

    this.tracking = true;

    let options = {
      maximumAge: 3000,
      timeout: 5000,
      enableHighAccuracy: true
    };

    this.watch = Geolocation.watchPosition(options);
    this.watch.filter((p: any) => p.code === undefined).subscribe((location) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      this.latitude = location.coords.latitude;
      this.longitude = location.coords.longitude;
      this.updated_at = new Date().getTime();
    });
  }

  /**
   *
   */
  stopTracking() {

    console.log('stopTracking');
    this.tracking = false;
    this.watch.unsubscribe();
  }


  /**
   *
   * @returns {number}
   */
  getUpdateDiff(){
    return Date.now() - this.updated_at;
  }


  /**
   *
   * @returns {boolean|number}
   */
  getStatus(){
    return  this.getUpdateDiff() < 30000 && this.latitude != 0 && this.longitude != 0;
  }



  openGeoSettingAlert() {
    let alert = this.alertCtrl.create({
      title: 'Location Settings',
      message: 'Your GPS is disabled please enable it from settings.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Go To Settings',
          handler: () => {
            Diagnostic.switchToLocationSettings();
          }
        }
      ]
    });
    alert.present();
  }


}
