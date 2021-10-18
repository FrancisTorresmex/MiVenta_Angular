import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiRegisterService } from '../../services/apiRegister.service';
import { Router } from '@angular/router';
import { MySnackBarService } from '../../tools/snackBar.service';
import { ApiLoginService } from 'src/app/services/apiLogin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder, 
    private _apiRegisterService: ApiRegisterService,
    private _apiLoginService: ApiLoginService,
    private _router: Router,
    private _mysnackbar: MySnackBarService,
    ) 
    { 
    //al entrar a esta página vemos si userData es null, si no es null significa que ya hay algo en el localstorage osea inico de sesión
    //y lo mandamos a home (esto es por si el usuario pone en el biscador el www.../register asi evitamos multiples inicios)
      if(_apiLoginService.userData) _router.navigate(['/home']);
    }

  public registerForm = this._formBuilder.group({ //para usar un formGrup en html, y llamar a estos campos con su validator
    email: ['', Validators.required],    
    password: ['', Validators.required],
    nombre: ['', Validators.required],
  });

  ngOnInit(): void {}

  //Registrarme
  register() {
    this._apiRegisterService.register(this.registerForm.value).subscribe(resp => {
        if(resp.success === 1) {          
          this._router.navigate(['/login']);
          this._mysnackbar.createMySnackBar('Registro exitoso, inicie sesión', '')
        }else{
          this._mysnackbar.createMySnackBar(resp.message, 'error');
        }
    })
  }

}
