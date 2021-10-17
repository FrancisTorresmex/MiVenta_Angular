import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Concept } from '../../../models/concept';
import { CartProduct } from '../../../models/cartProduct';
import { ApiVentaService } from '../../../services/apiVenta.service';

import { Sale } from 'src/app/models/sale';


@Component({
    templateUrl: 'dialogShoppingCart.component.html'
})
export class DialogShoppingCart {        

    myConcepts: Concept[]; //lista para agregar todos los conceptos
    mySale: Sale;

    localObject = JSON.parse(localStorage.getItem('miUser') as string); //convierto los datos de mi local storage en un objeto {id:x, rol:x...etc} para poder usar la id

    constructor(
        private _refDialog: MatDialogRef<DialogShoppingCart>,
        private _apiVenta: ApiVentaService,        
        @Inject(MAT_DIALOG_DATA) public cart: CartProduct[] //lo que recibe este dialog de otros componentes    
    ) 
    {
        //inicializo mi venta, el idCliente es por defecto(se eliminara campo luego), el idUsuario es el decode del jwt, pero solo me interesa la parte [0] = id                 
        this.mySale = {idCliente: 1, idUsuario:this.localObject['id'], conceptos: []};         
        this.myConcepts = [];
    }    

    ngOnInit(): void {                                                
        console.log('información desde le menú', this.cart);
        // console.log('tokenDecode', this.localObject['id']); //id del usuario, obtenido luego del decode
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

    //enviar la venta a la base de datos (ya enviar los datos de venta y los conceptos)
    sendSale() {
        this.addConcept();        
        this.mySale.conceptos = this.myConcepts; //los conceptos de mySale seran los mismos que myConcepts

        this._apiVenta.Add(this.mySale).subscribe(resp => {
            if (resp.success === 1) { //si la respuesta es 1 osea ok
                console.log('Se añadio la venta');
            }
        });        
        console.log('venta', this.mySale);         
    }

    //eliminar producto de carrito (en typecript eliminar un objeto se usa splice)
    delete(id: number){        
        this.cart.forEach((item, index) => {  //recorremos la lista y busco el que sea igual a la id que se borrara
            if (item.idProducto === id) this.cart.splice(index, 1) //le digo que borre del index al 1, para solo borrar ese articulo y no todos (sin esto me borraba toda la lista)
        });
        // console.log('el eliminado:', this.cart);
        this._refDialog.close({
            data: this.cart,
        });
    }
    

    //Cerrar dialog
    close() {
        this._refDialog.close();
    }

}