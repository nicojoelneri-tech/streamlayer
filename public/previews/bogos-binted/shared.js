(function () {
  const C = window.BOGOS_CONFIG || {};

  // Aplica textos a [data-config]
  document.querySelectorAll('[data-config]').forEach(function (el) {
    var key = el.dataset.config;
    if (C[key] !== undefined) el.textContent = C[key];
  });

  // Ticker: duplica items para loop infinito
  var track = document.querySelector('[data-ticker-track]');
  if (track && Array.isArray(C.tickerItems) && C.tickerItems.length) {
    var sep = ' <span class="ticker-suit">♥</span> ';
    var html = C.tickerItems.join(sep);
    track.innerHTML = html + sep + html + sep;
  }
})();
