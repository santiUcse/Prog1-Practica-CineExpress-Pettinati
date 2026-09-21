# Corrección — CineExpress — Pettinati

## Estado: **APROBADO**

El backend compila, corre y expone `GET`/`POST /api/peliculas` con los campos exactos pedidos, id autoincremental y persistencia en memoria funcionando. El frontend hace fetch inicial, renderiza con `map`/template literals, usa delegación de eventos, persiste favoritos en `localStorage` y el formulario funciona de punta a punta. CORS funciona para el origen de Live Server (configurado con `AllowAnyOrigin`, más permisivo que lo pedido pero funcional).

## Condición de promoción
- Filtro por género: Implementado
- Buscador por título: Implementado
- Cumple condición de promoción: Sí

## Pruebas realizadas

### 1. Estructura del repositorio
Estructura respeta `backend/CineExpressApi/` y `frontend/` en la raíz (sin la carpeta contenedora `cineexpress/`). Incluye además `backend/CineExpress.sln`. 6 commits (`Initial commit`, `Creada solucion backend`, `Entidad pelicula creada`, `Terminado Backend, Iniciado Frontend`, `El frontend funciona`, `Solucionado problema de Program`) que reflejan avance real e incremental. Incluye `.gitignore` de .NET (no se subieron `bin/`/`obj/`).

### 2. Backend (.NET Web API)
- Build: OK (`dotnet build` compila sin errores ni warnings). Target `net9.0`; en este entorno de corrección solo hay runtime 10.0.11 instalado, así que se ejecutó con `DOTNET_ROLL_FORWARD=LatestMajor` únicamente para poder correrlo y probarlo (no se modificó ningún archivo del alumno).
- `dotnet run --urls http://localhost:5220`: levantó correctamente.
- GET /api/peliculas: 200 OK, array con 5 películas con los campos exactos `id`, `titulo`, `genero`, `duracion`, `copiasDisponibles`.
- POST /api/peliculas: devuelve la película creada con un `id` asignado como máximo id actual + 1 (id 6).
- GET posterior (verificación de persistencia): la cantidad de películas pasó de 5 a 6, confirmando persistencia en memoria.
- CORS (Origin http://127.0.0.1:5500): tanto el `OPTIONS` preflight como el `GET` devuelven `Access-Control-Allow-Origin: *` (política `AllowAnyOrigin`, más permisiva que restringir al origen de Live Server como sugiere el enunciado, pero funciona correctamente para ese origen).

### 3. Frontend (HTML/CSS/JS)
- index.html: `header`+`nav`, `main` con `#catalogo`/`#grid-peliculas`, sección `#agregar` con `form#form-pelicula` (inputs con `required`, `minlength="2"` en título, `min="1"`/`min="0"` en duración/copias, `select` con las 5 categorías), `label` correctamente vinculados con `for`/`id`, `footer` con contacto. El `<aside>` (que también hace de ancla `#nosotros` del nav) contiene el filtro de géneros y un texto breve sobre el videoclub — cumple el espíritu de la sección "nosotros" del nav aunque no es una `section#nosotros` separada como en el ejemplo del enunciado; funcionalmente no hay problema.
- app.js: `DOMContentLoaded` + `fetch` a `API_URL` (`http://localhost:5170/api/peliculas`, coincide exactamente con el puerto `5170` del perfil `http` en `Properties/launchSettings.json`, por lo que el flujo end-to-end funciona tal cual el alumno lo pensó). Render con `map`/template literals correcto (`renderizarCatalogo`). Delegación de eventos: un único listener en `#grid-peliculas` (`toggleFavorito`). `localStorage` para favoritos (`favoritos_peliculas`), persistiendo correctamente. Submit del formulario: `preventDefault`, POST, `reset()` y re-fetch completo del catálogo (`obtenerPeliculas()`). Manejo de estado de carga y errores. Código prolijo y bien comentado.
- estilos.css: el archivo se llama `miestilo.css` (no `estilos.css` como sugiere el enunciado, pero está correctamente enlazado desde `index.html` y funciona), tiene contenido propio (127 líneas).

### 4. Extras
- Filtro por género: Implementado — `select#filtro-genero` combinado con `input#input-busqueda` en una única función `aplicarFiltros()` que usa `array.filter` sobre `genero` y re-renderiza.
- Buscador por título: Implementado — `input[type="search"]` con evento `input` que filtra por título en tiempo real, combinable con el filtro de género.

## Observaciones adicionales
Entrega sólida, sin bugs relevantes. Detalles menores: la hoja de estilos se llama `miestilo.css` en vez de `estilos.css`, y la política de CORS es `AllowAnyOrigin` en vez de restringirse al origen puntual de Live Server; ninguno de los dos afecta el funcionamiento probado.
