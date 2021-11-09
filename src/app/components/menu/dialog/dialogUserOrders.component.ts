import { Component, Inject } from '@angular/core';
import { ApiPedidoService } from '../../../services/apiPedido.service';
import { Orders } from '../../../models/orders';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
    templateUrl: 'dialogUserOrders.component.html'
})
export class DialogUserOrders {

    //convierto los datos de mi local storage en un objeto {id:x, rol:x...etc} para poder usar la id
    localObject = JSON.parse(localStorage.getItem('miUser') as string);
    
    page: number; //página de datos a mostrar

    myOrders:Orders[]; //para guardar el historial de pedidos recibidos del servicio

    constructor(
        private _apiPedidoService: ApiPedidoService,
        private _refDialog: MatDialogRef<DialogUserOrders>,
    ) 
    {
        this.myOrders = [];
        this.page = 1;
        this.getAllOrders();
    }

    ngOnInit(): void {}

    //Llamar al servicio para ver mi historial de ordenes
    getAllOrders() {
        this._apiPedidoService.getOrders(this.localObject['id'], this.page).subscribe(resp => {
            this.myOrders = resp.data //le asignamos a la lista la respuesta
            console.log(this.myOrders);
        });        
    }


    //Pasar a la página de productos siguiente
    nextPage(el:HTMLElement) {
        this.page = ++this.page;
        this.getAllOrders();
        this.scroll(el);
    }


    //Pasar a la página de productos anterior
    previousPage(el:HTMLElement) {
        this.page = --this.page;
        this.getAllOrders();
        this.scroll(el);
    }

    //Al cambiar de página el scroll regresa al inicio
    scroll(el: HTMLElement) {
        el.scrollIntoView();
    }
    

    //Cerrar el dialog
    close() {
        this._refDialog.close();
    }

}