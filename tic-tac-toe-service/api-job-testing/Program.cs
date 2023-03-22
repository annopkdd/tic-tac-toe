using Microsoft.EntityFrameworkCore;
using api_job_testing.Models;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services
    .AddDbContext<DataContext>(opt =>
    {
        opt.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection"));
    })
    .AddControllers();

//builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddCors(); // Make sure you call this previous to AddMvc


var app = builder.Build();

app.UseCors(builder => builder
     .AllowAnyOrigin()
     .AllowAnyMethod()
     .AllowAnyHeader());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
   
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

