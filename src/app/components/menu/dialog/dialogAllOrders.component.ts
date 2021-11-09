import { Component } from '@angular/core';
import { ApiPedidoService } from '../../../services/apiPedido.service';
import { Orders } from '../../../models/orders';
import { MySnackBarService } from '../../../tools/snackBar.service';
import { MatDialogRef } from '@angular/material/dialog';


//Dialgo para ver todos los pedidos (admin)

@Component({
    templateUrl: 'dialogAllOrders.component.html',
    styleUrls: ['./dialogAllOrders.component.scss']
})
export class DialogAllOrders {

    page: number; 
    allOrders: Orders[]; //variable que almacenara los datos traidos de la respuesta de la api

    idSearch: number = 5; //id de venta a buscar
    lstSearch: Orders[]; //

    constructor(
        private _apiPedidoService: ApiPedidoService,
        private _mySnackBar: MySnackBarService,
        private _dialogRef: MatDialogRef<DialogAllOrders>
    ) 
    {
        this.allOrders = [];
        this.page = 1;
        this.getAllOrders();

        this.lstSearch = [];
    }
    
    ngOnInit(): void {}

    //Ver todos los pedidos
    getAllOrders() {
        this._apiPedidoService.getAllOrders(this.page).subscribe(resp => {
            if(resp.success === 1) {                             
                this.allOrders = resp.data; //asignamos lo que contiene resp                
                console.log(resp);
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


    //cerrar dialog
    close() {
        this._dialogRef.close();
    }

}