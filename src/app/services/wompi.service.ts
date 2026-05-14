import { Injectable } from '@angular/core';

const WOMPI_WIDGET_SRC = 'https://checkout.wompi.co/widget.js';

export interface WompiCheckoutOpenResult {
  transaction?: {
    id: string;
    status: string;
    statusMessage?: string;
  };
}

export type WompiWidgetCheckoutInstance = {
  open: (callback: (result: WompiCheckoutOpenResult) => void) => void;
};

export type WompiWidgetCheckoutConstructor = new (config: Record<string, unknown>) => WompiWidgetCheckoutInstance;

@Injectable({ providedIn: 'root' })
export class WompiService {
  private scriptPromise: Promise<void> | null = null;

  /**
   * Firma requerida por el widget: SHA-256 de ref + monto + moneda + [expiración] + secreto.
   * @see https://docs.wompi.co/docs/colombia/widget-checkout-web/
   */
  async buildIntegritySignature(
    reference: string,
    amountInCents: number,
    currency: string,
    integritySecret: string,
    expirationTime?: string,
  ): Promise<string> {
    let concatenated = `${reference}${amountInCents}${currency}`;
    if (expirationTime) {
      concatenated += expirationTime;
    }
    concatenated += integritySecret;
    const encoded = new TextEncoder().encode(concatenated);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  /** Monto en centavos de peso (Wompi): COP enteros × 100. */
  totalCopToAmountInCents(totalCop: number): number {
    return Math.max(0, Math.round(totalCop * 100));
  }

  ensureWidgetScriptLoaded(): Promise<void> {
    if (this.getWidgetConstructor()) {
      return Promise.resolve();
    }
    if (!this.scriptPromise) {
      this.scriptPromise = new Promise<void>((resolve, reject) => {
        const existing = document.querySelector<HTMLScriptElement>(`script[src="${WOMPI_WIDGET_SRC}"]`);
        if (existing) {
          if (this.getWidgetConstructor()) {
            resolve();
            return;
          }
          existing.addEventListener('load', () => resolve(), { once: true });
          existing.addEventListener('error', () => reject(new Error('No se pudo cargar el widget de Wompi')), {
            once: true,
          });
          return;
        }
        const script = document.createElement('script');
        script.src = WOMPI_WIDGET_SRC;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('No se pudo cargar el widget de Wompi'));
        document.body.appendChild(script);
      });
    }
    return this.scriptPromise;
  }

  getWidgetConstructor(): WompiWidgetCheckoutConstructor | undefined {
    return (window as unknown as { WidgetCheckout?: WompiWidgetCheckoutConstructor }).WidgetCheckout;
  }
}
