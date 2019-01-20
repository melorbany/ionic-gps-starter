import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, NavController, AlertController} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {SigninPage} from "../pages/signin/signin";
import {ClientsPage} from "../pages/clients/clients";
import {EmployeesPage} from "../pages/employees/employees";
import {HomeTabsPage} from "../pages/home-tabs/home-tabs";
import {LocationProvider} from "../providers/location";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = HomeTabsPage;
  clientsPage = ClientsPage;
  employeesPage = EmployeesPage ;

  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
              private menuCtrl: MenuController ,
              public alertController: AlertController,
              public locationProvider: LocationProvider) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log('App constructor!');
      this.locationProvider.startTracking();
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  onLoad(page: any) {
    if(page == this.clientsPage){


        if(!this.locationProvider.getStatus()){
          console.log(this.locationProvider.getStatus());
          const alert = this.alertController.create({
            message: 'Please wait while getting the current location',
            buttons: [
              {
                text: 'Close',
                role: 'cancel',
                handler: () => {
                  console.log('Close!');
                }
              }
            ]
          });

          alert.present();
          return;
        }

    }


    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }


  isAuthorized(){
    return true;//this.userService.isAuthorized();
  }

}
