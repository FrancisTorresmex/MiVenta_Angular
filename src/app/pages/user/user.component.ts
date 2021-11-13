import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '../../services/apiUser.service';
import { MySnackBarService } from '../../tools/snackBar.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiLoginService } from 'src/app/services/apiLogin.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit { //esta clase es tambien un dialog

  //para ver los datos del local storage
  local = JSON.parse(localStorage.getItem("miUser") as string);

  //Varaibles para mostrar contenido del html según se requiera
  editar: boolean = false;
  opcion: string = ''; //esto es para indicar si se quiere ir a la parte de modificar nombre o modificar contraseña

  constructor(
    private _apiUserService: ApiUserService,
    private _formBuilder: FormBuilder,
    private _mySnackBar: MySnackBarService,
    private _router: Router,
    private _apiLoginService: ApiLoginService, //para usar el metodo de logout
    private _dialogRef: MatDialogRef<UserComponent>
  ) 
  { }

  ngOnInit(): void {
  }

  //Campos del formulario
  public userUpdateName = this._formBuilder.group({
    id: [this.local['id'], Validators.required],
    nombre: [this.local['nombre'], Validators.required],    
  });

  //Campos del formulario
  public userUpdatePassword = this._formBuilder.group({
    id: [this.local['id'], Validators.required],    
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
  });

  //Actualizar nombre de usuario
  updateName() {
    this._apiUserService.updateUserName(this.userUpdateName.value).subscribe(result => {
      if (result.success === 1) { 
        this._apiLoginService.logout();                  
        this._router.navigate(['/login']);
        this._dialogRef.close();
        this._mySnackBar.createMySnackBar('Datos modificados con éxito, debes iniciar sesión con los nuevos datos', '');        
      }else{
        this._mySnackBar.createMySnackBar(result.message, 'error');
      }
    }, (error) => {
      this._mySnackBar.createMySnackBar('Vérifica tu conexión a internet.', 'error');      
    });
  }

  //Actualizar contraseña de usuario
  updatePassword() {
    this._apiUserService.updateUserPassword(this.userUpdatePassword.value).subscribe(result => {
      if (result.success === 1) {
        this._apiLoginService.logout();                  
        this._router.navigate(['/login']);
        this._dialogRef.close();
        this._mySnackBar.createMySnackBar('Datos modificados con éxito, debes iniciar sesión con los nuevos datos', '');
      }else{
        this._mySnackBar.createMySnackBar(result.message, 'error');
      }
    }, (error) => {
      this._mySnackBar.createMySnackBar('Vérifica tu conexión a internet.', 'error');
    });
  }


  //Cerrar el dialog
  close() {
    this._dialogRef.close();
  }
 
}
