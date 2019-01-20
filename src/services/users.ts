import {User} from "../models/user";
import {Response, Http} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';

@Injectable()
export class UsersService {


    private url= 'http://localhost:8002/api/v1/';

    private authorized : boolean = false;

    constructor(private http: Http) {}


    /**
     *
     * @param user
     * @returns {Observable<R>}
     */
    signup(user : User){

        let link = this.url+'signup';
        return this.http.post(link, user)
            .map((response: Response) => response.json());
    }


    /**
     *
     * @param email
     * @param password
     * @returns {Observable<R>}
     */
    signin(email:string , password:string){
        console.log(email);
        let link = this.url+ 'signin';

        return this.http.post(link, {email : email, password : password})
            .map((response: Response) => response.json());
    }

    /**
     *
     * @param authorized
     */
    setAuthorized ( authorized : boolean){
        this.authorized = authorized ;
    }

    /**
     *
     * @returns {boolean}
     */
    isAuthorized(){ return this.authorized}
}
