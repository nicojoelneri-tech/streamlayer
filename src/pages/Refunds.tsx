import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Refunds() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-surface-400 hover:text-white no-underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>

      <h1 className="text-3xl font-bold">Política de Devoluciones</h1>
      <p className="mt-2 text-sm text-surface-500">Última actualización: marzo 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-surface-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">1. Período de reembolso</h2>
          <p>
            Ofrecemos un período de reembolso de <strong className="text-white">7 días corridos</strong> contados
            desde la fecha de compra. Este plazo es gestionado directamente por la plataforma{' '}
            <a
              href="https://hotmart.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              Hotmart
            </a>
            , a través de la cual se procesan todos los pagos y descargas.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">2. Condiciones para el reembolso</h2>
          <p>El reembolso aplica cuando:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>La solicitud se realiza dentro de los 7 días desde la compra.</li>
            <li>El archivo del producto <strong className="text-white">no ha sido descargado</strong>.</li>
          </ul>
          <p className="mt-3">No se procesarán reembolsos cuando:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>El archivo ya fue descargado.</li>
            <li>Pasaron más de 7 días desde la fecha de compra.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">3. Cómo solicitar un reembolso</h2>
          <p>Para solicitar la devolución de tu dinero:</p>
          <ol className="mt-2 list-decimal space-y-2 pl-5">
            <li>
              Ingresá a tu cuenta en{' '}
              <a
                href="https://hotmart.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300"
              >
                Hotmart
              </a>{' '}
              con el email que usaste para comprar.
            </li>
            <li>Buscá la compra en tu historial de pedidos.</li>
            <li>Solicitá el reembolso desde la opción disponible en el pedido.</li>
          </ol>
          <p className="mt-3">
            También podés contactar al soporte de Hotmart directamente desde su plataforma.
            El proceso de devolución del dinero es gestionado íntegramente por Hotmart y puede
            demorar entre 5 y 10 días hábiles dependiendo de tu método de pago.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">4. Problemas técnicos</h2>
          <p>
            Si el producto presenta un error, no funciona correctamente o no coincide con lo
            descripto en la tienda, contactanos por Instagram{' '}
            <a
              href="https://instagram.com/elnovato.nn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              @elnovato.nn
            </a>{' '}
            antes de solicitar el reembolso. En la mayoría de los casos podemos resolver el
            problema directamente.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">5. Derecho de arrepentimiento (Ley 24.240)</h2>
          <p>
            De acuerdo con la Ley 24.240 de Defensa del Consumidor de la República Argentina,
            el consumidor tiene derecho a revocar la aceptación dentro de los 10 días corridos
            desde la compra, siempre que el contenido digital no haya sido descargado ni accedido.
            Para ejercer este derecho, contactanos por Instagram{' '}
            <a
              href="https://instagram.com/elnovato.nn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              @elnovato.nn
            </a>{' '}
            antes de realizar la descarga.
          </p>
        </section>
      </div>
    </div>
  )
}
