using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;

namespace BookCatalog.Tests.Integration;

public class TestWebApplication : WebApplicationFactory<Program>, IAsyncLifetime
{
    private readonly TestMsSqlDatabase _database = new();

    public async Task InitializeAsync()
    {
        await _database.InitializeAsync();
    }

    public new async Task DisposeAsync()
    {
        await _database.DisposeAsync();
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseSetting(
            "ConnectionStrings:Database",
            _database.ConnectionString
        );
    }
}