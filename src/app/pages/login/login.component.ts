import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiLoginService } from 'src/app/services/apiLogin.service';
import { MySnackBarService } from '../../tools/snackBar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {  

  constructor(private _apiLoginService: ApiLoginService, public _formBuilder: FormBuilder, private _router: Router, private _mysnackbar: MySnackBarService) {     
    //al entrar a esta página vemos si userData es null, si no es null significa que ya hay algo en el localstorage osea inico de sesión
    //y lo mandamos a home (esto es por si el usuario pone en el biscador el www.../login asi evitamos multiples inicios)
    if(this._apiLoginService.userData) this._router.navigate(['/home']);        
  }
  
  //para usar un formGrup en html, y llamar a estos campos con su validator
  public loginForm = this._formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit(): void {}

  //login (entre prametros los valores de loginForm)
  login() {
    // console.log(this.loginForm.value);
    this._apiLoginService.login( this.loginForm.value ).subscribe(resp => {      
        if (resp.success === 1) {     
          this._router.navigate(['/home']);                         
          this._mysnackbar.createMySnackBar('Bienvenido', '');                            
        }else{
          this._mysnackbar.createMySnackBar(resp.message, 'error');
        }
    });
  }

}
