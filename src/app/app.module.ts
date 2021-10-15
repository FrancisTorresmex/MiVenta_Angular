import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DialogProductComponent } from './pages/home/dialog/dialogProduct.component';
import { DialogShoppingCart } from './pages/home/dialog/dialogShoppingCart.component';
import { MenuComponent } from './components/menu/menu.component'; 


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //para formularios (FormsModule), para formularios reactivos (todo dentro de un grupo) se usa ReactiveFormsModule



import { MatCardModule } from '@angular/material/card'; //card de material
import { MatButtonModule } from '@angular/material/button'; //botones material
import { MatDialogModule } from '@angular/material/dialog'; //dialog material
import { MatInputModule } from '@angular/material/input'; //input material
import { MatFormFieldModule } from '@angular/material/form-field'; //forms material
import { MatToolbarModule } from '@angular/material/toolbar'; //tolbar material
import { MatIconModule } from '@angular/material/icon';
import { SaleComponent } from './pages/sale/sale.component';







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DialogProductComponent,
    DialogShoppingCart,
    MenuComponent,
    SaleComponent,
    
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
