import { Component, Input, OnInit } from '@angular/core';
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

  @Input() dataCart: CartProduct[] = []; //para enviarla a recibir información de home.component, y regresar con esa información aqui para enviarsela luego a dialog como data

  constructor( private apiLoginService: ApiLoginService, private router: Router, private _dialog: MatDialog ) { }

  ngOnInit(): void {}  

  //abrir dialog de carrito de compras
  openDialogShopping() {
      const dialogRef = this._dialog.open(DialogShoppingCart, {
          width: this.width,
          data: this.dataCart, //envia de data al dialog, lo que contiene la cariable dataCart          
      });           
  }

  //cerrar sesión
  logout() {
    this.apiLoginService.logout();
    this.router.navigate(['/login']);
  }

}
