/**
 * ══════════════════════════════════════════════════════════════
 *   CONFIGURACIÓN DEL CHAT — ENCHANTED SCROLL
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
  animationSpeed: 450,

  // ── POSICIÓN EN PANTALLA ───────────────────────────────────
  // 'left', 'right' o 'center'
  alignment: 'left',

  // ── ANCHO DEL CHAT ─────────────────────────────────────────
  chatWidth: 500,

  // ── COLORES DEL TEMA ───────────────────────────────────────
  accentColor: '#c8a24e',        // Dorado (bordes, ornamentos)
  accentSecondary: '#7b4dbf',    // Púrpura mágico
  bgColor: 'rgba(18, 10, 6, 0.88)',  // Fondo pergamino oscuro
  textColor: '#e8dcc8',          // Texto cálido

  // ── FUENTE ─────────────────────────────────────────────────
  fontFamily: "'Cinzel', serif",
  fontSize: '17px',
  usernameFontSize: '14px',

  // ── BADGES ─────────────────────────────────────────────────
  showBadges: true,

  // ── MODO DEMO ──────────────────────────────────────────────
  demoMode: true
};
