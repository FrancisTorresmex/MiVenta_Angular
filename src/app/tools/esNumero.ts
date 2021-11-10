
/**
 * Clase creada para validar si lo que recibimos de algún imput de un formulario 
 * es number o es string.
 * 
 * Se usaba para las busquedas de productos por ID o nombre, 
 * pero mi backend ahora lo realiza, así que por el momento no se usa en este proyecto.
*/

export class EsNumero {

    constructor() {}

    static validarEntero(valor: any) {

        //vemos si se puede parsear el valor recibido (osea convertirlo a entero)
        var isNumber = parseInt(valor); 
        
        //si se pudo parsear al hacer la comprobación con Number.isInteger
        //y retornara true, de lo contrario false
        if (Number.isInteger(isNumber)) { 
            return true;
        }
        return false;
    }

}