namespace CineExpressApi.Models;

public class Pelicula
{
    public int Id { get; set; }

    public string Titulo { get; set; } = "";

    public string Genero { get; set; } = "";

    public int Duracion { get; set; }

    public int CopiasDisponibles { get; set; }
}