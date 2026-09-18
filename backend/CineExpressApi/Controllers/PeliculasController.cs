using Microsoft.AspNetCore.Mvc;
using CineExpressApi.Models;

namespace CineExpressApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PeliculasController : ControllerBase
{
    private static List<Pelicula> peliculas = new List<Pelicula>
    {
        new Pelicula
        {
            Id = 1,
            Titulo = "Matrix",
            Genero = "Ciencia Ficción",
            Duracion = 136,
            CopiasDisponibles = 3
        },

        new Pelicula
        {
            Id = 2,
            Titulo = "Toy Story",
            Genero = "Comedia",
            Duracion = 81,
            CopiasDisponibles = 5
        },

        new Pelicula
        {
            Id = 3,
            Titulo = "El Conjuro",
            Genero = "Terror",
            Duracion = 112,
            CopiasDisponibles = 2
        },

        new Pelicula
        {
            Id = 4,
            Titulo = "Gladiador",
            Genero = "Acción",
            Duracion = 155,
            CopiasDisponibles = 4
        },

        new Pelicula
        {
            Id = 5,
            Titulo = "Forrest Gump",
            Genero = "Drama",
            Duracion = 142,
            CopiasDisponibles = 3
        }
    };

    [HttpGet]
    public ActionResult<List<Pelicula>> Get()
    {
        return Ok(peliculas);
    }

    [HttpPost]
    public ActionResult<Pelicula> Post(Pelicula pelicula)
    {
        pelicula.Id = peliculas.Max(p => p.Id) + 1;

        peliculas.Add(pelicula);

        return Ok(pelicula);
    }
}