import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  productosAceites = [
    {
      nombre: "Mobil",
      imagen: "/mobil.jpg",
    },

    {
      nombre: "Castrol",
      imagen: "/castrol.jpg",
    },

    {
      nombre: "Shell",
      imagen: "/shell.jpg",
    },

    {
      nombre: "Total",
      imagen: "/total.jpg",
    },
  ];

  productosFiltros = [
    {
      nombre: "Tecnifil",
      imagen: "/tecnifil.png",
    },

    {
      nombre: "Baldwin",
      imagen: "/baldwin.jpg",
    },

    {
      nombre: "Donsson",
      imagen: "/donsson.png",
    },

    {
      nombre: "Donaldson",
      imagen: "/donaldson.jpg",
    }
  ];
}

