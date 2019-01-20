import {Geolocation} from "ionic-native";
import {Location} from "../models/location";

export class LocationService {

  private location : Location;

  getCurrentLocation(){

    Geolocation.getCurrentPosition()
      .then(
        location => {
          this.location.latitude = location.coords.latitude;
          this.location.longitude = location.coords.longitude;
          this.location.status = 1;
          this.location.changedCount++;
        }
      )
      .catch(
        error => {
          return null;
        }
      );

    return this.location;
  }


}
