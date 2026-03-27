/**
 * chat-engine.js — Motor de visualización de mensajes de chat
 *
 * Gestiona la cola de mensajes visibles, animaciones de entrada/salida,
 * y renderizado de cada mensaje según el template del tema.
 *
 * Uso:
 *   const engine = new ChatEngine({
 *     container: document.getElementById('chat-container'),
 *     maxVisible: 4,
 *     animationDuration: 400,
 *     messageTemplate: (msg) => `<div>...</div>`,
 *     messageDuration: null  // null = se van cuando entra uno nuevo
 *   });
 *   engine.addMessage({ displayName, color, message, badges });
 */

class ChatEngine {
  constructor(options) {
    this.container = options.container;
    this.maxVisible = options.maxVisible || 4;
    this.animDuration = options.animationDuration || 400;
    this.messageTemplate = options.messageTemplate;
    this.messageDuration = options.messageDuration || null;
    this.visibleMessages = [];
    this.queue = [];
    this.processing = false;
  }

  addMessage(msgData) {
    this.queue.push(msgData);
    if (!this.processing) this.processQueue();
  }

  async processQueue() {
    this.processing = true;

    while (this.queue.length > 0) {
      const msgData = this.queue.shift();
      await this.displayMessage(msgData);
      // Pequeña pausa entre mensajes para que no se apilen de golpe
      await this.wait(120);
    }

    this.processing = false;
  }

  async displayMessage(msgData) {
    // Si alcanzamos el máximo, sacar el más viejo
    if (this.visibleMessages.length >= this.maxVisible) {
      await this.removeOldest();
    }

    // Crear elemento
    const el = document.createElement('div');
    el.className = 'chat-message';
    el.innerHTML = this.messageTemplate(msgData);
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';

    this.container.appendChild(el);

    // Forzar reflow para que la animación funcione
    el.offsetHeight;

    // Animar entrada
    el.style.transition = `opacity ${this.animDuration}ms ease, transform ${this.animDuration}ms ease`;
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';

    this.visibleMessages.push(el);

    // Si hay duración fija, programar remoción automática
    if (this.messageDuration) {
      setTimeout(() => {
        this.removeMessage(el);
      }, this.messageDuration);
    }
  }

  async removeOldest() {
    if (this.visibleMessages.length === 0) return;
    const oldest = this.visibleMessages.shift();
    await this.animateOut(oldest);
  }

  async removeMessage(el) {
    const idx = this.visibleMessages.indexOf(el);
    if (idx > -1) {
      this.visibleMessages.splice(idx, 1);
      await this.animateOut(el);
    }
  }

  async animateOut(el) {
    el.style.transition = `opacity ${this.animDuration}ms ease, transform ${this.animDuration}ms ease`;
    el.style.opacity = '0';
    el.style.transform = 'translateY(-30px)';
    await this.wait(this.animDuration);
    if (el.parentNode) el.parentNode.removeChild(el);
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /** Limpia todos los mensajes visibles */
  clear() {
    this.visibleMessages.forEach(el => {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    this.visibleMessages = [];
    this.queue = [];
  }
}
