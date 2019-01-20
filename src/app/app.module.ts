import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AgmCoreModule } from "angular2-google-maps/core";
import { HomePage } from '../pages/home/home';
import {ClientsPage} from "../pages/clients/clients";
import {EmployeesPage} from "../pages/employees/employees";
import {VisitsPage} from "../pages/visits/visits";
import {AuthTabsPage} from "../pages/auth-tabs/auth-tabs";
import {HomeTabsPage} from "../pages/home-tabs/home-tabs";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import {UsersService} from "../services/users";
import {ClientsService} from "../services/clients";
import {ClientPage} from "../pages/clients/client/client";
import {EditClientPage} from "../pages/clients/edit-client/edit-client";
import {LocationService} from "../services/location";
import {LocationTracker} from "../providers/location-tracker";
import {LocationProvider} from "../providers/location";
import {LocationPage} from "../pages/location/location";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ClientsPage,
    EmployeesPage,
    VisitsPage,
    AuthTabsPage,
    HomeTabsPage,
    SigninPage,
    SignupPage,
    ClientPage,
    EditClientPage,
    LocationPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCX-4iUUuIec_zajE3KvsfNaFEiVD9iHXI'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ClientsPage,
    EmployeesPage,
    VisitsPage,
    AuthTabsPage,
    HomeTabsPage,
    SigninPage,
    SignupPage,
    ClientPage,
    EditClientPage,
    LocationPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersService,
    ClientsService,
    LocationService,
    LocationTracker,
    LocationProvider
  ]
})
export class AppModule {}
