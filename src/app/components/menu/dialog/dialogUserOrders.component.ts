import { Component, Inject } from '@angular/core';
import { ApiPedidoService } from '../../../services/apiPedido.service';
import { Orders } from '../../../models/orders';
import { MatDialogRef } from '@angular/material/dialog';
import { MySnackBarService } from '../../../tools/snackBar.service';


@Component({
    templateUrl: 'dialogUserOrders.component.html',
    styleUrls: ['./dialogUserOrders.component.scss']
})
export class DialogUserOrders {

    //convierto los datos de mi local storage en un objeto {id:x, rol:x...etc} para poder usar la id
    localObject = JSON.parse(localStorage.getItem('miUser') as string);
    
    page: number; //página de datos a mostrar

    myOrders:Orders[]; //para guardar el historial de pedidos recibidos del servicio

    searchOrder!: number; //para buscar una orden en el historial del usuario (de ese mismo usuario en sesión)

    constructor(
        private _apiPedidoService: ApiPedidoService,
        private _mySncakBar: MySnackBarService,
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
            if (resp.success === 1) {
                this.myOrders = resp.data //le asignamos a la lista la respuesta    
                // console.log(this.myOrders);
            }else{
                this._mySncakBar.createMySnackBar(resp.message, 'error');
            }                     
        }, (error) => {
            this._mySncakBar.createMySnackBar('Vérifica tu conexión a internet', 'error');
        });        
    }


    searchOrderUser() {
        this._apiPedidoService.searchOrderUser(this.localObject['id'], this.searchOrder).subscribe(resp => {
            if (resp.success === 1) {                
                this.myOrders = resp.data;
                if (this.myOrders.length <= 0) {
                    this._mySncakBar.createMySnackBar('Pedido no encontrado, vérifica que la ID sea la correcta.', 'error');    
                    this.getAllOrders(); //cargamos de nuevo todas las ordenes para evitar pantalla en blanco al no encontrar lo buscado
                }
            }else{
                this._mySncakBar.createMySnackBar(resp.message, 'error');
            }
        }, (error) => {
            this._mySncakBar.createMySnackBar('Vérifica tu concexión a internet', 'error');
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