import { Component, OnInit } from '@angular/core';
import { ApiProductoService } from '../../services/apiProducto.service';
import { Product } from '../../models/product';
import { MySnackBarService } from '../../tools/snackBar.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddProduct } from './dialog/dialogAddProduct.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  lstProduct: Product[];

  readonly width: string = '600px'; //medida del dialog

  constructor(
    private _apiProductoService: ApiProductoService,
    private _dialog: MatDialog,
  ) 
  { 
    this.lstProduct = [];
    this.getProduct();
  }

  ngOnInit(): void {}

  //Obtener los productos
  getProduct() {
    this._apiProductoService.getProduct(1).subscribe(result => {
      this.lstProduct = result.data;
    });
  }


  //Abrir el dialog de product (crud)
  openDialogProductAdd() {
    const dialogRef = this._dialog.open(DialogAddProduct, {
      width: this.width
    });
  }

  openDialogProductEdit(producto: Product) {
    const dialogRef = this._dialog.open(DialogAddProduct, {
      width: this.width,
      data: producto      
    });         
  }

}
