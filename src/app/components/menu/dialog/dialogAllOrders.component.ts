import { Component } from '@angular/core';
import { ApiPedidoService } from '../../../services/apiPedido.service';
import { Orders } from '../../../models/orders';
import { MySnackBarService } from '../../../tools/snackBar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Delivery } from '../../../models/delivery';


//Dialgo para ver todos los pedidos (admin)

@Component({
    templateUrl: 'dialogAllOrders.component.html',
    styleUrls: ['./dialogAllOrders.component.scss']
})
export class DialogAllOrders {

    page: number; 
    allOrders: Orders[]; //variable que almacenara los datos traidos de la respuesta de la api

    idSearch!: number; //id de venta a buscar
    lstSearch: Orders[]; //    

    //para buscar por estado (true = entregado, false = pendiente) 
    delivery!: boolean; 

    //Si algun chip es precionado significa que buscara en una lista especifica de orendes entregadas o pendientes
    //por lo tanto esta variable se usa para decir que metodo ejecutar a los botones de pagina siguiente y anterior
    isDelivery!: boolean;

    constructor(
        private _apiPedidoService: ApiPedidoService,
        private _mySnackBar: MySnackBarService,
        private _dialogRef: MatDialogRef<DialogAllOrders>
    ) 
    {
        this.allOrders = [];
        this.page = 1;
        this.getAllOrders();
        this.delivery;
        this.isDelivery;
        this.lstSearch = [];
    }
    
    ngOnInit(): void {}

    // inidicador de orden entregada 
    entregado: boolean = false; 
    id!: number;    

    //Ver todos los pedidos
    getAllOrders() {
        this._apiPedidoService.getAllOrders(this.page).subscribe(resp => {
            if(resp.success === 1) {                             
                this.allOrders = resp.data; //asignamos lo que contiene resp                                
            }else{
                this._mySnackBar.createMySnackBar(resp.message, 'error');
            }            
        }, (error) => {
            this._mySnackBar.createMySnackBar('Vérifica que estes concectado a internet.', 'error');
        });
    }

    //Pasar a la siguiente página de pedidos
    nextPag(el:HTMLElement) {        
        this.scroll(el);
        this.page = ++this.page; //cada vez que se presiona el botón siguiente, se suma uno a page

        //si es true ejecuta el metodo searchDelivery
        if (this.isDelivery == true) {
            this.searchDelivery();
        }else{
            this.getAllOrders(); //se recarga el metodo
        }        
    }

    //Volver una página de pedidos
    previousPag(el:HTMLElement) {
        this.scroll(el);
        this.page = --this.page;
        
        //si es true ejecuta el metodo searchDelivery
        if (this.isDelivery == true) {
            this.searchDelivery();
        }else{
            this.getAllOrders(); //se recarga el metodo
        }        
    }


    //Hacer scroll de nuevo al inicio de la card
    scroll(el:HTMLElement) {
        el.scrollIntoView();                
    }


    //Buscar venta por id (admin)
    searchOrders() {        
        this._apiPedidoService.searchOrderAdmin(this.idSearch).subscribe(resp => {
            if (resp.success == 1) {                
               this.allOrders = (resp.data); //ahora la lista solo contendra la venta buscada con toda la información               
            }else{
                this._mySnackBar.createMySnackBar(resp.message, 'error'); 
            }
        }, (error) => {
            this._mySnackBar.createMySnackBar('Vérifica tu conexión a internet', 'error');
        });
    }


    //Editar entrega (admin) (entregado = true, pendeinte = false)
    editDelivery() {
        //Objeto que se enviara en la petición de editDelivary (para editar entrega)
        const delivary: Delivery = { 
            idVenta: this.id,
            entrega: this.entregado
        };

        this._apiPedidoService.editDelivery(delivary).subscribe(resp => {
            if (resp.success === 1) {
                this.getAllOrders();
                this._mySnackBar.createMySnackBar("Entrega editada éxitosamente.", '');
            }else{              
                this._mySnackBar.createMySnackBar(resp.message, 'error');
            }
        }, (error) => {
            this._mySnackBar.createMySnackBar("Vérifica tu conexión a internet.", 'error');
        });
    }

    //Buscar por estado (true = entregado, false = pendiente)
    searchDelivery() {
        this._apiPedidoService.searchDeliveryAdmin(this.delivery, this.page).subscribe(resp => {
            if (resp.success === 1) {
                this.allOrders = (resp.data);                        
            }else{              
                this._mySnackBar.createMySnackBar(resp.message, 'error');
            }
        }, (error) => {
            this._mySnackBar.createMySnackBar("Vérifica tu conexión a internet.", 'error');
        });    
        
    } 


    //cerrar dialog
    close() {
        this._dialogRef.close();
    }

}