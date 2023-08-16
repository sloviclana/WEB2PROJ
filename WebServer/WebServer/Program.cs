using Microsoft.EntityFrameworkCore;
using WebServer;
using WebServer.Dto;
using WebServer.Infrastructure;
using WebServer.Repository;
using WebServer.Repository.Interfaces;
using WebServer.Services;
using WebServer.Services.Interfaces;

/*
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<WebShopDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddScoped<IUserService, UserService>();    
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IArticleRepository, ArticleRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IArticleService, ArticleService>();
builder.Services.AddScoped<IOrderService, OrderService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//var host = builder.Build();

// Resolve the service from the service provider
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var myService = services.GetRequiredService<IUserService>();
    UserDto u = myService.GetUser(1); // Call the service method
    Console.WriteLine("i got the user: " + u.FullName + " " + u.Address);
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();



app.Run();
*/

namespace Server
{
    public class Program
    {

        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });

    }
}