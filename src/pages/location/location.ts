import { Component } from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import {LocationProvider} from "../../providers/location";

/*
  Generated class for the Location page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {

  constructor(public navCtrl: NavController,
              public loadingController:LoadingController,
              public locationProvider: LocationProvider) {
  }



  ionViewWillEnter(){

      // const loading = this.loadingController.create({
      //   spinner: 'dots',
      //   content: 'Getting current location...'
      // });
      //
      //
      // if(this.locationProvider.getStatus()) {
      //   loading.dismiss();
      // }else {
      //   loading.present();
      // }

  }


  ionViewWillLoad() {
    console.log("LocationPage ionViewWillLoad");
    this.locationProvider.startTracking();
  }

  ionViewWillUnload(){
    console.log("LocationPage ionViewWillUnload");
    this.locationProvider.stopTracking();
  }

}
