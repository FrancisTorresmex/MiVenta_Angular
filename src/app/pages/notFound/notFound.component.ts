import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
    selector: 'app-notFond',
    templateUrl: './notFound.component.html'
})
export class NotFoundComponent implements OnInit {

    constructor(private _router: Router) {}

    ngOnInit(): void {}

    //para regresar a pagina existente
    return() {
        this._router.navigate(['/login']);
    }

}