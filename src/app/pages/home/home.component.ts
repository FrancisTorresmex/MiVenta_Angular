import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiProductoService } from '../../services/apiProducto.service';
import { DialogProductComponent } from './dialog/dialogProduct.component';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { Concept } from '../../models/concept';
import { CartProduct } from '../../models/cartProduct';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public lst!: any[];

  public cart!: CartProduct[]; //lista temporal que almacenara todo lo que vayamos añadiendo al carrito (conceptos: id del producto, cantidad etc)
  
  readonly width: string = '300px'; //tamaño de dialog

  constructor(
      private _apiProductoService: ApiProductoService,
      private _dialog: MatDialog,       
      ) {                  
      }

  ngOnInit(): void {        
    this.getProduct(); //cada que inicie se ejecuta el método       
    this.cart = []; //inicializo la lista    
  }

  //Obtener datos del servicio
  getProduct() {
    this._apiProductoService.getProduct().subscribe(resp => {
      this.lst = resp.data; //lst se le asigna lo que venga en resp.data                        
    });
  }


  f($event: CartProduct[]) {
    this.cart = $event;
  }
  
  //abrir dialog product
  openDialogProduct( product: Product ) {
    const dialogRef = this._dialog.open(DialogProductComponent, {
      width: this.width,
      data: product //la data que recibira el dialog       
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProduct(); //una vez que se cierre el dialog, volvemos a ejecutar el metodo getProduct            
      //me interesa insertar en la lista por ejemplo 0: {cantidad: 0, precioUnitario: 56.5, nombre: 'botella de café'}  (si el result no es null obvio)  
      if(result != null){
        this.cart.push(result.data[0]); //agregamos a la lista concept lo que recibamos del dialog (en este caso el concepto del producto (cantidad, precio, id etc)), solo quiero la data (la data es algo de sistema al hacer push luego d eun subscribe)
      }        
      console.log(this.cart);
    });
  }

}
