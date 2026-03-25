STREAMELEMENTS SETUP — RESUMEN

1. Creá un overlay nuevo en StreamElements.
2. Agregá un Custom Widget por cada módulo que quieras usar.
3. Copiá el HTML del módulo.
4. Copiá el CSS desde assets_shared.css.
5. Copiá el JS desde config/streamelements/se.js.
6. Para módulos que no necesiten eventos reales, también podés usar fieldData manual.

Eventos contemplados
- follower-latest
- subscriber-latest
- tip-latest
- raid-latest
- message

Qué actualiza el script
- latestFollow
- latestSub
- latestDonation
- ticker
- alert box
- chat decorativo

Recomendación
Vendelo como "StreamElements-ready", no como integración automática total.