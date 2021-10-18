import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ApiLoginService } from '../services/apiLogin.service';

//creado para evitar que puedan acceder a componentes no permitidos, en este caso no accede si no hay sesión

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate { //implemtenta de CanActive el cual es un guard de los cuatro que existen de sistema de angular
    
    constructor(private apiLoginService: ApiLoginService, private router: Router){

    }
    canActivate(route: ActivatedRouteSnapshot) { //metodo obligatorio de CanActive
        const user = this.apiLoginService.userData; //se le asigna el userData de apiLogin.services.ts

        if(user) { //si usario no es null, significa que una sesión existe por lo cual las rutas que reciban este canActivated tendran permiso de acceder (por ejemlo navegar directamente a home sin el login)
            return true;
        }
        this.router.navigate(['/login']); //si es null lo mandamos directo al login y el CanActivated de las rutas evitara acceder a otras rutas hasta logearse
        return false;

    }

    
}