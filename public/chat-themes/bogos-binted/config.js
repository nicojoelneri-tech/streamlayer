/**
 * ══════════════════════════════════════════════════════════════
 *   CONFIGURACIÓN DEL CHAT — BOGOS BINTED
 * ══════════════════════════════════════════════════════════════
 *
 *   Para usar este chat en tu stream:
 *
 *   1. Cambiá "tu_canal" por tu nombre de canal de Twitch
 *   2. Ponelo como Browser Source en OBS a 1920×1080
 *   3. Posicionalo encima del módulo chat_frame de Bogos Binted
 *      (el tema ya está calibrado para esa posición)
 *
 * ══════════════════════════════════════════════════════════════
 */

window.CHAT_CONFIG = {

  // ── TU CANAL DE TWITCH ─────────────────────────────────────
  channel: 'elnovato_nn',

  // ── MENSAJES VISIBLES ──────────────────────────────────────
  // Cuántos mensajes se ven a la vez (recomendado: 4 o 5)
  maxMessages: 8,

  // ── VELOCIDAD DE ANIMACIÓN ─────────────────────────────────
  // En milisegundos (recomendado: 350-450)
  animationSpeed: 380,

  // ── POSICIÓN ───────────────────────────────────────────────
  // Calibrado para el chat_frame de Bogos Binted (x=0, y=343, 350×677)
  // Si cambiás el layout del overlay, ajustá estos valores
  chatLeft:      '5px',   // margen desde el borde izquierdo
  chatBottom:    '65px',  // margen inferior (encima del ticker de 60px)
  chatWidth:     338,     // ancho (debe caber dentro del chat_frame de 350px)
  chatMaxHeight: '570px', // altura máxima (respeta el header del chat_frame)

  // ── ALINEACIÓN ─────────────────────────────────────────────
  // 'left' | 'right' (si usás el chat fuera del frame, 'right' espeja al lado derecho)
  alignment: 'left',

  // ── BADGES ─────────────────────────────────────────────────
  showBadges: true,

  // ── MODO DEMO ──────────────────────────────────────────────
  // true: mensajes falsos para previsualizar
  // false: se conecta al chat real de Twitch
  demoMode: false,
};
