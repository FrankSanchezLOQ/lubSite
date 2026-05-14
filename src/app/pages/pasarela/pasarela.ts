import { Component, NgZone, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { CarritoService } from '../../services/carrito.service';
import { WompiService, type WompiCheckoutOpenResult } from '../../services/wompi.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pasarela',
  imports: [RouterLink, FormsModule],
  templateUrl: './pasarela.html',
  styleUrl: './pasarela.css',
})
export class Pasarela implements OnInit {
  private readonly carrito = inject(CarritoService);
  private readonly wompi = inject(WompiService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly zone = inject(NgZone);

  readonly carritoService = this.carrito;

  nombreContacto = '';
  telefono = '';
  /** Opcional; se envía a Wompi como customerData.email */
  emailContacto = '';
  direccionEnvio = '';
  notas = '';

  pedidoConfirmado = false;
  /** Tras redirect desde Wompi (?id=...) */
  idTransaccionRedirect: string | null = null;
  errorMensaje = '';
  procesandoPago = false;

  get wompiConfigurado(): boolean {
    return !!(environment.wompi.publicKey?.trim() && environment.wompi.integritySecret?.trim());
  }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(take(1)).subscribe((params) => {
      const id = params.get('id');
      if (!id) return;
      this.idTransaccionRedirect = id;
      void this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { id: null },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  }

  get formularioValido(): boolean {
    return !!(this.nombreContacto.trim() && this.telefono.trim());
  }

  get puedePagar(): boolean {
    return this.formularioValido && !this.carrito.isEmpty() && this.wompi.totalCopToAmountInCents(this.carrito.total()) > 0;
  }

  async pagarConWompi(): Promise<void> {
    this.errorMensaje = '';
    if (!this.puedePagar) return;
    if (!this.wompiConfigurado) {
      this.errorMensaje =
        'Configura environment.wompi.publicKey y environment.wompi.integritySecret (panel Wompi).';
      return;
    }

    const amountInCents = this.wompi.totalCopToAmountInCents(this.carrito.total());
    const reference = `lub-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    this.procesandoPago = true;
    try {
      const integrity = await this.wompi.buildIntegritySignature(
        reference,
        amountInCents,
        'COP',
        environment.wompi.integritySecret.trim(),
      );
      await this.wompi.ensureWidgetScriptLoaded();
      const WidgetCheckout = this.wompi.getWidgetConstructor();
      if (!WidgetCheckout) {
        throw new Error('Widget de Wompi no disponible tras cargar el script.');
      }

      const redirectUrl = `${window.location.origin}/pasarela`;

      const config: Record<string, unknown> = {
        currency: 'COP',
        amountInCents,
        reference,
        publicKey: environment.wompi.publicKey.trim(),
        signature: { integrity },
        redirectUrl,
        customerData: {
          fullName: this.nombreContacto.trim(),
          phoneNumber: this.telefono.trim().replace(/\s/g, ''),
          phoneNumberPrefix: '+57',
          ...(this.emailContacto.trim() ? { email: this.emailContacto.trim() } : {}),
        },
      };

      const checkout = new WidgetCheckout(config);
      this.procesandoPago = false;
      checkout.open((result: WompiCheckoutOpenResult) => this.onWompiResult(result));
    } catch (e) {
      this.errorMensaje = e instanceof Error ? e.message : 'No se pudo iniciar el pago con Wompi.';
      this.procesandoPago = false;
    }
  }

  private onWompiResult(result: WompiCheckoutOpenResult): void {
    this.zone.run(() => {
      const status = result.transaction?.status?.toUpperCase();
      if (status === 'APPROVED' || status === 'APPROVED_PARTIAL') {
        this.carrito.limpiar();
        this.pedidoConfirmado = true;
        return;
      }
      if (status === 'VOIDED' || status === 'DECLINED') {
        this.errorMensaje =
          result.transaction?.statusMessage ??
          'El pago no fue aprobado. Puedes intentar de nuevo con otro medio.';
      }
    });
  }
}
