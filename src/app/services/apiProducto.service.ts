import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Response } from '../models/response';


@Injectable({
    providedIn: 'root'
})
export class ApiProductoService {

    url: string = 'https://localhost:44372/api/Producto';

    constructor(private _http: HttpClient) {
        
    }

    //Obtener todos
    getProduct( pagina: number ):Observable<Response> {
        return this._http.get<Response>(`${this.url}?${pagina}`);
    }

    //Agregar
    

    //Editar


    //Eliminar

}