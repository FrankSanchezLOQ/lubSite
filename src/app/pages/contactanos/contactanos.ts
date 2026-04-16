import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contactanos.html',
  styleUrl: './contactanos.css',
})
export class Contactanos {
    
    enviarFormulario() {
    console.log('Formulario enviado');
}
}
