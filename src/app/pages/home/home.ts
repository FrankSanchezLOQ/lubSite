import { Component, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnDestroy {
  private router = inject(Router);

  // ── Carrusel hero ───────────────────────────────────────
  slides = [
    {
      imagen: '/header.png',   // mientras no tengas hero1/2/3, usa header.png
      titulo: 'Todo lo que tu vehículo necesita',
      subtitulo: 'Aceites, filtros, grasas y aditivos de las mejores marcas',
    },
    {
      imagen: '/header.png',
      titulo: 'Filtra por tu vehículo',
      subtitulo: 'Encuentra el filtro exacto para tu motor en segundos',
    },
    {
      imagen: '/header.png',
      titulo: 'Distribución directa',
      subtitulo: 'Productos originales en Neiva y Florencia',
    },
  ];

  slideActual = 0;
  private timer = setInterval(() => this.siguiente(), 5000);

  siguiente(): void {
    this.slideActual = (this.slideActual + 1) % this.slides.length;
  }

  anterior(): void {
    this.slideActual = (this.slideActual - 1 + this.slides.length) % this.slides.length;
  }

  irA(index: number): void {
    this.slideActual = index;
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  // ── Categorías ───────────────────────────────────────────
  categorias = [
    { icono: 'fas fa-oil-can',             nombre: 'Aceites',  desc: 'Mineral, semisintético y sintético para carro, moto y maquinaria.', slug: 'aceites' },
    { icono: 'fas fa-filter',              nombre: 'Filtros',  desc: 'Aceite, aire, combustible y AC. Búsqueda por vehículo.',            slug: 'filtros' },
    { icono: 'fas fa-prescription-bottle', nombre: 'Grasas',   desc: 'Grasas industriales y automotrices en diferentes presentaciones.',  slug: 'grasas' },
    { icono: 'fas fa-flask',               nombre: 'Aditivos', desc: 'Aditivos y productos de mantenimiento y limpieza.',                 slug: 'aditivos' },
  ];

  irACategoria(slug: string): void {
    this.router.navigate(['/productos'], { fragment: slug });
  }

  // ── Ventajas — prefijo fas obligatorio, nombres FA6 ────
  ventajas = [
    { icono: 'fas fa-shield-halved',  titulo: 'Productos originales', desc: 'Distribución directa con las mejores marcas del mercado.' },
    { icono: 'fas fa-car',            titulo: 'Filtros por vehículo', desc: 'Nuestro sistema de búsqueda te muestra el filtro exacto para tu motor.' },
    { icono: 'fas fa-location-dot',   titulo: 'Dos sedes',            desc: 'Encuéntranos en Neiva y Florencia con atención personalizada.' },
    { icono: 'fab fa-whatsapp',       titulo: 'Atención WhatsApp',    desc: 'Resolvemos tus dudas y coordinamos tu pedido al instante.' },
  ];
}