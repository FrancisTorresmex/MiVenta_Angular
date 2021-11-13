import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiLoginService } from '../../services/apiLogin.service';
import { Router } from '@angular/router';
import { Concept } from '../../models/concept';
import { MatDialog } from '@angular/material/dialog';
import { DialogShoppingCart } from '../../pages/home/dialog/dialogShoppingCart.component';
import { CartProduct } from '../../models/cartProduct';
import { DialogUserOrders } from './dialog/dialogUserOrders.component';
import { DialogAllOrders } from './dialog/dialogAllOrders.component';
import { UserComponent } from '../../pages/user/user.component';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  readonly width: string = '600px'; //para darle una medida al dialog que se abrira
  readonly height: string = '700px';

  @Input() dataCart!: CartProduct[]; //para enviarla a recibir información de home.component, y regresar con esa información aqui para enviarsela luego a dialog como data

  @Output() newDataCart: EventEmitter<CartProduct[]> = new EventEmitter; //para comunicar si algo se borro en el carrito y lo mandamos al home.component.ts (para repmplazar ahi esa lista por la nueva)

  isAdm: boolean =  false;

  showFiller = false; //ver menú (nav)

  constructor( 
    private apiLoginService: ApiLoginService, 
    private router: Router, 
    private _dialog: MatDialog ) 
    {            
      this.isAdmin();
    }

  ngOnInit(): void {}  

  //abrir dialog de carrito de compras
  openDialogShopping() {
      const dialogRef = this._dialog.open(DialogShoppingCart, {
          width: this.width,
          height: '600px',       
          data: this.dataCart, //envia de data al dialog, lo que contiene la variable dataCart          
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result != null) { //si el result que viene de respuesta del dialog no es null, modificamos la lista, ya que se elimino algun producto del carrito
          this.dataCart = result.data;                  
          console.log('menudata: ', result);
        }
        this.newDataCart.emit(this.dataCart);  //emitimos los cambios                                             
      })           
  }

  //abrir dialog de ver ordenes (usuario en sesión)
  openDialogUserOrders() {
    const dialogRef = this._dialog.open( DialogUserOrders, {
      width: this.width,
      height: this.height
    });
  }

  //abrir dialog de ver todas las ordenes (admin)
  openDialogAllOrders() {
    const dialogRef = this._dialog.open(DialogAllOrders, {
      width: this.width,
    });
  }

  //abrir dialog de modificar cuenta
  openDialogUser() {
    const dialogRef = this._dialog.open(UserComponent, {
      width: this.width
    })
  };

  //cerrar sesión
  logout() {
    this.apiLoginService.logout();
    this.router.navigate(['/login']);
  }

  //para mostrar el menu de rol normal o admin
  isAdmin() {
    var isAdmin;
    var x = JSON.parse(localStorage.getItem('miUser')!);    
    if (x != null) {
      isAdmin = x['rol'];  
    }    

    if(isAdmin === "admin") {
      return  true;
    }
    return false;
  }


}
