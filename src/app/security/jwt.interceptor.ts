import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiLoginService } from '../services/apiLogin.service';


//clase creada porque en angular existe algo llamado interceptor que se pueden encargar de agregarles cosas
//a las peticiones como el token que viene de la api, en lugar de poner uno a uno en los headers de cada petición



@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(private _apiLogin: ApiLoginService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { //httpInterceptor reuqiere este metodo
          const user =   this._apiLogin.userData; //el metodo usuarioData regresa null o el valor según exista sesión o no
          if (user) { //si no es null            
              req = req.clone({ //clonamos todo lo que ya tenga esa request (exito, mensaje, data)
                    setHeaders: {                        
                        Authorization: `Bearer ${user.token}` //le agrego a la clonacion el header de token 
                    }
              });
          }
          return next.handle(req); //siempre y cuando haya sesión osea pase por el if, se clonara y añadira el token al header
    }

}