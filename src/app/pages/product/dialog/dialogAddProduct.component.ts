import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MySnackBarService } from '../../../tools/snackBar.service';
import { ApiProductoService } from '../../../services/apiProducto.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';


@Component({
    templateUrl: 'dialogAddProduct.component.html',
    styleUrls: ['./dialogAddProduct.component.scss']
})
export class DialogAddProduct {

  productForm!: FormGroup;

    constructor(
        private _formBldr: FormBuilder,
        private _mySnackBar: MySnackBarService,
        private _dialogRef: MatDialogRef<DialogAddProduct>,
        private _apiProductoService: ApiProductoService,
        //lo que recibo de product.component.ts, antes de abrir este dialog
        //si product viene null significa que se quiere añadir un producto, product viene con datos es porque se quiere modificar
        @Inject(MAT_DIALOG_DATA) public product: Product,
    ) 
    {
      //Si product es null muestra campos vacios, si no muestra la información del producto a modificar
      if(product == null) {
        //campos del formulario reactivo
        this.productForm = this._formBldr.group({
          nombre: ['', Validators.required],
          precioUnitario: ['', Validators.required],
          existencia: ['', Validators.required],
          url: ['']
        })
      }else{
        //campos del formulario reactivo
        this.productForm = this._formBldr.group({      
          id: [product.id, Validators.required],   //se le añade la id que ya viene en el product seleccionado (porque la petición la requiere) 
          nombre: [product.nombre, Validators.required],
          precioUnitario: [product.precioUnitario, Validators.required],
          existencia: [product.existencia, Validators.required],
          url: [product.url]
        })
      }
    }

    ngOnInit(): void {}
    

    //Agregar producto
    add() {
        this._apiProductoService.addProduct(this.productForm.value).subscribe(resp => {
          if(resp.success === 1) {
            this._dialogRef.close();
            this._mySnackBar.createMySnackBar("Producto creado correctamente", '');
          }else{
            this._mySnackBar.createMySnackBar(resp.message, 'error');
          }
        }, (error) => {
          console.log(error);
      });
    }

    //Editar producto
    edit() {
      this._apiProductoService.editProduct(this.productForm.value).subscribe(resp => {
        if(resp.success === 1) {
          this._dialogRef.close();
          this._mySnackBar.createMySnackBar('Producto editado correctamente', '');
        }else{
          this._mySnackBar.createMySnackBar(resp.message, 'error');
        }
      });
    }


    //Cerrar el dialog
    close() {
      this._dialogRef.close();
    }
    

}