import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Register } from '../models/register';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/response';



const httpOption = { //objeto de headers
    headers: new HttpHeaders({
        'Contend-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root',
})
export class ApiRegisterService {

    private _url: string = 'https://localhost:44372/api/Auth/Registro';    

    constructor(private _http: HttpClient) {}

    //petición de registro a la api
    register(register: Register): Observable<Response> {
        return this._http.post<Response>(this._url, register, httpOption);
    }

}