
(function(){
  const cfg = window.DEADLINK_CONFIG || {};
  document.querySelectorAll("[data-config]").forEach(el => {
    const key = el.getAttribute("data-config");
    if (cfg[key] != null && typeof cfg[key] !== "object") el.textContent = cfg[key];
  });

  const ticker = document.querySelector("[data-config-list='tickerItems']");
  if (ticker && Array.isArray(cfg.tickerItems)) {
    const items = cfg.tickerItems.map(item => `<span>${item}</span>`).join("");
    ticker.innerHTML = items + items;
  }
})();
