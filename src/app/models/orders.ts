import { Address } from './address';


//Este modelo es encargado de modelar el historal de pedidos de un usuario

export interface Orders {

    fecha: string,
    idCliente: number,
    idUsuario: number,
    idVenta: number,
    total: number,
    entrega: boolean;

    laDireccion: Address,

    losConceptos: LosConceptos[]
}

//aqui se creo otro modelo en lugar de usar el modelo Concept.ts
//porque al ver la orden y al ser otra peticion distinta, requiero ver el nombre del producto no solo la id
// cosa que la petición ver ordenes de usuario si recibe
export interface LosConceptos {
    cantidad: number;
    importe: number;
    precioUnitario: number;   
    nombreProducto: string, 
    idProducto: number;
}