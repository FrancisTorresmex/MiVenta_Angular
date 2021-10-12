import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sale } from "../models/sale";


const httpOption = {
    headers: new HttpHeaders({
        'Contend-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
})
export class ApiVentaService {

    url: string = 'https://localhost:44368/api/Venta';

    constructor( private _http: HttpClient ) {}

    //agregar venta
    Add(sale: Sale) {
        return this._http.post(this.url, sale, httpOption);
    }

}