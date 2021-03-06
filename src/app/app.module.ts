import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductComponent } from './pages/product/product.component'; 
import { UserComponent } from './pages/user/user.component'; 
import { DialogProductComponent } from './pages/home/dialog/dialogProduct.component';
import { DialogShoppingCart } from './pages/home/dialog/dialogShoppingCart.component';
import { DialogUserOrders } from './components/menu/dialog/dialogUserOrders.component';
import { DialogAllOrders } from './components/menu/dialog/dialogAllOrders.component';
import { DialogAddProduct } from './pages/product/dialog/dialogAddProduct.component';
import { DialogConfirmDelete } from './pages/product/dialog/dialgConfirmDelete.component';





import { MenuComponent } from './components/menu/menu.component'; 
import { SaleComponent } from './pages/sale/sale.component';
import { NotFoundComponent } from './pages/notFound/notFound.component';


import { JwtInterceptor } from './security/jwt.interceptor';


import { HttpClientModule } from '@angular/common/http'; //hacer peticiones http
import { HTTP_INTERCEPTORS } from '@angular/common/http'; //para los interceptores (lo uso en jwt.interface)

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //para formularios (FormsModule), para formularios reactivos (todo dentro de un grupo) se usa ReactiveFormsModule



import { MatCardModule } from '@angular/material/card'; //card de material
import { MatButtonModule } from '@angular/material/button'; //botones y icon button material
import { MatDialogModule } from '@angular/material/dialog'; //dialog material
import { MatInputModule } from '@angular/material/input'; //input material
import { MatFormFieldModule } from '@angular/material/form-field'; //forms material
import { MatToolbarModule } from '@angular/material/toolbar'; //tolbar material
import { MatIconModule } from '@angular/material/icon'; //iconos material
import { MatSnackBarModule } from '@angular/material/snack-bar'; //snackbar material
import {MatGridListModule} from '@angular/material/grid-list';  //Gird material
import { MatMenuModule } from '@angular/material/menu'; //men?? material
import {MatSidenavModule} from '@angular/material/sidenav'; //nav material
import {MatChipsModule} from '@angular/material/chips'; //chips material





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DialogProductComponent,
    DialogShoppingCart, 
    DialogUserOrders,   
    DialogAllOrders,
    MenuComponent,
    SaleComponent,
    NotFoundComponent,    
    ProductComponent,
    DialogAddProduct,    
    DialogConfirmDelete, UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatGridListModule,
    MatMenuModule,
    MatSidenavModule,
    MatChipsModule,
  ],
  providers: [
    //le agreglo la constante llamada Http_interseptor(es de sistema), que use mi clase creada llamada JwtInterceptor
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true} 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
