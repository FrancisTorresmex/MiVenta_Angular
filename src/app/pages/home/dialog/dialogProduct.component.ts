import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Product } from '../../../models/product';
import { Concept } from '../../../models/concept';
import { Sale } from "src/app/models/sale";
import { CartProduct } from '../../../models/cartProduct';
import { MySnackBarService } from '../../../tools/snackBar.service';



@Component({
    templateUrl: 'dialogProduct.component.html',
    styleUrls: ['./dialogProduct.component.scss']    
})
export class DialogProductComponent {
    
    //objetos         
    public cart: CartProduct[];
            
    quantity: number = 0;      //variable para la cantidad de articulos de ese producto 
    payment: number = 1000;  //por ahora el importe defecto es 1000, AÚN ESTA PENDIENTE AUTOMATIZAR        

    constructor(
            private dialogRef: MatDialogRef<DialogProductComponent>, //en el constructor se encuentra mi objeto de MatDialogRef el cual es del tipo de esta misma clase para que se pueda cerrar el mismo, o asi                        
            private _mysnackbar: MySnackBarService,
            @Inject(MAT_DIALOG_DATA) public product: Product //lo que recibe este dialog de otros componentes
        ) {
            //inicializo la lista
            this.cart = [];            
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
    AddToCart() {        
        // datos del concepto a añadir
        const myCart: CartProduct = {
            idProducto: this.product.id,
            cantidad: this.quantity,            
            precioUnitario: this.product.precioUnitario,
            nombre: this.myproduct.nombre,                       
        }                        
        this.cart.push(myCart);  //se agrega a la lista el concepto
        this._mysnackbar.createMySnackBar('Articulo agregado al carrito', '');               

        this.dialogRef.close({  //al cerrar este dialog despues de presionar añadir (se envia esa data al componente home, para que la reciba ahi y añadirla al carrito)            
            data: this.cart 
        });
        // console.log(this.concept);                
    }

    //añadir +1 a quantity
    addNum() {
        this.quantity = ++this.quantity;
        console.log(this.quantity);        
    }

    //restar -1 a quantity
    restNum() {
        if(this.quantity > 0) this.quantity = --this.quantity;  //si el numero es mayor a 0 se podra restar, nunca sera menos de 0      
        console.log(this.quantity);
    }


    // //agregar concepto
    // AddConcept() {        
    //     // datos del concepto a añadir
    //     const myconcept: Concept = {
    //         cantidad: this.cantidad,
    //         importe: this.payment,
    //         precioUnitario: this.product.precioUnitario,
    //         idProducto: this.product.id,                        
    //     }                        
    //     this.concept.push(myconcept);  //se agrega a la lista el concepto               

    //     this.dialogRef.close({  //al cerrar este dialog despues de presionar añadir (se envia esa data al componente home, para que la reciba ahi y añadirla al carrito)
    //         data: this.concept 
    //     });
    //     // console.log(this.concept);                
    // }


    //Cerrar el dialosg
    close() {
        this.dialogRef.close();
    }
 
}