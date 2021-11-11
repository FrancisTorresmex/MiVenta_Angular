import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Concept } from '../../../models/concept';
import { CartProduct } from '../../../models/cartProduct';
import { ApiVentaService } from '../../../services/apiVenta.service';

import { Sale } from 'src/app/models/sale';
import { MySnackBarService } from '../../../tools/snackBar.service';

import { Address } from '../../../models/address';
import { Router } from '@angular/router';



@Component({
    templateUrl: 'dialogShoppingCart.component.html',
    styleUrls: ['./dialogShoppingCart.component.scss']
})
export class DialogShoppingCart {        

    myConcepts: Concept[]; //lista para agregar todos los conceptos
    mySale: Sale;
    myAddress!: Address;    

    localObject = JSON.parse(localStorage.getItem('miUser') as string); //convierto los datos de mi local storage en un objeto {id:x, rol:x...etc} para poder usar la id

    constructor(
        private _refDialog: MatDialogRef<DialogShoppingCart>,
        private _apiVenta: ApiVentaService,  
        private _mysnackbar: MySnackBarService,     
        private _dialog: MatDialog,
        private _router: Router,         
        @Inject(MAT_DIALOG_DATA) public cart: CartProduct[] //lo que recibe este dialog de otros componentes    
    ) 
    {
        //inicializo mi venta, el idCliente es por defecto(se eliminara campo luego), el idUsuario es el decode del jwt, pero solo me interesa la parte [0] = id                                 
        this.mySale = {idCliente: 1, idUsuario:this.localObject['id'], direccion: this.myAddress , conceptos: []};         
        this.myConcepts = [];        
    }    

    ngOnInit(): void {                                                        
        this.addSales();        
        // console.log('tokenDecode', this.localObject['id']); //id del usuario, obtenido luego del decode
    }


    //Con el Output sale.component.ts que recibimos reseto la lista del carro, para eliminar los productos del carrito una vez se hizo el pedido
    clanLstCart($event: CartProduct[]){
        this.cart = [];
    }

    //Agrupar los conceptos (para luego juntarlos con sendSale y enviar la venta)
    addConcept() {
        for (let i = 0; i < this.cart.length; i++) {
            const concept: Concept = {
                idProducto : this.cart[i].idProducto,
                cantidad: this.cart[i].cantidad,
                importe: 1000, //aqui este por ahora es default, PENDIENTE añadirlo
                precioUnitario: this.cart[i].precioUnitario
            };
            this.myConcepts.push(concept); //añado ese concepto a la lista            
        }
    }

    //juntar todos los datos de la venta (menos la dirección esa se agrega en sale.component.ts).
    addSales() {
        this.addConcept();
        this.mySale.conceptos = this.myConcepts;                 
    }   
    

    //eliminar producto de carrito (en typescript eliminar un objeto se usa splice)
    deleteProduct(id: number){        
        this.cart.forEach((item, index) => {  //recorremos la lista y busco el que sea igual a la id que se borrara
            if (item.idProducto === id) {
                this.cart.splice(index, 1); //le digo que borre del index al 1, para solo borrar ese articulo y no todos (sin esto me borraba toda la lista)
                this.myConcepts.splice(index, 1); //eliminamos de la lista concept (para que cuando sale.component lo reciba este actualizada la lista)
            }
        });
        this._mysnackbar.createMySnackBar('Articulo eliminado.', '')
        // console.log('el eliminado:', this.cart);
        // this._refDialog.close({
        //     data: this.cart,
        // });
    }


    //Eliminar toda la lista del carrito
    deleteCart() {
        this.cart.splice(0, this.cart.length);
        this.myConcepts.splice(0, this.myConcepts.length);
        this._mysnackbar.createMySnackBar('Se eliminaron todos los artículos.', '');
        this._refDialog.close(); //cierro la ventana, ya que si no hay articulos porque mostrarla     
    }
    

    //Cerrar dialog
    close() {
        this._refDialog.close();
    }

}