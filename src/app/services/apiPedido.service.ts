import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Response } from '../models/response';

@Injectable({
    providedIn: 'root'
})
export class ApiPedidoService {

    url: string = 'https://localhost:44372/api/Pedido/Usuario'    

    constructor(private _http: HttpClient) {}

    //Petición a la api de ver historial de pedidos del usuario en sesión
    getOrders( id: number, pag: number ): Observable<Response> {
        return this._http.get<Response>(`${this.url}?id=${id}&pag=${pag}`);
    }

}