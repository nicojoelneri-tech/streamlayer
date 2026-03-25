import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-surface-400 hover:text-white no-underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>

      <h1 className="text-3xl font-bold">Términos y Condiciones</h1>
      <p className="mt-2 text-sm text-surface-500">Última actualización: marzo 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-surface-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">1. Sobre el servicio</h2>
          <p>
            StreamLayer by El Novato es una tienda online de productos digitales para streamers.
            Vendemos packs de overlays, marcos de cámara y otros recursos visuales diseñados
            para usarse con OBS Studio como Browser Sources (fuentes de navegador).
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">2. Productos digitales</h2>
          <p>
            Todos los productos son archivos digitales (HTML, CSS, JS) entregados en formato ZIP.
            No son imágenes estáticas. Al completar la compra, recibís acceso a la descarga del archivo.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">3. Licencia de uso</h2>
          <p>
            Al comprar un producto, obtenés una licencia personal e intransferible para usarlo
            en tus streams y contenido. No podés revender, redistribuir ni compartir los archivos
            del producto. Podés usarlo en todos los canales que sean tuyos.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">4. Pagos</h2>
          <p>
            Los pagos se procesan a través de Mercado Pago. Aceptamos tarjeta de crédito y débito.
            Los precios están expresados en pesos argentinos (ARS) e incluyen IVA donde corresponda.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">5. Política de reembolso</h2>
          <p>
            Por tratarse de productos digitales descargables, no ofrecemos reembolsos una vez
            realizada la descarga. Si tenés un problema técnico con el producto, contactanos
            y lo resolvemos.
          </p>
          <p className="mt-2">
            De acuerdo con la Ley 24.240 de Defensa del Consumidor, podés ejercer el derecho
            de arrepentimiento dentro de los 10 días corridos desde la compra, siempre que no
            hayas descargado el producto. Para ejercerlo, contactanos por Instagram.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">6. Soporte</h2>
          <p>
            Si tenés dudas o problemas con tu compra, escribinos por Instagram:
            {' '}
            <a
              href="https://instagram.com/elnovato.nn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              @elnovato.nn
            </a>
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">7. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento.
            Los cambios se publicarán en esta página.
          </p>
        </section>
      </div>
    </div>
  )
}
