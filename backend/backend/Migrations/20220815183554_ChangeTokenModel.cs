using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class ChangeTokenModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TokenDetails",
                table: "TokenDetails");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "TokenDetails");

            migrationBuilder.DropColumn(
                name: "CreatedByIp",
                table: "TokenDetails");

            migrationBuilder.DropColumn(
                name: "Expires",
                table: "TokenDetails");

            migrationBuilder.DropColumn(
                name: "ReasonRevoked",
                table: "TokenDetails");

            migrationBuilder.DropColumn(
                name: "ReplacedByToken",
                table: "TokenDetails");

            migrationBuilder.DropColumn(
                name: "Revoked",
                table: "TokenDetails");

            migrationBuilder.DropColumn(
                name: "RevokedByIp",
                table: "TokenDetails");

            migrationBuilder.AlterColumn<string>(
                name: "TokenValue",
                table: "TokenDetails",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "TokenDetails",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "TokenDetails",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "TokenDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TokenDetails",
                table: "TokenDetails",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_TokenDetails_UserId",
                table: "TokenDetails",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TokenDetails_Users_UserId",
                table: "TokenDetails",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TokenDetails_Users_UserId",
                table: "TokenDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TokenDetails",
                table: "TokenDetails");

            migrationBuilder.DropIndex(
                name: "IX_TokenDetails_UserId",
                table: "TokenDetails");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "TokenDetails");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "TokenDetails");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TokenDetails");

            migrationBuilder.AlterColumn<string>(
                name: "TokenValue",
                table: "TokenDetails",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "TokenDetails",
                type: "Datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedByIp",
                table: "TokenDetails",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Expires",
                table: "TokenDetails",
                type: "Datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ReasonRevoked",
                table: "TokenDetails",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReplacedByToken",
                table: "TokenDetails",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Revoked",
                table: "TokenDetails",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RevokedByIp",
                table: "TokenDetails",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TokenDetails",
                table: "TokenDetails",
                column: "TokenValue");

            migrationBuilder.CreateTable(
                name: "Tokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccessToken = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    RefreshToken = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tokens", x => x.Id);
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

            migrationBuilder.CreateIndex(
                name: "IX_Tokens_UserId",
                table: "Tokens",
                column: "UserId");
        }
    }
}
