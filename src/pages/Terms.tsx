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
            Vendemos packs de overlays, marcos de cámara, temas de chat y otros recursos visuales
            diseñados para usarse con OBS Studio como Browser Sources (fuentes de navegador).
            El vendedor es una persona física que opera bajo el nombre comercial StreamLayer by El Novato.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">2. Productos digitales</h2>
          <p>
            Todos los productos son archivos digitales (HTML, CSS, JS) entregados en formato ZIP.
            No son imágenes estáticas — son overlays animados listos para usar en OBS.
            Al completar la compra, recibís acceso inmediato a la descarga del archivo a través
            de la plataforma Hotmart.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">3. Licencia de uso</h2>
          <p>
            Al comprar un producto, obtenés una licencia personal e intransferible para usarlo
            en tus streams y contenido. Podés usarlo en todos los canales que sean de tu propiedad.
          </p>
          <p className="mt-2">
            Queda expresamente prohibido revender, redistribuir, compartir o sublicenciar los
            archivos del producto, ya sea de forma gratuita o paga.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">4. Pagos y plataforma de distribución</h2>
          <p>
            Los pagos y la distribución de los productos se procesan a través de{' '}
            <a
              href="https://hotmart.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              Hotmart
            </a>
            . Al realizar una compra, aceptás también los{' '}
            <a
              href="https://hotmart.com/es/legal/terms-of-use"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              Términos de Uso de Hotmart
            </a>
            . Los precios se muestran en dólares estadounidenses (USD) y pueden visualizarse
            en moneda local según tu región.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">5. Política de reembolso</h2>
          <p>
            Ofrecemos un período de reembolso de <strong className="text-white">7 días corridos</strong> desde
            la fecha de compra, siempre que el producto no haya sido descargado. Este plazo es
            gestionado directamente por Hotmart.
          </p>
          <p className="mt-2">
            Para solicitar un reembolso, debés hacerlo a través de tu cuenta en Hotmart o
            contactando al soporte de Hotmart. Una vez que el archivo haya sido descargado,
            no se podrán procesar devoluciones, salvo que exista un defecto técnico comprobable
            en el producto.
          </p>
          <p className="mt-2">
            Si el producto presenta un error o no funciona según lo descripto, contactanos
            por Instagram{' '}
            <a
              href="https://instagram.com/elnovato.nn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              @elnovato.nn
            </a>{' '}
            y lo resolvemos.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">6. Derecho de arrepentimiento (Ley 24.240)</h2>
          <p>
            De acuerdo con la Ley 24.240 de Defensa del Consumidor de la República Argentina,
            el consumidor tiene derecho a revocar la aceptación durante el plazo de 10 días
            corridos desde la compra, siempre que el contenido digital no haya sido descargado
            ni accedido. Para ejercerlo, contactanos por Instagram antes de realizar la descarga.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">7. Soporte</h2>
          <p>
            Para consultas técnicas o dudas sobre tu compra, escribinos por Instagram:{' '}
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
          <h2 className="mb-2 text-lg font-semibold text-white">8. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento.
            Los cambios se publicarán en esta página con la fecha de actualización correspondiente.
          </p>
        </section>
      </div>
    </div>
  )
}
