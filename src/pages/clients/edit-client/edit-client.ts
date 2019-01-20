import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {Client} from "../../../models/client";
import {FormGroup,Validators, FormControl} from "@angular/forms";
import {ClientsService} from "../../../services/clients";
import {LocationProvider} from "../../../providers/location";

/*
  Generated class for the EditClient page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-client',
  templateUrl: 'edit-client.html'
})
export class EditClientPage implements OnInit {

  mode = 'New';
  businessOptions = [{id:1,title:'Company'},{id:2,title:'Office'},{id:3,title:'Branch'},{id:4,title:'Pharmacy'}];
  clientForm: FormGroup;
  client: Client;


  constructor(public navCtrl: NavController,
              public navParams: NavParams ,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private clientsService : ClientsService,
              public locationProvider: LocationProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditClientPage');
  }

  private initializeForm() {
    let name = null;
    let details = null;
    let phone = null;
    let email = null;
    let business = 1;

    if (this.mode == 'Edit') {
        name = this.client.name;
        phone = this.client.phone;
        email = this.client.email;
    }

    this.clientForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'details': new FormControl(details),
      'business': new FormControl(business, Validators.required),
      'phone': new FormControl(phone),
      'email': new FormControl(email),
    });
  }

  ionViewWillLoad() {
    this.locationProvider.startTracking();
  }

  ionViewWillUnload(){
    this.locationProvider.stopTracking();
  }

  ngOnInit(): void {
    this.mode = this.navParams.get('mode');

    if(this.mode == 'Edit'){
      this.client =  this.navParams.get('client');
    }

    this.initializeForm();
  }


  onSubmit() {

    const value = this.clientForm.value;

    if (this.mode == 'Edit') {

      const loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: 'Adding new client...'
      });

      loading.present();

      this.client.name = value.name;
      this.client.phone = value.phone;
      this.client.details = value.details;
      this.client.email  = value.email;

      console.log(this.client);

      this.clientsService.updateClient(this.client)
          .subscribe(
              response => {
                console.log(response);
                loading.dismiss();
              },

              error => {
                loading.dismiss();
                this.handleError(error.json().error);
              }
          );


    } else {

      const loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: 'Adding new client...'
      });

      loading.present();

      var client = new Client();
      client.name = value.name;
      client.phone = value.phone;
      client.details = value.details;
      client.email  = value.email;

      client.latitude = this.locationProvider.latitude;
      client.longitude = this.locationProvider.longitude;

      this.clientsService.addNewClient(client)
        .subscribe(
          response => {
            console.log(response);
            loading.dismiss();
          },

          error => {
            loading.dismiss();
            this.handleError(error.json().error);
          }
        );
    }
    //this.clientForm.reset();
    //this.navCtrl.popToRoot();
  }


  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
