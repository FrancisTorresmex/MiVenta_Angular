import { Component, Injectable, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Address } from '../../../models/address';


@Component({
    templateUrl: 'dialogAddress.component.html'
})
export class DialogAddressComponent {

    //llenado del fomulario de dirección reactiva
    public addressForm = this.formBuilder.group({
        estado: ['', Validators.required],
        colonia: ['', Validators.required],
        calle: ['', Validators.required],
        numero: ['', Validators.required]
    });
    
    constructor(
        private _dialogRef: MatDialogRef<DialogAddressComponent>,
        public formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public address : Address,
    ) 
    {

    }    

    ngOnInit(): void {}

    //Enviar la dirección a dialogShoppingCart.component.ts
    sendAddress() {
        // this.address = this.addressForm.value;
        this.address = {           
            estado: this.addressForm.value['estado'],
            colonia: this.addressForm.value['colonia'],
            calle: this.addressForm.value['calle'],
            numero: this.addressForm.value['numero'],
        }
        console.log('popo', this.address);
        this._dialogRef.close();
    }

    close() {
        this._dialogRef.close();
    }

}