const fallbackConfig = {
  channelName: "Aurora",
  channelAccent: "Grid",
  liveLabel: "LIVE",
  viewers: "247",
  uptime: "02:14",
  subs: "89",
  support: "$42",
  latestFollow: "NeonWolf",
  latestSub: "StarCipher",
  latestDonation: "$500",
  gameFeedLabel: "Aurora Grid // Game Feed",
  resolution: "1920x1080",
  activeSessionLabel: "Active Session",
  eventFeedTitle: "Event Feed",
  eventFeedCode: "core.sys",
  cameraLabel: "Operator Cam",
  chatTitle: "Stream Chat",
  chatOnline: "247 online",
  chatMessages: [
    {user:"NEON_WOLF", text:"nah, ese pull fue una locura 🔥"},
    {user:"STAR_CIPHER", text:"hoy sale 5 estrellas, lo siento"},
    {user:"VOIDRUNNER", text:"muy bueno el overlay, banco fuerte"},
    {user:"AURORA_UNIT", text:"activá el build command jajaj"}
  ],
  tickerTag: "sys.log",
  tickerItems: [
    "⚡ <span class=\"hl\">NeonWolf</span> se suscribió por 3 meses",
    "💬 Escribí <span class=\"hl\">!discord</span> para unirte a la comunidad",
    "🚀 Nuevo objetivo: <span class=\"hl\">500 subs</span>"
  ],
  currentTopic: "Charlando con el chat",
  currentTopicSub: "Escriban algo en el chat y cambiamos el rumbo.",
  alertLabel: "New Support",
  alertUser: "NeonWolf",
  alertMessage: "se acaba de sumar al núcleo"
};
let state = JSON.parse(JSON.stringify(fallbackConfig));

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null) el.textContent = value;
}
function setHTML(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null) el.innerHTML = value;
}
function renderChat(containerId, messages) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(messages)) return;
  container.innerHTML = messages.map(msg => `
    <div class="chat-msg">
      <span class="chat-user">${msg.user || ""}</span>
      <span class="chat-text">${msg.text || ""}</span>
    </div>
  `).join("");
}
function renderTicker(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(items)) return;
  container.innerHTML = items.map(item => `<span>${item}</span>`).join("");
}
function applyState() {
  setText("brand-main", state.channelName);
  setText("brand-accent", state.channelAccent);
  setText("live-label", state.liveLabel);
  setText("metric-viewers", state.viewers);
  setText("metric-uptime", state.uptime);
  setText("metric-subs", state.subs);
  setText("metric-support", state.support);
  setText("event-feed-title", state.eventFeedTitle);
  setText("event-feed-code", state.eventFeedCode);
  setText("latest-follow", state.latestFollow);
  setText("latest-sub", state.latestSub);
  setText("latest-donation", state.latestDonation);
  setText("camera-label", state.cameraLabel);
  setText("chat-title", state.chatTitle);
  setText("chat-online", state.chatOnline);
  setText("game-feed-label", state.gameFeedLabel);
  setText("resolution-label", state.resolution);
  setText("session-label", state.activeSessionLabel);
  setText("ticker-tag", state.tickerTag);
  renderChat("chat-list", state.chatMessages);
  renderTicker("ticker-flow", state.tickerItems);
  setText("current-topic", state.currentTopic);
  setText("current-topic-sub", state.currentTopicSub);
  setText("alert-label", state.alertLabel);
  setText("alert-user", state.alertUser);
  setText("alert-message", state.alertMessage);
}
function pushChatMessage(user, text) {
  state.chatMessages.unshift({user: String(user || "USER").toUpperCase(), text: text || ""});
  state.chatMessages = state.chatMessages.slice(0, 5);
}
function pushTicker(text) {
  state.tickerItems.unshift(text);
  state.tickerItems = state.tickerItems.slice(0, 6);
}
function showAlert(label, user, message) {
  setText("alert-label", label || state.alertLabel);
  setText("alert-user", user || state.alertUser);
  setText("alert-message", message || state.alertMessage);
}
window.addEventListener("onWidgetLoad", function(obj) {
  const fieldData = obj?.detail?.fieldData || {};
  if (fieldData.channelName) state.channelName = fieldData.channelName;
  if (fieldData.channelAccent) state.channelAccent = fieldData.channelAccent;
  if (fieldData.currentTopic) state.currentTopic = fieldData.currentTopic;
  if (fieldData.currentTopicSub) state.currentTopicSub = fieldData.currentTopicSub;
  applyState();
});
window.addEventListener("onEventReceived", function(obj) {
  const listener = obj?.detail?.listener;
  const event = obj?.detail?.event || {};
  if (listener === "follower-latest") {
    state.latestFollow = event.name || state.latestFollow;
    pushTicker(`⚡ <span class="hl">${state.latestFollow}</span> te siguió`);
    showAlert("New Follow", state.latestFollow, "se unió al núcleo");
  } else if (listener === "subscriber-latest") {
    state.latestSub = event.name || state.latestSub;
    pushTicker(`⭐ <span class="hl">${state.latestSub}</span> se suscribió`);
    showAlert("New Sub", state.latestSub, "acaba de suscribirse");
  } else if (listener === "tip-latest") {
    state.latestDonation = event.amount ? `${event.amount} ${event.currency || ""}`.trim() : state.latestDonation;
    const user = event.name || "Support";
    pushTicker(`💎 <span class="hl">${user}</span> donó ${state.latestDonation}`);
    showAlert("New Tip", user, `envió ${state.latestDonation}`);
  } else if (listener === "message") {
    if (event.data?.displayName && event.data?.text) {
      pushChatMessage(event.data.displayName, event.data.text);
    }
  } else if (listener === "raid-latest") {
    const raider = event.name || "Raid";
    pushTicker(`🚀 <span class="hl">${raider}</span> entró con raid`);
    showAlert("New Raid", raider, "entró al sistema");
  }
  applyState();
});
document.addEventListener("DOMContentLoaded", applyState);