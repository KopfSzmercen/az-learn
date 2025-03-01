using Testcontainers.MsSql;

namespace BookCatalog.Tests.Integration;

internal sealed class TestMsSqlDatabase : IAsyncLifetime
{
    private readonly MsSqlContainer _container = new MsSqlBuilder()
        .WithImage("mcr.microsoft.com/mssql/server:latest")
        .WithPassword("Password123")
        .WithEnvironment("ACCEPT_EULA", "Y")
        .Build();

    public string ConnectionString { get; private set; }


    public async Task InitializeAsync()
    {
        await _container.StartAsync();
        ConnectionString = _container.GetConnectionString();
    }

    public async Task DisposeAsync()
    {
        await _container.StopAsync();
    }
}