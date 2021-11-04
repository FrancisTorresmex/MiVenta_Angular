import { Component, OnInit } from '@angular/core';
import { ApiProductoService } from '../../../../services/apiProducto.service';
import { Product } from '../../../../models/product';
import { FormBuilder, Validators } from '@angular/forms';
import { MySnackBarService } from '../../../../tools/snackBar.service';


@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  constructor( 
    private _apiProductoService: ApiProductoService,
     private _formBuilder: FormBuilder,
     private _mySnackbar: MySnackBarService,
     ) { }

  //lo que se escirbe en el formulario
  public productoForm = this._formBuilder.group({
    nombre: ['', Validators.required],
    precioUnitario: ['', Validators.required],
    existencia: ['', Validators.required],
    url: [''],
  });

  ngOnInit(): void {
  }

  //Agregar producto (admin)
  addProduct() {
    this._apiProductoService.addProduct(this.productoForm.value).subscribe(resp => {
      if(resp.success == 1) {
        this._mySnackbar.createMySnackBar('Producto creado con éxito', '');
      }
    });
  }

}
