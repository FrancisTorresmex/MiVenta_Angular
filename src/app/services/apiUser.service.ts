import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { UpdateName, UpdatePassword } from '../models/updateUser';
import { Response } from '../models/response';

//Header
const httpOption = {
    headers: new HttpHeaders({
        'Contend-Type': 'application/json'
    })
};

@Injectable({providedIn: 'root'})
export class ApiUserService {    

    url: string = 'https://localhost:44372/api/Usuario/Update';

    constructor( private _http: HttpClient ) {}

    //Módificar nombre de usuario
    updateUserName(updateUser: UpdateName): Observable<Response> {
        return this._http.put<Response>(`${this.url}/Name`, updateUser);
    }

    //Módificar contraseña de usuario
    updateUserPassword(updateUser: UpdatePassword): Observable<Response> {
        return this._http.put<Response>(`${this.url}/Password`, updateUser);
    }

}