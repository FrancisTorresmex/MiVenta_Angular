import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiProductoService } from '../../services/apiProducto.service';
import { DialogProductComponent } from './dialog/dialogProduct.component';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { Concept } from '../../models/concept';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public lst!: any[];

  public concept!: Concept[];

  readonly width: string = '300px'; //tamaño de dialog

  constructor(
      private _apiProductoService: ApiProductoService,
      private _dialog: MatDialog, 
      ) { 

  }

  ngOnInit(): void {
    this.getProduct(); //cada que inicie se ejecuta el método   
    this.concept = []; //inicializo la lista
  }

  //Obtener datos del servicio
  getProduct() {
    this._apiProductoService.getProduct().subscribe(resp => {
      this.lst = resp.data; //lst se le asigna lo que venga en resp.data            
    });
  }

  
  //abrir dialog product
  openDialog( product: Product ) {
    const dialogRef = this._dialog.open(DialogProductComponent, {
      width: this.width,
      data: product //la data que recibira el dialog       
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProduct(); //una vez que se cierre el dialog, volvemos a ejecutar el metodo getProduct
      this.concept.push(result); //agregamos a la lista concept lo que recibamos del dialog (en este caso el concepto del producto (cantidad, precio, id etc))
      console.log(this.concept);
    });
  }

}
