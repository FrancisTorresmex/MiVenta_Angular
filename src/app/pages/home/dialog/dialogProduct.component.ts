import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiProductoService } from '../../../services/apiProducto.service';
import { Product } from '../../../models/product';
import { Concept } from '../../../models/concept';
import { ApiVentaService } from '../../../services/apiVenta.service';
import { Sale } from "src/app/models/sale";
import { Observable } from "rxjs";


@Component({
    templateUrl: 'dialogProduct.component.html'    
})
export class DialogProductComponent {
    
    //objetos 
    public sale!: Sale;  
    public concept: Concept[]; 
    
    //variable para la cantidad de articulos de ese producto 
    public cantidad: number = 0;        
    payment: number = 1000;  //por ahora el importe defecto es 1000, AÚN ESTA PENDIENTE AUTOMATIZAR
    

    constructor(
            private dialogRef: MatDialogRef<DialogProductComponent>, //en el constructor se encuentra mi objeto de MatDialogRef el cual es del tipo de esta misma clase para que se pueda cerrar el mismo, o asi            
            private apiVentaService: ApiVentaService,
            @Inject(MAT_DIALOG_DATA) public product: Product //lo que recibe este dialog de otros componentes
        ) {
            this.concept = []; //inicializo la lista
        }

    ngOnInit(): void {}
    
    //objeto que asigna lo que vaya recibiendo en la data del dialog para mostrarlo en el dialog
    public myproduct: Product  = { 
        id: this.product.id,
        nombre: this.product.nombre,
        precioUnitario: this.product.precioUnitario,
        existencia: this.product.existencia,
        url: this.product.url
    };    

    //agregar concepto
    public AddConcept() {        

        // datos del concepto a añadir
        const myconcept: Concept = {
            cantidad: this.cantidad,
            importe: this.payment,
            precioUnitario: this.product.precioUnitario,
            idProducto: this.product.id,                        
        }                        
        this.concept.push(myconcept);  //se agrega a la lista el concepto               

        this.dialogRef.close({  //al cerrar este dialog despues de presionar añadir (se envia esa data al componente home, para que la reciba ahi y añadirla al carrito)
            data: this.concept 
        });

        console.log(this.concept);                
    }

    //agregar venta
    public AddSale() {
        this.sale.conceptos = this.concept;
    }

    //Cerrar el dialosg
    close() {
        this.dialogRef.close();
    }
 
}