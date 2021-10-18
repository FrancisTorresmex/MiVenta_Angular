
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";


//Archivo creado para generar un snackBar y evitar repetir este bloque de código cada vez

@Injectable({
    providedIn: 'root'
})
export class MySnackBarService {

    constructor(private _snackbar: MatSnackBar) {}

    //Generar snackBar (con duración de 2 seg)
    public createMySnackBar(message: string, type: string) {

        let myColor;

        if (type == 'error') { //si el tipo recibido es error es rojo si no verde (se deja en '', y lo toma como verde)
            myColor = ['background-red'];
        }else{
            myColor = ['background-green'];
        }

        this._snackbar.open(message, '', {
            duration: 2000,
            panelClass: myColor //el color del snackBar (con el estilo global en styles.scss)
        });
    }        

}