using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BookCatalog.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Title" },
                values: new object[,]
                {
                    { new Guid("f7f1b3b3-3b0d-4b1e-8b3e-3f0b6b1f1f1f"), "The Fellowship of the Ring" },
                    { new Guid("f7f1b3b3-3b0d-4b1e-8b3e-3f0b6b1f1f2f"), "The Two Towers" },
                    { new Guid("f7f1b3b3-3b0d-4b1e-8b3e-3f0b6b1f1f3f"), "The Return of the King" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Books");
        }
    }
}
