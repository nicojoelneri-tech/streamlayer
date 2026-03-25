function pick(path, fallback="") {
  try {
    return path.split(".").reduce((acc, key) => acc && acc[key], window.OVERLAY_CONFIG) ?? fallback;
  } catch {
    return fallback;
  }
}
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
function renderSocial(containerId, links) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(links)) return;
  container.innerHTML = links.map(link => `
    <div class="event">
      <span class="event-label">${link.platform || ""}</span>
      <span class="event-value"><span class="hl">${link.user || ""}</span></span>
    </div>
  `).join("");
}
function applyManualConfig() {
  setText("brand-main", pick("channelName", "Aurora"));
  setText("brand-accent", pick("channelAccent", "Grid"));
  setText("live-label", pick("liveLabel", "LIVE"));
  setText("camera-label", pick("cameraLabel", "Operator Cam"));
  setText("chat-title", pick("chatTitle", "Stream Chat"));
  setText("game-feed-label", pick("gameFeedLabel", "Aurora Grid // Game Feed"));
  setText("resolution-label", pick("resolution", "1920x1080"));
  setText("session-label", pick("activeSessionLabel", "Active Session"));
  setText("ticker-tag", pick("tickerTag", "sys.log"));
  setText("social-panel-title", pick("socialPanelTitle", "Redes"));
  setText("social-panel-code", pick("socialPanelCode", "follow.me"));
  renderSocial("social-list", pick("socialLinks", []));
  renderChat("chat-list", pick("chatMessages", []));
  renderTicker("ticker-flow", pick("tickerItems", []));
  setText("current-topic", pick("currentTopic", "Charlando con el chat"));
  setText("current-topic-sub", pick("currentTopicSub", ""));
  setHTML("screen-title", pick("startingTitle", "Starting <span>Soon</span>"));
  setText("screen-sub", pick("startingSub", ""));
  setHTML("screen-title-brb", pick("brbTitle", "Be <span>Right Back</span>"));
  setText("screen-sub-brb", pick("brbSub", ""));
  setHTML("screen-title-ending", pick("endingTitle", "Stream <span>Offline</span>"));
  setText("screen-sub-ending", pick("endingSub", ""));
  setText("static-label", pick("staticLabel", "Info"));
  setText("static-title", pick("staticTitle", "Texto principal"));
  setText("static-message", pick("staticMessage", "Texto secundario configurable"));
}
document.addEventListener("DOMContentLoaded", applyManualConfig);
