(function () {
  const C = window.VOIDGRID_CONFIG;
  if (!C) return;

  /* Texto simple */
  document.querySelectorAll("[data-config]").forEach(function (el) {
    var key = el.getAttribute("data-config");
    if (C[key] !== undefined) el.textContent = C[key];
  });

  /* Lista (ticker) */
  document.querySelectorAll("[data-config-list]").forEach(function (el) {
    var key = el.getAttribute("data-config-list");
    var arr = C[key];
    if (!Array.isArray(arr)) return;
    var html = arr.map(function (t) { return "<span>" + t + "</span>"; }).join("");
    el.innerHTML = html + html;
  });
})();
