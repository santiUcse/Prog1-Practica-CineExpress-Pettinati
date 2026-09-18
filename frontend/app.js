const API_URL = "http://localhost:5170/api/peliculas";

let peliculas = [];
let favoritos = JSON.parse(localStorage.getItem("favoritos_peliculas")) || [];

const gridPeliculas = document.getElementById("grid-peliculas");
const estadoCarga = document.getElementById("estado-carga");
const formPelicula = document.getElementById("form-pelicula");
const inputBusqueda = document.getElementById("input-busqueda");
const filtroGenero = document.getElementById("filtro-genero");

document.addEventListener("DOMContentLoaded", () => {
    obtenerPeliculas();

    // Listener por delegación de eventos para favoritos
    gridPeliculas.addEventListener("click", toggleFavorito);

    // Eventos para el formulario y los filtros (Promoción)
    formPelicula.addEventListener("submit", agregarPelicula);
    inputBusqueda.addEventListener("input", aplicarFiltros);
    filtroGenero.addEventListener("change", aplicarFiltros);
});

async function obtenerPeliculas() {
    try {
        estadoCarga.textContent = "Cargando películas...";
        estadoCarga.style.display = "block";
        
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        
        peliculas = await res.json();
        estadoCarga.style.display = "none";
        renderizarCatalogo(peliculas);
    } catch (error) {
        console.error(error);
        estadoCarga.textContent = "Error al cargar las películas. Verifique la API.";
    }
}

function renderizarCatalogo(lista) {
    gridPeliculas.innerHTML = lista.map(p => {
        const esFavorito = favoritos.includes(p.id);
        return `
            <article class="card">
                <h3>${p.titulo}</h3>
                <p><strong>Género:</strong> ${p.genero}</p>
                <p><strong>Duración:</strong> ${p.duracion} min</p>
                <p><strong>Stock:</strong> ${p.copiasDisponibles} copias</p>
                <button class="btn-fav ${esFavorito ? 'fav-activo' : ''}" data-id="${p.id}">
                    ${esFavorito ? '⭐ En mi lista' : '🎬 Quiero verla'}
                </button>
            </article>
        `;
    }).join("");
}

function toggleFavorito(e) {
    if (e.target.classList.contains("btn-fav")) {
        const id = Number(e.target.dataset.id);
        if (favoritos.includes(id)) {
            favoritos = favoritos.filter(favId => favId !== id);
        } else {
            favoritos.push(id);
        }
        localStorage.setItem("favoritos_peliculas", JSON.stringify(favoritos));
        aplicarFiltros();
    }
}

async function agregarPelicula(e) {
    e.preventDefault();

    const nuevaPelicula = {
        titulo: document.getElementById("titulo").value,
        duracion: Number(document.getElementById("duracion").value),
        copiasDisponibles: Number(document.getElementById("copias").value),
        genero: document.getElementById("genero").value
    };

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaPelicula)
        });

        if (res.ok) {
            formPelicula.reset();
            await obtenerPeliculas();
        } else {
            alert("No se pudo agregar la película.");
        }
    } catch (error) {
        console.error("Error en POST:", error);
    }
}

// Lógica combinada para Filtro por Género y Buscador (Promoción)
function aplicarFiltros() {
    const texto = inputBusqueda.value.toLowerCase();
    const generoSeleccionado = filtroGenero.value;

    const filtradas = peliculas.filter(p => {
        const coincideTitulo = p.titulo.toLowerCase().includes(texto);
        const coincideGenero = generoSeleccionado === "Todos" || p.genero === generoSeleccionado;
        return coincideTitulo && coincideGenero;
    });

    renderizarCatalogo(filtradas);
}