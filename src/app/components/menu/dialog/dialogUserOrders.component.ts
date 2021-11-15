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

    //para buscar por estado (true = entregado, false = pendiente) 
    delivery!: boolean;

    //Si algun chip es precionado significa que buscara en una lista especifica de orendes entregadas o pendientes
    //por lo tanto esta variable se usa para decir que metodo ejecutar a los botones de pagina siguiente y anterior
    isDelivery!: boolean;

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
        this.scroll(el);
        this.page = ++this.page;
        //si es true ejecuta el metodo searchDelivery
        if (this.isDelivery == true) {
            this.searchDeliveryUser();    
        }else{
            this.getAllOrders();
        }                
    }


    //Pasar a la página de productos anterior
    previousPage(el:HTMLElement) {
        this.scroll(el);
        this.page = --this.page;
        //si es true ejecuta el metodo searchDelivery
        if (this.isDelivery == true) {
            this.searchDeliveryUser();    
        }else{
            this.getAllOrders();
        }        
    }

    //Al cambiar de página el scroll regresa al inicio
    scroll(el: HTMLElement) {
        el.scrollIntoView();
    }


    //Buscar pedidos por estado de entrega (true = entregado, false = pendiente)
    searchDeliveryUser() {
        this._apiPedidoService.searchDeliveryUser(this.localObject['id'], this.delivery, this.page).subscribe(resp => {
            if (resp.success === 1) {
                this.myOrders = (resp.data);
            }else{
                this._mySncakBar.createMySnackBar(resp.message, 'error');
            }
        }, (error) => {
            this._mySncakBar.createMySnackBar('Vérifica tu conexión a internet', 'error');
        })
    }
    

    //Cerrar el dialog
    close() {
        this._refDialog.close();
    }

}