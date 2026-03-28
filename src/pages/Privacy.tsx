import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-surface-400 hover:text-white no-underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>

      <h1 className="text-3xl font-bold">Política de Privacidad</h1>
      <p className="mt-2 text-sm text-surface-500">Última actualización: marzo 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-surface-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">1. Responsable del tratamiento</h2>
          <p>
            El responsable del tratamiento de datos es el titular de StreamLayer by El Novato,
            persona física que opera este sitio web. Para consultas relacionadas con tu privacidad,
            podés contactarnos por Instagram:{' '}
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
          <h2 className="mb-2 text-lg font-semibold text-white">2. Datos que recopilamos</h2>
          <p>
            Este sitio web <strong className="text-white">no recopila ni almacena datos personales</strong> directamente.
            No tenemos formularios de registro, cuentas de usuario, ni sistemas de analytics.
          </p>
          <p className="mt-2">
            El sitio funciona completamente en el navegador del usuario (client-side) y no
            envía información a ningún servidor propio.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">3. Datos recopilados por Hotmart</h2>
          <p>
            Cuando realizás una compra, sos redirigido a{' '}
            <a
              href="https://hotmart.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              Hotmart
            </a>
            , la plataforma que procesa los pagos y gestiona la distribución de los productos.
            Hotmart recopila los datos necesarios para completar la transacción (nombre, email,
            datos de pago) de acuerdo con su propia política de privacidad.
          </p>
          <p className="mt-2">
            Para conocer cómo Hotmart trata tus datos, consultá su{' '}
            <a
              href="https://hotmart.com/es/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              Política de Privacidad
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">4. Cookies</h2>
          <p>
            Este sitio no utiliza cookies propias ni de terceros con fines de seguimiento
            o publicidad. El navegador puede generar cookies técnicas propias del funcionamiento
            estándar de cualquier sitio web, fuera de nuestro control.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">5. Hosting</h2>
          <p>
            El sitio está alojado en{' '}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              Vercel
            </a>
            . Vercel puede registrar datos técnicos básicos de acceso (dirección IP, navegador,
            páginas visitadas) como parte normal de la operación de su infraestructura.
            Consultá la{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              Política de Privacidad de Vercel
            </a>{' '}
            para más información.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">6. Tus derechos</h2>
          <p>
            De acuerdo con la Ley 25.326 de Protección de Datos Personales de la República
            Argentina, tenés derecho a acceder, rectificar y suprimir tus datos personales.
            Dado que este sitio no almacena datos propios, cualquier solicitud relacionada
            con datos de compra debe dirigirse directamente a Hotmart.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">7. Cambios en esta política</h2>
          <p>
            Podemos actualizar esta política en cualquier momento. Los cambios se publicarán
            en esta página con la fecha de actualización correspondiente.
          </p>
        </section>
      </div>
    </div>
  )
}
