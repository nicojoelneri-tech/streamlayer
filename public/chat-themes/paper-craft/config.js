/**
 * ══════════════════════════════════════════════════════════════
 *   CONFIGURACIÓN DEL CHAT — PAPER CRAFT
 * ══════════════════════════════════════════════════════════════
 *
 *   Para usar este chat en tu stream:
 *
 *   1. Cambiá "tu_canal" por tu nombre de canal de Twitch
 *   2. Ajustá los colores y fuentes si querés
 *   3. Agregalo como Browser Source en OBS (ver MANUAL_OBS.txt)
 *
 * ══════════════════════════════════════════════════════════════
 */

window.CHAT_CONFIG = {

  // ── TU CANAL DE TWITCH ─────────────────────────────────────
  channel: 'tu_canal',

  // ── CANTIDAD DE MENSAJES VISIBLES ──────────────────────────
  maxMessages: 4,

  // ── VELOCIDAD DE ANIMACIÓN ─────────────────────────────────
  animationSpeed: 400,

  // ── POSICIÓN EN PANTALLA ───────────────────────────────────
  // 'left', 'right' o 'center'
  alignment: 'left',

  // ── ANCHO DEL CHAT ─────────────────────────────────────────
  chatWidth: 500,

  // ── COLORES DEL TEMA ───────────────────────────────────────
  accentColor: '#e85d3a',        // Naranja crayón
  accentSecondary: '#3a8ee8',    // Azul acuarela
  bgColor: 'rgba(255, 252, 245, 0.92)', // Papel blanco cálido
  textColor: '#2a2a2a',          // Texto oscuro tipo lápiz

  // ── FUENTE ─────────────────────────────────────────────────
  fontFamily: "'Patrick Hand', cursive",
  fontSize: '19px',
  usernameFontSize: '15px',

  // ── BADGES ─────────────────────────────────────────────────
  showBadges: true,

  // ── MODO DEMO ──────────────────────────────────────────────
  demoMode: true
};
