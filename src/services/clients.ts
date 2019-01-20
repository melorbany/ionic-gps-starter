import {Response, Http} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Client} from "../models/client";

@Injectable()
export class ClientsService {


    private url= 'http://localhost:8002/api/v1/';
    constructor(private http: Http) {}

  /**
   *
   * @param client
   * @returns {Observable<R>}
   */
    addNewClient(client : Client){
        let link = this.url+'clients';


    var params : any = client;
    params.user_id = 4;

    return this.http.post(link, params)
            .map((response: Response) => response.json());
    }


    updateClient(client : Client){

        let link = this.url+'clients/'+client.id;


        var params : any = client;
        params.user_id = 4;

        return this.http.put(link, params)
            .map((response: Response) => response.json());
    }



    /**
   *
   * @returns {Observable<R>}
   */
  getClients(latitude : number , longitude :  number){
      let link = this.url+'clients?user_id=1&latitude='+latitude+'&longitude='+longitude;
      console.log(link);

      return this.http.get(link)
        .map((response: Response) => {
          const results = response.json() ? response.json() : [];
          const clients: Client[] =[];
          for (let item of results) {

              var rounded = Math.round( item.distance * 10 ) / 10;

              var client = new Client();
              client.id = item.id;
              client.name = item.name;
              client.phone = item.phone;
              client.email = item.email;
              client.latitude = +item.latitude;
              client.longitude = +item.longitude;
              client.details = item.details;
              client.distance = +rounded;

              clients.push(client);
          }
          return clients;
        });
  }

}
