import { Component, Inject } from '@angular/core';
import { ApiPedidoService } from '../../../services/apiPedido.service';
import { Orders } from '../../../models/orders';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
    templateUrl: 'dialogUserOrders.component.html'
})
export class DialogUserOrders {

    //convierto los datos de mi local storage en un objeto {id:x, rol:x...etc} para poder usar la id
    localObject = JSON.parse(localStorage.getItem('miUser') as string);    

    myOrders!:Orders[]; //para guardar el historial de pedidos recibidos del servicio

    constructor(
        private _apiPedidoService: ApiPedidoService,
        private _refDialog: MatDialogRef<DialogUserOrders>,
    ) 
    {}

    ngOnInit(): void {        
        //Le añado de parametro el id obtenido de parsear el localStorage
        this.getAllOrders(this.localObject['id'], 1);
    }

    //Llamar al servicio para ver mi historial de ordenes
    getAllOrders(id: number, pag: number) {
        this._apiPedidoService.getOrders(id, pag).subscribe(resp => {
            this.myOrders = resp.data //le asignamos a la lista la respuesta
            console.log(this.myOrders);
        });        
    }
    

    //Cerrar el dialog
    close() {
        this._refDialog.close();
    }

}