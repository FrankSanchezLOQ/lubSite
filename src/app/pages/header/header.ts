import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menuAbierto: boolean = false;

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }

  @HostListener('window:click', ['$event'])
  clickFuera(event: Event) {
    const target = event.target as HTMLElement;

    if (!target.closest('.navbar')) {
      this.menuAbierto = false;
    }
  }
}
