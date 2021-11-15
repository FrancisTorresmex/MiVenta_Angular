import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Response } from '../models/response';
import { Delivery } from '../models/delivery';

@Injectable({
    providedIn: 'root'
})
export class ApiPedidoService {

    url: string = 'https://localhost:44372/api/Pedido';
    urlDerivary: string = 'https://localhost:44372/api/Entrega'; //Url de editar entrega    

    constructor(private _http: HttpClient) {}

    //Petición a la api de ver historial de pedidos del usuario en sesión
    getOrders( id: number, pag: number ): Observable<Response> {
        return this._http.get<Response>(`${this.url}/Usuario?id=${id}&pag=${pag}`);
    }

    //Buscar un pedido (usuario normal)
    searchOrderUser( idOrder: number, idUser: number ): Observable<Response> {
        return this._http.get<Response>(`${this.url}/Usuario/Search/Orders?idUsuario=${idOrder}&idVenta=${idUser}`);
    }

    //Buscar pedidos con estado de entrega pendiente/entregado
    searchDeliveryUser(idUser: number, status: boolean, pag: number): Observable<Response> {
        return this._http.get<Response>(`${this.url}/Usuario/Search/Orders/Delivery?idUser=${idUser}&delivery=${status}&pag=${pag}`);
    }

    //Buscar un pedido (administrador)
    searchOrderAdmin( id: number ): Observable<Response> {
        return this._http.get<Response>(`${this.url}/Administrador/Search/Orders?id=${id}`)
    }

    //Buscar pedidos con estado de entrega pendiente/entregado
    searchDeliveryAdmin(status: boolean, pag: number): Observable<Response> {
        return this._http.get<Response>(`${this.url}/Administrador/Search/Orders/Delivery?delivery=${status}&pag=${pag}`);
    }

    //Petición a la api de ver todos los pedidos (admin)
    getAllOrders( pag: number ): Observable<Response> {
        return this._http.get<Response>(`${this.url}/Administrador?pag=${pag}`);
    }



    //Editar entrega (true = entregado, false = pendiente) (admin)
    editDelivery( delivery: Delivery): Observable<Response> {
        return this._http.put<Response>(this.urlDerivary, delivery);
    }
    
    

}