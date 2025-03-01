using Microsoft.EntityFrameworkCore;

namespace BookCatalog;

internal sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Book> Books { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>().HasKey(x => x.Id);

        modelBuilder.Entity<Book>()
            .Property(x => x.Title)
            .HasMaxLength(500)
            .IsRequired();


        modelBuilder.Entity<Book>().HasData(
            new Book
            {
                Id = Guid.Parse("f7f1b3b3-3b0d-4b1e-8b3e-3f0b6b1f1f1f"),
                Title = "The Fellowship of the Ring"
            },
            new Book
            {
                Id = Guid.Parse("f7f1b3b3-3b0d-4b1e-8b3e-3f0b6b1f1f2f"),
                Title = "The Two Towers"
            },
            new Book
            {
                Id = Guid.Parse("f7f1b3b3-3b0d-4b1e-8b3e-3f0b6b1f1f3f"),
                Title = "The Return of the King"
            }
        );
    }
}