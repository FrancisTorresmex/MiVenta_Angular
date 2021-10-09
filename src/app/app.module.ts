import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DialogProductComponent } from './pages/home/dialog/dialogProduct.component';


import { HttpClientModule } from '@angular/common/http';


import { MatCardModule } from '@angular/material/card'; //card de material
import { MatButtonModule } from '@angular/material/button'; //botones material
import { MatDialogModule } from '@angular/material/dialog'; //dialog material
import { MatInputModule } from '@angular/material/input'; //input material
import { MatFormFieldModule } from '@angular/material/form-field'; //forms material




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DialogProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
