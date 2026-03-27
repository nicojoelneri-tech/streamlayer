/**
 * ══════════════════════════════════════════════════════════════
 *   CONFIGURACIÓN DEL CHAT — CYBER HUD
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
  // Escribí tu nombre de canal exacto (sin #, sin mayúsculas)
  channel: 'tu_canal',

  // ── CANTIDAD DE MENSAJES VISIBLES ──────────────────────────
  // Cuántos mensajes se ven a la vez (recomendado: 3 o 4)
  maxMessages: 4,

  // ── VELOCIDAD DE ANIMACIÓN ─────────────────────────────────
  // En milisegundos. Más bajo = más rápido (recomendado: 350-500)
  animationSpeed: 400,

  // ── POSICIÓN EN PANTALLA ───────────────────────────────────
  // 'left', 'right' o 'center'
  alignment: 'left',

  // ── ANCHO DEL CHAT ─────────────────────────────────────────
  // En píxeles (recomendado: 450-600)
  chatWidth: 520,

  // ── COLORES DEL TEMA ───────────────────────────────────────
  accentColor: '#00f0ff',       // Color de acento principal (cian neón)
  accentSecondary: '#ff003c',   // Color de acento secundario (rojo)
  bgColor: 'rgba(5, 10, 20, 0.85)',  // Fondo de cada mensaje
  textColor: '#e0e8f0',        // Color del texto de mensaje

  // ── FUENTE ─────────────────────────────────────────────────
  // Podés usar cualquier fuente de Google Fonts
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: '18px',
  usernameFontSize: '15px',

  // ── BADGES ─────────────────────────────────────────────────
  // Mostrar iconos de moderador, sub, VIP, etc.
  showBadges: true,

  // ── MODO DEMO ──────────────────────────────────────────────
  // En true: muestra mensajes falsos para previsualizar el diseño
  // En false: se conecta al chat real de Twitch
  demoMode: true
};
