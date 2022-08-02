using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class migration4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tokens_TokenDetails_RefreshToken AccessToken",
                table: "Tokens");

            migrationBuilder.DropIndex(
                name: "IX_Tokens_RefreshToken AccessToken",
                table: "Tokens");

            migrationBuilder.DropColumn(
                name: "RefreshToken AccessToken",
                table: "Tokens");

            migrationBuilder.AlterColumn<string>(
                name: "RefreshToken",
                table: "Tokens",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tokens_RefreshToken",
                table: "Tokens",
                column: "RefreshToken");

            migrationBuilder.AddForeignKey(
                name: "FK_Tokens_TokenDetails_RefreshToken",
                table: "Tokens",
                column: "RefreshToken",
                principalTable: "TokenDetails",
                principalColumn: "TokenValue");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tokens_TokenDetails_RefreshToken",
                table: "Tokens");

            migrationBuilder.DropIndex(
                name: "IX_Tokens_RefreshToken",
                table: "Tokens");

            migrationBuilder.AlterColumn<string>(
                name: "RefreshToken",
                table: "Tokens",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RefreshToken AccessToken",
                table: "Tokens",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tokens_RefreshToken AccessToken",
                table: "Tokens",
                column: "RefreshToken AccessToken");

            migrationBuilder.AddForeignKey(
                name: "FK_Tokens_TokenDetails_RefreshToken AccessToken",
                table: "Tokens",
                column: "RefreshToken AccessToken",
                principalTable: "TokenDetails",
                principalColumn: "TokenValue");
        }
    }
}
