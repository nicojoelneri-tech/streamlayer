/**
 * twitch-chat.js — Conexión anónima al chat de Twitch vía WebSocket
 *
 * Uso:
 *   const chat = new TwitchChat('nombre_del_canal');
 *   chat.on('message', (msg) => { ... });
 *   chat.connect();
 *
 * Cada mensaje emitido tiene:
 *   { username, displayName, color, message, badges, emotes, timestamp }
 */

class TwitchChat {
  constructor(channel) {
    this.channel = channel.toLowerCase().replace('#', '');
    this.ws = null;
    this.listeners = {};
    this.reconnectDelay = 2000;
    this.maxReconnectDelay = 30000;
    this.connected = false;
  }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  emit(event, data) {
    (this.listeners[event] || []).forEach(cb => cb(data));
  }

  connect() {
    this.ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

    this.ws.onopen = () => {
      // Conexión anónima (solo lectura, no requiere token)
      this.ws.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
      this.ws.send('NICK justinfan' + Math.floor(Math.random() * 99999));
      this.ws.send('JOIN #' + this.channel);
      this.connected = true;
      this.reconnectDelay = 2000;
      this.emit('connected', { channel: this.channel });
    };

    this.ws.onmessage = (event) => {
      const lines = event.data.split('\r\n');
      for (const line of lines) {
        if (!line) continue;
        if (line.startsWith('PING')) {
          this.ws.send('PONG :tmi.twitch.tv');
          continue;
        }
        if (line.includes('PRIVMSG')) {
          const msg = this.parseMessage(line);
          if (msg) this.emit('message', msg);
        }
      }
    };

    this.ws.onclose = () => {
      this.connected = false;
      this.emit('disconnected', {});
      setTimeout(() => this.connect(), this.reconnectDelay);
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, this.maxReconnectDelay);
    };

    this.ws.onerror = () => {
      this.ws.close();
    };
  }

  parseMessage(raw) {
    try {
      const tagsPart = raw.startsWith('@') ? raw.substring(1, raw.indexOf(' ')) : '';
      const tags = {};
      if (tagsPart) {
        tagsPart.split(';').forEach(pair => {
          const [key, val] = pair.split('=');
          tags[key] = val || '';
        });
      }

      const msgMatch = raw.match(/PRIVMSG\s+#\w+\s+:(.+)/);
      const message = msgMatch ? msgMatch[1].trim() : '';

      const badges = {};
      if (tags['badges']) {
        tags['badges'].split(',').forEach(b => {
          const [name, version] = b.split('/');
          if (name) badges[name] = version || '1';
        });
      }

      return {
        username: (tags['display-name'] || '').toLowerCase(),
        displayName: tags['display-name'] || 'anon',
        color: tags['color'] || this.generateColor(tags['display-name'] || ''),
        message,
        badges,
        emotes: tags['emotes'] || '',
        timestamp: Date.now()
      };
    } catch (e) {
      return null;
    }
  }

  /** Genera un color consistente para usuarios sin color asignado */
  generateColor(name) {
    const colors = [
      '#FF4A80', '#FF7B72', '#FFA657', '#D2A8FF',
      '#79C0FF', '#7EE787', '#FF6EC7', '#FFD700',
      '#00CED1', '#FF6347', '#98FB98', '#DDA0DD'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
