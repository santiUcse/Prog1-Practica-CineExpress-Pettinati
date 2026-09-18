var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Configurar CORS para aceptar peticiones desde cualquier origen local
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTodo", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// IMPORTANTE: UseCors debe ir ANTES de MapControllers
app.UseCors("PermitirTodo");

app.UseAuthorization();
app.MapControllers();

app.Run();