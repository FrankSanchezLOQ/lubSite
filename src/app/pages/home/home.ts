import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
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

  productosGrasas = [
    {
      nombre: "Superkote",
      imagen: "/superkote.png",
    },

    {
      nombre: "BEG",
      imagen: "/beg.png",
    },

    {
      nombre: "Special",
      imagen: "/special.png",
    },

    {
      nombre: "Motodo",
      imagen: "/motodo.png",
    }
  ];

  productosAditivos = [
    {
      nombre: "Molyven",
      imagen: "/molyven.jpg",
    },

    {
      nombre: "Simoniz",
      imagen: "/simoniz.png",
    },

    {
      nombre: "CRC",
      imagen: "/crc.png",
    },

    {
      nombre: "",
      imagen: "",
    }
  ];
}

