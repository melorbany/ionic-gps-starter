import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SigninPage} from "../signin/signin";
import {SignupPage} from "../signup/signup";
import {UsersService} from "../../services/users";

/*
  Generated class for the AuthTabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-auth-tabs',
  templateUrl: 'auth-tabs.html'
})
export class AuthTabsPage {

  signinPage = SigninPage;
  signupPage = SignupPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private usersService: UsersService) {}


  isAuthorized(){
    this.usersService.isAuthorized();
  }

}
