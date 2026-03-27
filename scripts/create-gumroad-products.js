/**
 * StreamLayer — Crear productos en Gumroad automáticamente
 *
 * Uso:
 *   1. Andá a gumroad.com → Settings → Advanced → Generate Access Token
 *   2. Corré: GUMROAD_TOKEN=tu_token node scripts/create-gumroad-products.js
 *
 * Los productos se crean en borrador. Después entrás a cada uno en Gumroad
 * y subís el ZIP correspondiente.
 */

const ACCESS_TOKEN = process.env.GUMROAD_TOKEN

if (!ACCESS_TOKEN) {
  console.error('❌  Falta el token. Usá: GUMROAD_TOKEN=tu_token node scripts/create-gumroad-products.js')
  process.exit(1)
}

// ── Catálogo completo ──────────────────────────────────────────────────────

const PACKS = [
  {
    name: 'DEADLINK — Overlay Pack',
    price: 4999,
    description: 'Overlay interactivo con estética terminal hacker. Glitch effects, lluvia matrix ambiental, stinger con ruido estático, HUD fragmentado y ticker con scroll en tiempo real. 10 módulos + 5 presets, todo editable desde config.js. Browser Sources HTML/CSS/JS para OBS.',
  },
  {
    name: 'DEADLINK Blood — Overlay Pack',
    price: 4999,
    description: 'Variante roja de DEADLINK. Overlay interactivo con estética terminal hacker en tonos sangre. Glitch effects, lluvia matrix, stinger, HUD fragmentado y ticker. 10 módulos + 5 presets, todo editable desde config.js.',
  },
  {
    name: 'DEADLINK Frost — Overlay Pack',
    price: 4999,
    description: 'Variante frost de DEADLINK. Overlay hacker en tonos cyan/hielo. Glitch effects, lluvia matrix, stinger, HUD fragmentado y ticker. 10 módulos + 5 presets, todo editable desde config.js.',
  },
  {
    name: 'HANAMI — Overlay Pack',
    price: 4999,
    description: 'Overlay con estética japonesa de tinta y sakura. Paneles color crema, pétalos flotantes, stinger de pincelada acuarela y ticker orgánico. 10 módulos + 5 presets, todo editable desde config.js.',
  },
  {
    name: 'RECOIL — Overlay Pack',
    price: 4999,
    description: 'Overlay con estética militar táctica. Tonos acero y rojo, tipografía industrial, HUD minimalista y detalles de mira. Ideal para shooters y streams competitivos. 10 módulos + 5 presets.',
  },
  {
    name: 'KICKOFF — Overlay Pack',
    price: 4999,
    description: 'Overlay estilo broadcast deportivo. HUD con marcador, ticker de noticias, panel de eventos y estética de transmisión televisiva. Ideal para fútbol y esports. 10 módulos + 5 presets.',
  },
  {
    name: 'KICKOFF Neon — Overlay Pack',
    price: 4999,
    description: 'Variante neon del KICKOFF. Broadcast deportivo en tonos rosa/magenta vibrante. 10 módulos + 5 presets, todo editable desde config.js.',
  },
  {
    name: 'KICKOFF Royal — Overlay Pack',
    price: 4999,
    description: 'Variante dorada del KICKOFF. Broadcast deportivo premium con acentos dorados. La versión más elegante de la línea deportiva. 10 módulos + 5 presets.',
  },
  {
    name: 'VOIDGRID — Overlay Pack',
    price: 4999,
    description: 'Overlay con estética cyberpunk de red de datos. Nodos holográficos, pulsos de energía verde/rosa, grid animado y HUD futurista. 10 módulos + 5 presets.',
  },
  {
    name: 'VOIDGRID Ember — Overlay Pack',
    price: 4999,
    description: 'Variante fuego del VOIDGRID. Red de datos en tonos naranja/ámbar. Cyberpunk con estética volcánica. 10 módulos + 5 presets.',
  },
  {
    name: 'VOIDGRID Phantom — Overlay Pack',
    price: 4999,
    description: 'Variante phantom del VOIDGRID. Red de datos en tonos púrpura profundo. La versión más oscura y misteriosa. 10 módulos + 5 presets.',
  },
  {
    name: 'ALIEN CASINO — Overlay Pack',
    price: 4999,
    description: 'Overlay estilo casino intergaláctico. Neon verde con acentos púrpura y rosa, HUD fragmentado, stinger y ticker animado. Para party games y caos espacial. 10 módulos + 5 presets.',
  },
]

const FRAMES = [
  { name: 'Neon Reactor — Camera Frame', description: 'Marco de cámara con bordes animados cyan/púrpura/rosa, partículas orbitales, luces viajeras, glitch sutil y label HUD "LIVE". Browser Source HTML para OBS.' },
  { name: 'Neon Reactor Rainbow — Camera Frame', description: 'Variante arcoíris del Neon Reactor. Marco animado con partículas multicolor que ciclan por todo el espectro.' },
  { name: 'Neon Reactor Sunshine — Camera Frame', description: 'Variante cálida del Neon Reactor. Marco animado en tonos dorado, naranja y ámbar.' },
  { name: 'Arcade Fighter — Camera Frame', description: 'Marco estilo arcade de pelea. Bordes angulares con barra de HP animada, combo counter, chispas de impacto y efectos CRT.' },
  { name: 'Dark Conquest — Camera Frame', description: 'Marco estilo medieval oscuro. Bordes de piedra con filigrana dorada, escudos de facción, runas flotantes y partículas de ceniza.' },
  { name: 'Pro League — Camera Frame', description: 'Marco estilo broadcast deportivo. Líneas limpias con acento rojo/cyan, tipografía bold y animaciones sutiles.' },
  { name: 'Pro League Field — Camera Frame', description: 'Variante verde del Pro League. Estética broadcast deportivo en tonos cancha/campo.' },
  { name: 'Pro League Royal — Camera Frame', description: 'Variante dorado/púrpura del Pro League. Estética broadcast premium con detalles dorados.' },
  { name: 'Block Quest — Camera Frame', description: 'Marco estilo survival crafting. Bordes de tierra/piedra pixelados, corazones de vida animados, barra de experiencia y antorchas con partículas.' },
  { name: 'Horror Static — Camera Frame', description: 'Marco estilo terror. Bordes agrietados con estática de TV, goteos de sangre animados, niebla espectral y flashes. Para horror y survival.' },
  { name: 'Battle Storm — Camera Frame', description: 'Marco estilo battle royale. HUD con indicador de zona, barras de escudo y HP, destellos de victoria y chispas. Para battle royale y shooters.' },
  { name: 'Combat Zone — Camera Frame', description: 'Marco estilo shooter táctico. Borde militar con heartbeat animado, contador de kills y mira táctica.' },
  { name: 'Miami Neon — Camera Frame', description: 'Marco estilo Miami años 80. Doble borde de neón rosa/cyan, grid retrowave animado, siluetas de palmeras y partículas de estrellas.' },
  { name: 'Chrome Rain — Camera Frame', description: 'Marco estilo ciudad futurista bajo la lluvia. Bordes angulares con glitch, lluvia de código digital e indicador de daño neural.' },
  { name: 'Space Suspect — Camera Frame', description: 'Marco estilo juego espacial de impostores. Tripulantes en las esquinas, alerta de reunión, "SUS" flotante y destellos de traición.' },
  { name: 'Rocket Boost — Camera Frame', description: 'Marco estilo racing futurista. Propulsores animados, velocímetro, rastros de boost y partículas de combustión.' },
  { name: 'Lo-Fi Chill — Camera Frame', description: 'Marco estilo lo-fi aesthetic. Bordes suaves con lluvia animada, notas musicales flotantes y vibe de estudio nocturno.' },
  { name: 'Deep Space — Camera Frame', description: 'Marco estilo exploración espacial. Nebulosas animadas, HUD de nave con coordenadas y partículas de polvo cósmico.' },
  { name: 'Carbon Racer — Camera Frame', description: 'Marco estilo F1 y carreras. Borde de fibra de carbono, luces de largada animadas, panel DRS y chispas en el borde inferior.' },
  { name: 'Anime Shonen — Camera Frame', description: 'Marco estilo anime shonen. Líneas de velocidad, marcas de corte manga, estrella de impacto animada y destellos en los bordes.' },
  { name: 'Beat Drop — Camera Frame', description: 'Marco estilo DJ y música electrónica. Ecualizador animado, onda de sonido, disco de vinilo giratorio y crossfader.' },
  { name: 'Pixel Trainer — Camera Frame', description: 'Marco estilo RPG de monstruos. Borde tipo esfera de captura, barra de HP animada, pasto con movimiento y texto pixel art.' },
  { name: 'Alien Casino — Camera Frame', description: 'Marco estilo casino intergaláctico. Borde neon verde con glow pulsante, detalles púrpura/rosa y partículas espaciales.' },
  { name: 'Ocean Depth — Camera Frame', description: 'Marco submarino. Borde con degradado oceánico, luz cáustica animada, peces nadando, corales, algas y burbujas bioluminiscentes.' },
].map(f => ({ ...f, price: 999 }))

const CHATS = [
  { name: 'Cyber HUD — Chat Theme', description: 'Caja de chat estilo HUD cyberpunk. Mensajes con esquinas cortadas, acento cian/rojo, fuente técnica y animaciones de entrada. Conectable a Twitch vía config.js.' },
  { name: 'Enchanted Scroll — Chat Theme', description: 'Caja de chat estilo fantasía medieval. Pergaminos con bordes dorados, tipografía Cinzel, detalles en violeta y animaciones elegantes.' },
  { name: 'Paper Craft — Chat Theme', description: 'Caja de chat estilo papel y cuaderno. Fondo crema, trazos a mano, tipografía manuscrita. Ideal para arte, cozy games y Just Chatting.' },
  { name: 'Alien Casino — Chat Theme', description: 'Caja de chat estilo casino intergaláctico. Mensajes con borde neon verde, fondo espacial y glow pulsante. Conectable a Twitch vía config.js.' },
].map(c => ({ ...c, price: 999 }))

const ALL_PRODUCTS = [...PACKS, ...FRAMES, ...CHATS]

// ── API ────────────────────────────────────────────────────────────────────

async function createProduct(product, index) {
  const body = new URLSearchParams({
    access_token: ACCESS_TOKEN,
    name: product.name,
    price: product.price.toString(),
    description: product.description,
    require_shipping: 'false',
    published: 'false',
  })

  const res = await fetch('https://api.gumroad.com/v2/products', {
    method: 'POST',
    body,
  })

  const data = await res.json()

  if (!data.success) {
    throw new Error(data.message || 'Error desconocido')
  }

  return {
    name: product.name,
    id: data.product.id,
    url: `https://gumroad.com/l/${data.product.custom_permalink || data.product.id}`,
    shortUrl: data.product.short_url,
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🚀  Creando ${ALL_PRODUCTS.length} productos en Gumroad...\n`)

  const results = []
  const errors = []

  for (let i = 0; i < ALL_PRODUCTS.length; i++) {
    const product = ALL_PRODUCTS[i]
    process.stdout.write(`  [${i + 1}/${ALL_PRODUCTS.length}] ${product.name}... `)

    try {
      const result = await createProduct(product, i)
      results.push(result)
      console.log(`✅  ${result.shortUrl || result.url}`)
    } catch (err) {
      errors.push({ name: product.name, error: err.message })
      console.log(`❌  ${err.message}`)
    }

    // Pausa entre requests para no superar el rate limit
    if (i < ALL_PRODUCTS.length - 1) await sleep(400)
  }

  // ── Resultado final ──
  console.log('\n─────────────────────────────────────────────────')
  console.log(`✅  ${results.length} productos creados`)
  if (errors.length > 0) {
    console.log(`❌  ${errors.length} errores:`)
    errors.forEach(e => console.log(`     - ${e.name}: ${e.error}`))
  }

  console.log('\n📋  URLs para pegar en packs.ts:\n')
  results.forEach(r => {
    console.log(`  // ${r.name}`)
    console.log(`  buyUrl: '${r.shortUrl || r.url}',`)
    console.log()
  })

  console.log('─────────────────────────────────────────────────')
  console.log('⚠️   Los productos están en BORRADOR.')
  console.log('    Entrá a gumroad.com/dashboard y subí el ZIP a cada uno.')
  console.log('─────────────────────────────────────────────────\n')
}

main().catch(err => {
  console.error('\n❌  Error fatal:', err.message)
  process.exit(1)
})
