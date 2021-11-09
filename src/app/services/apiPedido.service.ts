import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Response } from '../models/response';

@Injectable({
    providedIn: 'root'
})
export class ApiPedidoService {

    url: string = 'https://localhost:44372/api/Pedido'    

    constructor(private _http: HttpClient) {}

    //Petición a la api de ver historial de pedidos del usuario en sesión
    getOrders( id: number, pag: number ): Observable<Response> {
        return this._http.get<Response>(`${this.url}/Usuario?id=${id}&pag=${pag}`);
    }

    //Buscar un pedido (administrador)
    searchOrderAdmin( id: number ): Observable<Response> {
        return this._http.get<Response>(`${this.url}/Administrador/Search/Orders?id=${id}`)
    }

    //Petición a la api de ver todos los pedidos (admin)
    getAllOrders( pag: number ): Observable<Response> {
        return this._http.get<Response>(`${this.url}/Administrador?pag=${pag}`);
    }

}