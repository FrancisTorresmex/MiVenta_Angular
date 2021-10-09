import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user";
import { Response } from '../models/response';


const httpOption = {
    headers: new HttpHeaders({
        'Contend-Type': 'application/json'  
    })
}


@Injectable({
    providedIn: 'root'
})
export class ApiLoginService {

    private _url : string = 'https://localhost:44372/api/Usuario/Login'

    private _userSubjet!: BehaviorSubject<User> //behaviorSubject es un observable, que retorna el ultimo valor inmediatamente
    public user!: Observable<User>;

    public get userData() : User { // si no existe sesión el value sera null
        return this._userSubjet.value; 
    }

    constructor(private _http: HttpClient) {
        //el constructor por primera vez vera si hay algo guardado en localStorage  llamado miUser, si no, esto seria null
        this._userSubjet = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("miUser")!));
        //usuario estara al pendiente de cambios en _userSubject
        this.user = this._userSubjet.asObservable();
    }

    //Inicio de sesión
    login() : Observable<Response> {
        return this._http.post<Response>(this._url, httpOption, {
            
        })
    }

}