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
    

    //Cerrar dialog
    close() {
        this._refDialog.close();
    }

}