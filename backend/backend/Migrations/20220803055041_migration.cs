using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class migration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TokenDetails",
                columns: table => new
                {
                    TokenValue = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Expires = table.Column<DateTime>(type: "Datetime", nullable: false),
                    Created = table.Column<DateTime>(type: "Datetime", nullable: false),
                    CreatedByIp = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Revoked = table.Column<DateTime>(type: "datetime", nullable: true),
                    RevokedByIp = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    ReplacedByToken = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    ReasonRevoked = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TokenDetails", x => x.TokenValue);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    email = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(250)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Tokens",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    AccessToken = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    RefreshToken = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tokens", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Tokens_TokenDetails_AccessToken",
                        column: x => x.AccessToken,
                        principalTable: "TokenDetails",
                        principalColumn: "TokenValue");
                    table.ForeignKey(
                        name: "FK_Tokens_TokenDetails_RefreshToken",
                        column: x => x.RefreshToken,
                        principalTable: "TokenDetails",
                        principalColumn: "TokenValue");
                    table.ForeignKey(
                        name: "FK_Tokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tokens_AccessToken",
                table: "Tokens",
                column: "AccessToken");

            migrationBuilder.CreateIndex(
                name: "IX_Tokens_RefreshToken",
                table: "Tokens",
                column: "RefreshToken");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tokens");

            migrationBuilder.DropTable(
                name: "TokenDetails");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
