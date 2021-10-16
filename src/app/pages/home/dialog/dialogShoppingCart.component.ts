import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Concept } from '../../../models/concept';
import { CartProduct } from '../../../models/cartProduct';


@Component({
    templateUrl: 'dialogShoppingCart.component.html'
})
export class DialogShoppingCart {        

    constructor(
        private _refDialog: MatDialogRef<DialogShoppingCart>,
        @Inject(MAT_DIALOG_DATA) public concepts: CartProduct[] //lo que recibe este dialog de otros componentes    
    ) {                        
    }    

    ngOnInit(): void {                                        
        console.log('información desde le menú', this.concepts);
    }

    //eliminar producto de carrito (en typecript eliminar un objeto se usa splice)
    delete(id: number){        
        this.concepts.forEach((item, index) => {  //recorremos la lista y busco el que sea igual a la id que se borrara
            if (item.idProducto === id) this.concepts.splice(index, 1) //le digo que borre del index al 1, para solo borrar ese articulo y no todos (sin esto me borraba toda la lista)
        });
        // console.log('el eliminado:', this.concepts);
        this._refDialog.close({
            data: this.concepts,
        });
    }
    

    //Cerrar dialog
    close() {
        this._refDialog.close();
    }

}