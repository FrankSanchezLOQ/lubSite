/**
 * Entorno de desarrollo (ng serve / ng build sin --configuration production).
 *
 * ─── Wompi: cómo obtener y pegar las llaves ─────────────────────────────────
 * 1. Entra en https://comercios.wompi.co/ e inicia sesión (o crea cuenta comercio).
 * 2. Ve a **Desarrolladores** (menú lateral o superior, según el diseño del panel).
 * 3. Activa el ambiente **Pruebas / Sandbox** (no uses producción hasta probar bien).
 * 4. **Llave pública** (Public key): copia el valor que empieza por `pub_test_...`
 *    y pégalo abajo en `publicKey` (entre comillas).
 * 5. **Secreto de integridad** (Integrity secret): en la misma zona de desarrolladores,
 *    copia el valor que empieza por `test_integrity_...` y pégalo en `integritySecret`.
 *    ⚠️ No confundas con la **llave privada** (`prv_test_...`): esa no va en el front.
 * 6. Guarda el archivo y reinicia `ng serve` si ya estaba corriendo.
 *
 * Formato esperado (ejemplo ficticio, los tuyos serán distintos):
 *   publicKey:        'pub_test_AbCdEf1234567890...'
 *   integritySecret:  'test_integrity_XyZ9876543210...'
 *
 * Documentación: https://docs.wompi.co/docs/colombia/ambientes-y-llaves/
 * Widget: https://docs.wompi.co/docs/colombia/widget-checkout-web/
 */
export const environment = {
  production: false,
  wompi: {
    publicKey: '',
    integritySecret: '',
  },
};
