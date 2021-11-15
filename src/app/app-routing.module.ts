import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './security/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/notFound/notFound.component';
import { ProductComponent } from './pages/product/product.component';
import { RoleGuard } from './security/role.guard';
import { UserComponent } from './pages/user/user.component';


const routes: Routes = [ 
  { path: 'login', component: LoginComponent}, // este no lleva el CanActive porque ha este si pueden acceder
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},  //para entrar aqui necesita cumplir con el canActive creado (en este caso estar logeado)      
  {path: 'product', component: ProductComponent, canActivate: [AuthGuard, RoleGuard]}, //RoleGuard es mi guard creado para que solo entren personas con rol admin en ese apartado

  { path: '', redirectTo: '/login' , pathMatch: 'full'},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
