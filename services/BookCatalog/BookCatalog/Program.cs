using BookCatalog;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(
    options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("Database"), x => x.EnableRetryOnFailure(
            5,
            TimeSpan.FromSeconds(30),
            null)
        );
    }
);

var app = builder.Build();

var serviceScopeFactory = app.Services.GetRequiredService<IServiceScopeFactory>();
await using (var scope = serviceScopeFactory.CreateAsyncScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await dbContext.Database.MigrateAsync();
}

if (app.Environment.IsDevelopment()) app.MapOpenApi();

app.UseHttpsRedirection();

app.MapGet("/books", async (AppDbContext dbContext) => await dbContext.Books.ToListAsync());

app.MapPost("/books", async (AppDbContext dbContext, Book book) =>
{
    dbContext.Books.Add(book);
    await dbContext.SaveChangesAsync();
    return Results.Created($"/books/{book.Id}", book);
});

app.MapGet("/books/{id:guid}", async (AppDbContext dbContext, Guid id) =>
{
    var book = await dbContext.Books.FindAsync(id);
    return book is null ? Results.NotFound() : Results.Ok(book);
});

app.Run();

public partial class Program
{
}