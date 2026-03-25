AURORA GRID — MODULAR OVERLAY SYSTEM

Qué incluye
- Módulos sueltos para OBS
- Presets listos
- Versión manual
- Versión StreamElements-ready

Estructura
- modules/manual/            Módulos individuales para usar como Browser Source con config.js
- presets/manual/            Escenas ya armadas con esos mismos módulos integrados
- config/manual/config.js    Archivo para editar datos visibles
- config/manual/manual.js    Lector del config

- modules/streamelements/    Módulos pensados para pegar dentro de widgets de StreamElements
- presets/streamelements/    Presets equivalentes para StreamElements
- config/streamelements/se.js Script base para eventos y campos

Módulos incluidos
- top_hud.html
- game_frame.html
- event_panel.html
- camera_frame.html
- chat_frame.html
- ticker.html
- just_chatting_camera.html
- alert_box.html

Cómo usar en OBS (modo manual)
1. Descomprimí la carpeta.
2. En OBS, agregá una Fuente de navegador por cada módulo que quieras usar.
3. Activá "Archivo local".
4. Seleccioná el archivo HTML correspondiente dentro de modules/manual/.
5. En cada Browser Source usá:
   - Ancho: 1920
   - Alto: 1080
6. Orden sugerido para gameplay:
   - Captura del juego
   - Webcam real
   - game_frame.html
   - camera_frame.html
   - chat_frame.html
   - event_panel.html
   - top_hud.html
   - ticker.html

Importante
- camera_frame.html es solo el marco. La webcam real va como otra fuente aparte.
- chat_frame.html es una caja visual. No trae chat real en el modo manual.
- Si no querés usar un módulo, simplemente no lo agregues.
- Esto permite usar el pack con o sin cámara, con o sin ticker, con o sin panel de eventos.

Cómo editar los datos manuales
1. Abrí config/manual/config.js con Bloc de notas, Notepad++ o VS Code.
2. Cambiá solo los textos entre comillas.
3. Guardá el archivo.
4. En OBS, click derecho sobre la fuente del navegador > Actualizar.

Campos principales editables
- channelName
- channelAccent
- viewers
- uptime
- subs
- support
- latestFollow
- latestSub
- latestDonation
- chatMessages
- tickerItems
- currentTopic
- currentTopicSub

Modo StreamElements
- Usá los archivos de modules/streamelements o presets/streamelements como base visual.
- El archivo config/streamelements/se.js escucha eventos de StreamElements:
  - follower-latest
  - subscriber-latest
  - tip-latest
  - raid-latest
  - message
- También admite fieldData simple para textos básicos como channelName o currentTopic.

Advertencia comercial recomendada
- El modo manual no se conecta automáticamente a Twitch, YouTube, Kick o TikTok.
- El modo StreamElements requiere configuración del usuario dentro de StreamElements.

Notas de producto
- Este pack está pensado para 1920x1080.
- Los presets sirven como referencia rápida.
- El valor real del producto está en los módulos individuales.