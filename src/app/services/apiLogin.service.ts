import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user";
import { Response } from '../models/response';
import { map } from 'rxjs/operators'; //usar map
import { Login } from "../models/login";



const httpOption = { //objeto headers
    headers: new HttpHeaders({
        'Contend-Type': 'application/json'  
    })
}


@Injectable({
    providedIn: 'root'
})
export class ApiLoginService {

    private _url : string = 'https://localhost:44372/api/Usuario/Login';

    private _userSubjet!: BehaviorSubject<User>; //behaviorSubject es un observable, que retorna el ultimo valor inmediatamente
    public user!: Observable<User>;

    public get userData() : User { // si no existe sesión el value sera null (se usa en el auth.guard.ts)
        return this._userSubjet.value; 
    }

    constructor(private _http: HttpClient) {
        //el constructor por primera vez vera si hay algo guardado en localStorage  llamado miUser, si no, esto seria null
        this._userSubjet = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("miUser")!));  //parseo lo que contenga miUser del localstorage, para hacerlo un objeto
        //usuario estara al pendiente de cambios en _userSubject
        this.user = this._userSubjet.asObservable();
    }

    //Inicio de sesión
    login(login: Login) : Observable<Response> {
        return this._http.post<Response>(this._url, login, httpOption).pipe( //url, body, headers
            map(resp => {
                if(resp.success === 1) { //si el resultado recibido de la api es 1, osea Ok
                    const user: User = resp.data;
                    localStorage.setItem('miUser', JSON.stringify(user));  // guardar en localstorage un item que se llamara miUsuario, y y la data 
                }
                return resp;
            })            
        );        
    }


    //Cerrar sesión
    logout() {
        localStorage.removeItem("miUser"); //eliminamos miUser de localStorage
        this._userSubjet.next(null!)//al llamarlo como e sobservabe, los sucritos a este metodo veran que ya no esta logeado y se actualizara
    }

}