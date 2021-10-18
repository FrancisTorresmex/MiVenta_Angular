import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sale } from "../models/sale";
import { Response } from '../models/response';

import { Observable } from "rxjs";


const httpOption = {
    headers: new HttpHeaders({
        'Contend-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
})
export class ApiVentaService {

    url: string = 'https://localhost:44372/api/Venta';

    constructor( private _http: HttpClient ) {}

    //agregar venta
    Add(sale: Sale): Observable<Response>{        
        return this._http.post<Response>(this.url, sale, httpOption);
    }

}