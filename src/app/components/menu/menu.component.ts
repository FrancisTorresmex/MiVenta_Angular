import { Component, OnInit } from '@angular/core';
import { ApiLoginService } from '../../services/apiLogin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor( private apiLoginService: ApiLoginService, private router: Router ) { }

  ngOnInit(): void {
  }

  //cerrar sesión
  logout() {
    this.apiLoginService.logout();
    this.router.navigate(['/login']);
  }

}
