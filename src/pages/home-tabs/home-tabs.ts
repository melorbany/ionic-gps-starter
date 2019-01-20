import { Component } from '@angular/core';
import {HomePage} from "../home/home";
import {LocationPage} from "../location/location";

/*
  Generated class for the HomeTabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home-tabs',
  templateUrl: 'home-tabs.html'
})
export class HomeTabsPage {
  homePage = HomePage;
  locationPage = LocationPage;
}
