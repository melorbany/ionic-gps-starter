import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import {LoadingController, AlertController, NavController} from "ionic-angular";
import {HomeTabsPage} from "../home-tabs/home-tabs";
import {UsersService} from "../../services/users";
import {SignupPage} from "../signup/signup";


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})


export class SigninPage {

  constructor(private userService: UsersService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private  navCtrl : NavController) {
  }

  onSignin(form: NgForm) {

    console.log("sigin in");
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    this.userService.signin(form.value.email, form.value.password)
        .subscribe(
            response => {
              console.log(response);
              loading.dismiss();
              this.userService.setAuthorized(true);
              this.navCtrl.setRoot(HomeTabsPage);
            },

            error => {
              loading.dismiss();
              this.handleError(error.json().error);
            }
        );
  }

  onSignup(){
    this.navCtrl.push(SignupPage);
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
