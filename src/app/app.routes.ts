import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Carrito } from './pages/carrito/carrito';
import { Pasarela } from './pages/pasarela/pasarela';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'carrito', component: Carrito },
  { path: 'pasarela', component: Pasarela },
];
