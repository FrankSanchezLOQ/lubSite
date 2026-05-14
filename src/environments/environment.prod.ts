/**
 * Build de **producción** (`ng build`, sin `--configuration development`).
 * Sustituye las llaves por las de ambiente **Producción** en el mismo panel Wompi:
 *   - `pub_prod_...`
 *   - `prod_integrity_...`
 *
 * En un sitio real, el secreto de integridad no debería vivir en el navegador;
 * idealmente un backend genera la firma. Mientras tanto, no subas este archivo
 * con valores reales a repositorios públicos.
 */
export const environment = {
  production: true,
  wompi: {
    publicKey: '',
    integritySecret: '',
  },
};
