import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Client} from "../../../models/client";
import {EditClientPage} from "../edit-client/edit-client";

/*
  Generated class for the Client page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-client',
  templateUrl: 'client.html'
})
export class ClientPage  implements OnInit{

  client : Client;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {}


  ngOnInit(): void {
    this.client = this.navParams.get('client');

    console.log(this.client);
  }

  onEditClient() {
    this.navCtrl.push(EditClientPage, {mode: 'Edit', client: this.client});
  }



  onDeleteClient() {

  }
}
