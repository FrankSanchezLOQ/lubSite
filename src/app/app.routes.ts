import { Routes } from '@angular/router';
import { Productos } from './pages/productos/productos';
import { Home } from './pages/home/home';
import { Contactanos } from './pages/contactanos/contactanos';
import { Catalogo } from './pages/catalogo/catalogo';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'productos', component: Productos },
    { path: 'contactanos', component: Contactanos },
    { path: 'catalogo/:categoria/:marca', component: Catalogo }
];
