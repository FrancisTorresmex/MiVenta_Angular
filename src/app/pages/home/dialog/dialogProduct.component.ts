import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiProductoService } from '../../../services/apiProducto.service';
import { Product } from '../../../models/product';



@Component({
    templateUrl: 'dialogProduct.component.html'    
})
export class DialogProductComponent {

    constructor(
            private dialogRef: MatDialogRef<DialogProductComponent>, //en el constructor se encuentra mi objeto de MatDialogRef el cual es del tipo de esta misma clase para que se pueda cerrar el mismo, o asi
            private apiProductService: ApiProductoService,
            @Inject(MAT_DIALOG_DATA) public product: Product //lo que recibe este dialog de otros componentes
        ) {}
    
    //objeto que asigna lo que vaya recibiendo en la data del dialog
    public myproduct: Product  = { 
        id: this.product.id,
        nombre: this.product.nombre,
        precioUnitario: this.product.precioUnitario,
        existencia: this.product.existencia,
        url: this.product.url
    };

    //Cerrar el dialosg
    close() {
        this.dialogRef.close();
    }
    
    

    


}