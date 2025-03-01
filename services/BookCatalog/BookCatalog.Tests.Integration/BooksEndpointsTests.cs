using System.Net;
using System.Net.Http.Json;
using Shouldly;

namespace BookCatalog.Tests.Integration;

public class BooksEndpointsTest(TestWebApplication app) : IClassFixture<TestWebApplication>
{
    [Fact]
    public async Task GetBooks_ShouldSucceed()
    {
        // Arrange
        var client = app.CreateClient();

        // Act
        var response = await client.GetAsync("/books");

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.OK);

        var responseContent = await response.Content.ReadFromJsonAsync<List<Book>>();

        responseContent.ShouldNotBeNull();
    }

    [Fact]
    public async Task PostBook_ShouldSucceed()
    {
        // Arrange
        var client = app.CreateClient();
        var book = new Book { Title = "Test", Id = Guid.NewGuid() };

        // Act
        var response = await client.PostAsJsonAsync("/books", book);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.Created);
    }

    [Fact]
    public async Task GetBook_ShouldSucceed()
    {
        // Arrange
        var client = app.CreateClient();
        var book = new Book { Title = "Test", Id = Guid.NewGuid() };
        await client.PostAsJsonAsync("/books", book);

        // Act
        var response = await client.GetAsync($"/books/{book.Id}");

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.OK);

        var responseBook = await response.Content.ReadFromJsonAsync<Book>();

        responseBook.ShouldNotBeNull();
        responseBook!.Id.ShouldBe(book.Id);
        responseBook.Title.ShouldBe(book.Title);
    }
}