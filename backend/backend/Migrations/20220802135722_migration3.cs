using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class migration3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tokens_TokenDetails_TokenValue",
                table: "Tokens");

            migrationBuilder.DropForeignKey(
                name: "FK_Tokens_Users_id",
                table: "Tokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tokens",
                table: "Tokens");

            migrationBuilder.DropIndex(
                name: "IX_Tokens_id",
                table: "Tokens");

            migrationBuilder.DropIndex(
                name: "IX_Tokens_TokenValue",
                table: "Tokens");

            migrationBuilder.DropColumn(
                name: "UserIdFK",
                table: "Tokens");

            migrationBuilder.DropColumn(
                name: "TokenValue",
                table: "Tokens");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Tokens",
                newName: "UserId");

            migrationBuilder.AddColumn<string>(
                name: "RefreshToken AccessToken",
                table: "Tokens",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tokens",
                table: "Tokens",
                column: "UserId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Tokens_Users_UserId",
                table: "Tokens",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tokens_TokenDetails_RefreshToken AccessToken",
                table: "Tokens");

            migrationBuilder.DropForeignKey(
                name: "FK_Tokens_Users_UserId",
                table: "Tokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tokens",
                table: "Tokens");

            migrationBuilder.DropIndex(
                name: "IX_Tokens_RefreshToken AccessToken",
                table: "Tokens");

            migrationBuilder.DropColumn(
                name: "RefreshToken AccessToken",
                table: "Tokens");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Tokens",
                newName: "id");

            migrationBuilder.AddColumn<int>(
                name: "UserIdFK",
                table: "Tokens",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "TokenValue",
                table: "Tokens",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tokens",
                table: "Tokens",
                column: "UserIdFK");

            migrationBuilder.CreateIndex(
                name: "IX_Tokens_id",
                table: "Tokens",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "IX_Tokens_TokenValue",
                table: "Tokens",
                column: "TokenValue");

            migrationBuilder.AddForeignKey(
                name: "FK_Tokens_TokenDetails_TokenValue",
                table: "Tokens",
                column: "TokenValue",
                principalTable: "TokenDetails",
                principalColumn: "TokenValue",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tokens_Users_id",
                table: "Tokens",
                column: "id",
                principalTable: "Users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
