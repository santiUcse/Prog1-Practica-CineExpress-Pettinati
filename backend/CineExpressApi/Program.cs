var builder = WebApplication.CreateBuilder(args);

// 1. Habilitar controladores y OpenAPI nativo
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// 2. Permitir peticiones desde Live Server (CORS)
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirLiveServer", policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5500", "http://localhost:5500")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
dir
// 3. Activar la política de CORS
app.UseCors("PermitirLiveServer");

app.UseAuthorization();

// 4. Mapear las rutas de tus controladores
app.MapControllers();

app.Run();