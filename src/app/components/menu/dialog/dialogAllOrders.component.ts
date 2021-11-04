import { Component } from '@angular/core';
import { ApiPedidoService } from '../../../services/apiPedido.service';
import { Orders } from '../../../models/orders';


//Dialgo para ver todos los pedidos (admin)

@Component({
    templateUrl: 'dialogAllOrders.component.html'
})
export class DialogAllOrders {

    page: number; 
    allOrders: Orders[]; //variable que almacenara los datos traidos de la respuesta de la api

    constructor(
        private _apiPedidoService: ApiPedidoService
    ) 
    {
        this.allOrders = [];
        this.page = 1;
        this.getAllOrders();
    }
    
    ngOnInit(): void {}

    //Ver todos los pedidos
    getAllOrders() {
        this._apiPedidoService.getAllOrders(this.page).subscribe(resp => {
            if(resp.success === 1) {                             
                this.allOrders = resp.data; //asignamos lo que contiene resp                
                console.log(resp);
            }            
        }, (error) => {
            console.log(error);
        });
    }

    //Pasar a la siguiente página de pedidos
    nextPag(el:HTMLElement) {        
        this.scroll(el);
        this.page = ++this.page; //cada vez que se presiona el botón siguiente, se suma uno a page
        this.getAllOrders(); //se recarga el metodo        
    }

    //Volver una página de pedidos
    previousPag(el:HTMLElement) {
        this.scroll(el);
        this.page = --this.page;
        this.getAllOrders();
    }


    //Hacer scroll de nuevo al inicio de la card
    scroll(el:HTMLElement) {
        el.scrollIntoView();                
    }


    //cerrar dialog
    close() {

    }

}