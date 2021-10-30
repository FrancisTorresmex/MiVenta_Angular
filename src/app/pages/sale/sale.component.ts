import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Address } from '../../models/address';
import { Router } from '@angular/router';
import { Sale } from '../../models/sale';
import { MatDialog } from '@angular/material/dialog';
import { ApiVentaService } from '../../services/apiVenta.service';
import { MySnackBarService } from '../../tools/snackBar.service';
import { CartProduct } from '../../models/cartProduct';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  // recibimos datos de dialogCartComponent (todos los datos de la venta, menos la dirección, la dirección se llena aqui)
  @Input() myOrder!: Sale;
  
  //Enviamos los cambios a dialogShopping (ya que en dialogShopping necesito vaciar las listas luego de hacer el pedido)
  @Output() cleanLst: EventEmitter<CartProduct[]> = new EventEmitter;
  listEmpty!: CartProduct[];
  

  constructor(  
    private _formBuilder: FormBuilder,    
    private _dialogRef: MatDialog,
    private _apiVentaService : ApiVentaService, 
    private _mySnackBarService: MySnackBarService,
  ) 
  { 
    this.myOrder;    
  }

    public addressForm = this._formBuilder.group({ //datos del formulario
      estado: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      numero: ['', Validators.required],
    });

  ngOnInit(): void {    
    console.log('llegue aqui papu:', this.myOrder);
  }


  //agregar dirección
  addAddress() {
    // this.myAddress.emit(this.addressForm.value);
    this.myOrder.direccion = this.addressForm.value; //añadimos la dirección
    console.log('f', this.myOrder);
  }


  //Enviar el pedido al servicio (API)
  sendSale() {
    this.addAddress(); //ejecutamos método para añadir la dirección    

    this._apiVentaService.Add(this.myOrder).subscribe(resp => {
      if(resp.success === 1) {
        this._mySnackBarService.createMySnackBar('Pedido realizado exitosamente', '');
        this.cleanLst.emit(this.listEmpty); //emitimos el cambio, para luego decir a dialogShoppingCart.ts que vacie la lista porque se hizo el envio correctamente
      }else{
        this._mySnackBarService.createMySnackBar(resp.message, 'error');
      }      
    }, (error) => { //algún error lo atrapamos
      this._mySnackBarService.createMySnackBar('Tienes en tu carrito un articulo con error en la cantidad, mínimo 1', 'error');
    }
    )
    console.log('venta', this.myOrder);         
  }

  
  //Cerrar el dialog (como en si no petenece a este componente ese dialog, use closeAll)
  close() {    
    this._dialogRef.closeAll();
  }

}
