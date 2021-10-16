import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiLoginService } from '../../services/apiLogin.service';
import { Router } from '@angular/router';
import { Concept } from '../../models/concept';
import { MatDialog } from '@angular/material/dialog';
import { DialogShoppingCart } from '../../pages/home/dialog/dialogShoppingCart.component';
import { CartProduct } from '../../models/cartProduct';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  readonly width: string = '600px'; //para darle una medida al dialog que se abrira

  @Input() dataCart!: CartProduct[]; //para enviarla a recibir información de home.component, y regresar con esa información aqui para enviarsela luego a dialog como data

  @Output() newDataCart: EventEmitter<CartProduct[]> = new EventEmitter; //para comunicar si algo se borro en el carrito y lo mandamos al home.component.ts (para repmplazar ahi esa lista por la nueva)

  constructor( private apiLoginService: ApiLoginService, private router: Router, private _dialog: MatDialog ) {}

  ngOnInit(): void {}  

  //abrir dialog de carrito de compras
  openDialogShopping() {
      const dialogRef = this._dialog.open(DialogShoppingCart, {
          width: this.width,
          data: this.dataCart, //envia de data al dialog, lo que contiene la cariable dataCart          
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result != null) { //si el result que viene de respuesta del dialog no es null, modificamos la lista, ya que se elimino algun producto del carrito
          this.dataCart = result.data;                  
          console.log('menudata: ', result);
        }
        this.newDataCart.emit(this.dataCart);  //emitimos los cambios                                             
      })           
  }

  //cerrar sesión
  logout() {
    this.apiLoginService.logout();
    this.router.navigate(['/login']);
  }

}
