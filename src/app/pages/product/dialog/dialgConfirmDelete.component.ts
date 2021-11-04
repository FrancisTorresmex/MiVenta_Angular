import { Component, Inject } from '@angular/core';
import { ApiProductoService } from '../../../services/apiProducto.service';
import { MySnackBarService } from '../../../tools/snackBar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../models/product';


@Component({
    templateUrl: 'dialgConfirmDelete.component.html'
})
export class DialogConfirmDelete {

    constructor(           
        private _mySnackBar: MySnackBarService,     
        private _apiProductoService: ApiProductoService,
        private _dialogRef: MatDialogRef<DialogConfirmDelete>,
        @Inject(MAT_DIALOG_DATA) public  product: Product, //los datos del producto que recibo de product.component.ts
    ) 
    {}

    ngOnInit(): void {}

    //eliminar producto
    /**NOTA: Solo se puede eliminar el producto si no existe historial de algún pedido -
     * de ese producto, si existe ya algún pedido con el producto que queremos eliminar
     * dara error de eliminación.
    */ 
   deleteProduct(id: number) {
    this._apiProductoService.deleteProduct(id).subscribe(resp => {
        if (resp.success === 1) {
            this._dialogRef.close();
            this._mySnackBar.createMySnackBar('Producto eliminado con éxito', '');
        }else{
            this._mySnackBar.createMySnackBar(resp.message, 'error');
        }
    })
   }

   //cerrar dialog
   close() {
       this._dialogRef.close();
   }

}