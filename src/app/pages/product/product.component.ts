import { Component, OnInit } from '@angular/core';
import { ApiProductoService } from '../../services/apiProducto.service';
import { Product } from '../../models/product';
import { MySnackBarService } from '../../tools/snackBar.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddProduct } from './dialog/dialogAddProduct.component';
import { DialogConfirmDelete } from './dialog/dialgConfirmDelete.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  page: number; //página de productos que se mostrara  

  lstProduct: Product[]; //lista donde se guarda todo lo recibido al cargar todos los productos

  //input del formulario para buscar productos (any porque puede ser number o string)
  search: any;  

  readonly width: string = '600px'; //medida del dialog

  constructor(
    private _apiProductoService: ApiProductoService,
    private _mySnackBar: MySnackBarService,
    private _dialog: MatDialog,
  ) 
  {            
    this.lstProduct = [];       
    this.page = 1;
    this.getProduct();         
  }

  ngOnInit(): void {}

  //Obtener los productos
  getProduct() {
    this._apiProductoService.getProduct(this.page).subscribe(result => {
      if(result.success === 1) {
        this.lstProduct = result.data;
      }else{
        this._mySnackBar.createMySnackBar(result.message, 'error');
      }      
    }, (error) => {
      this._mySnackBar.createMySnackBar('Vérifica que estes concectado a internet', 'error');
    });
  }

  //Pasar a la siguiente página de productos
  nextPage() {
    this.page = ++this.page;
    this.getProduct();
  }


  //Pasar a la anterior página de productos
  previousPage() {
    this.page = --this.page;
    this.getProduct();
  }


  //Buscar articulos por id o nombre
  searchProduct() {
    this._apiProductoService.searchProduct(this.search).subscribe(resp => {
      if (resp.success === 1) {
        console.log(resp);
        this.lstProduct = resp.data;
      }else{
        this._mySnackBar.createMySnackBar(resp.message, 'error');
      }
    }, (error) => {
      console.log(error);
      this._mySnackBar.createMySnackBar('f', 'error');
    })
  }


  //Abrir el dialog de product (crud add)
  openDialogProductAdd() {
    const dialogRef = this._dialog.open(DialogAddProduct, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProduct();
    });
  }

  //Abrir el dialog product (crud edit)
  openDialogProductEdit(producto: Product) {
    const dialogRef = this._dialog.open(DialogAddProduct, {
      width: this.width,
      data: producto      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProduct();
    });         
  }

  // //Abrir dialog para confirmar la eliminación de producto
  openDialogConfirmDelete( producto: Product ) {
    const dialogRef = this._dialog.open(DialogConfirmDelete, {
      width: this.width,
      data: producto
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProduct();
    })
  }

}
