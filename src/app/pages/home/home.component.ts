import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiProductoService } from '../../services/apiProducto.service';
import { DialogProductComponent } from './dialog/dialogProduct.component';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { Concept } from '../../models/concept';
import { CartProduct } from '../../models/cartProduct';
import { MySnackBarService } from '../../tools/snackBar.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public lst: any[]; //lista para guardar todos los articulos recibidos

  breakpoint: any;

  searchArticle: any; //variable que almacenara lo que escribamos en el imput del buscador

  public cart!: CartProduct[]; //lista temporal que almacenara todo lo que vayamos añadiendo al carrito (conceptos: id del producto, cantidad etc)

  page: number; //Página de la api de productos a mostrar
  
  readonly width: string = '300px'; //tamaño de dialog

  constructor(
      private _apiProductoService: ApiProductoService,
      private _dialog: MatDialog,       
      private _mySnackBar : MySnackBarService
      ) {
        this.lst = [];
        this.cart = []; //inicializo la lista        
        this.page = 1;
        this.getProduct();        
      }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  }

  //Obtener datos del servicio
  getProduct() {
    this._apiProductoService.getProduct( this.page ).subscribe(resp => {
      this.lst = resp.data; //lst se le asigna lo que venga en resp.data      

      if(resp.success == 0) {
        this._mySnackBar.createMySnackBar(resp.message, 'error'); //si la resp es 0, mandamos el mensaje de error recibido de la api
      }
      console.log(resp);                        
    }, (error)=> {
      this._mySnackBar.createMySnackBar('Vérifica tu conexión a internet.', 'error');      
    });
  }


  //Pasar a la siguiente página de la lista de productos
  nextPage() {
    this.page = ++this.page;
    this.getProduct();
  }


  //Pasar a la anterior página de la lista de productos
  previousPage() {
    this.page = --this.page;
    this.getProduct();
  }


  f($event: CartProduct[]) {
    this.cart = $event;
  }

  //mostrar inicio de administrador
  homeAdmin() {
    var isAdmin = JSON.parse(localStorage.getItem("miUser") as string);
    if (isAdmin['rol'] == "admin") return true;
    
    return false;
  }

  //Buscar productos por id o nombre
  search() {
    this._apiProductoService.searchProduct(this.searchArticle).subscribe(resp => {
      if (resp.success === 1) {
        this.lst = resp.data;
        if (this.lst.length <= 0) {
          this._mySnackBar.createMySnackBar('No existe el producto buscado, intenta con un nombre distinto', 'error');
          this.getProduct(); //recargo los productos (para evitar que la pantalla quede en blanco por no encontrar productos)
        }        
      }else{        
        this._mySnackBar.createMySnackBar(resp.message, 'error');        
      }
    }, (error) => {
      this._mySnackBar.createMySnackBar("Vérifica tu conexión a internet", 'error');
    });
  }


  //Mostrar gird según tamaño de pantalla
  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
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
