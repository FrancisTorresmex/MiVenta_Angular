import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MySnackBarService } from '../../../tools/snackBar.service';
import { ApiProductoService } from '../../../services/apiProducto.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';


@Component({
    templateUrl: 'dialogAddProduct.component.html'
})
export class DialogAddProduct {

  productForm!: FormGroup;

    constructor(
        private _formBldr: FormBuilder,
        private _mySnackBar: MySnackBarService,
        private _apiProductoService: ApiProductoService,
        //lo que recibo de product.component.ts, antes de abrir este dialog
        //si product viene null significa que se quiere añadir un producto, product viene con datos es porque se quiere modificar
        @Inject(MAT_DIALOG_DATA) public product: Product,
    ) 
    {
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
            this._mySnackBar.createMySnackBar("Producto creado correctamente", '');
          }
        }, (error) => {
          console.log(error);
      });
    }

    //Editar producto
    edit() {
      console.log(this.product);
    }
    

}