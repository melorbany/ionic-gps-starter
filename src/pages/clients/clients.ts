import { Component } from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import {ClientsService} from "../../services/clients";
import {Client} from "../../models/client";
import {EditClientPage} from "./edit-client/edit-client";
import {ClientPage} from "./client/client";
import {LocationProvider} from "../../providers/location";

/*
  Generated class for the Clients page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html'
})
export class ClientsPage {


  clients : Client[];

  constructor(public navCtrl: NavController,
              public alertCtrl :AlertController,
              public loadingCtrl:LoadingController,
              public clientsService: ClientsService,
              public alertController: AlertController,
              public locationProvider: LocationProvider) {}



  //
  // ionViewCanEnter(): boolean{
  //   // here we can either return true or false
  //   // depending on if we want to leave this view
  //   console.log("LocationPage ionViewCanEnter");
  //
  //   if(this.locationProvider.getStatus()){
  //     return true;
  //   } else {
  //
  //     const alert = this.alertController.create({
  //       message: 'Please wait while getting the current location',
  //       buttons: [
  //         {
  //           text: 'Close',
  //           role: 'cancel',
  //           handler: () => {
  //             console.log('Close!');
  //           }
  //         }
  //       ]
  //     });
  //
  //     alert.present();
  //     return false;
  //   }
  // }


  ionViewWillLoad() {

    this.locationProvider.startTracking();

    const loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading clients data...'
    });
    loading.present();

    this.clientsService.getClients(this.locationProvider.latitude , this.locationProvider.longitude)
      .subscribe(
        (list: Client[]) => {
          if (list) {
            this.clients = list;
          } else {
            this.clients = [];
          }

          loading.dismiss();
        },
        error => {
          loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }


  ionViewWillUnload(){
    this.locationProvider.stopTracking();
  }

  onLoadClient(client : Client){
    console.log('loading client id :'+client);
    this.navCtrl.push(ClientPage, {client: client});
  }

  onNewClient() {
    this.navCtrl.push(EditClientPage, {mode: 'New'});
  }


  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }


  doRefresh(refresher : any){
    this.clientsService.getClients(this.locationProvider.latitude , this.locationProvider.longitude)
        .subscribe(
            (list: Client[]) => {
              if (list) {
                this.clients = list;
                refresher.complete();
              } else {
                this.clients = [];
              }
            },
            error => {
              refresher.complete();
            }
        );

  }

}
