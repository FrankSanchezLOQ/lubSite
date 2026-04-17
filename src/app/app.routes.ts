import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Productos } from './pages/productos/productos';
import { Contactanos } from './pages/contactanos/contactanos';
import { Catalogo } from './pages/catalogo/catalogo';
import { Carrito } from './pages/carrito/carrito';
import { Pasarela } from './pages/pasarela/pasarela';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'productos', component: Productos },
  { path: 'contactanos', component: Contactanos },
  { path: 'catalogo/:categoria/:marca', component: Catalogo },
  { path: 'carrito', component: Carrito },
  { path: 'pasarela', component: Pasarela },
];
