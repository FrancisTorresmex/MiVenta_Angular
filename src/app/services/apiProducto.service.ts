import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Response } from '../models/response';
import { Product } from '../models/product';


const httpOption = { //Headers (el token esta en los guard)
    headers: new HttpHeaders({
        'Contend-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class ApiProductoService {

    url: string = 'https://localhost:44372/api/Producto';

    constructor(private _http: HttpClient) {
        
    }

    //Obtener todos
    getProduct( pagina: number ):Observable<Response> {
        return this._http.get<Response>(`${this.url}?pag=${pagina}`);
    }
    
    //Agregar (admin)
    addProduct( producto: Product ): Observable<Response> {
        return this._http.post<Response>(this.url, producto, httpOption);
    }

    //Editar (admin)
    editProduct( producto: Product ): Observable<Response> {
        return this._http.put<Response>(this.url, producto, httpOption);
    }


    //Eliminar (admin)
    deleteProduct( id: number ): Observable<Response> {
        return this._http.delete<Response>(`${this.url}?id=${id}`);
    }

}