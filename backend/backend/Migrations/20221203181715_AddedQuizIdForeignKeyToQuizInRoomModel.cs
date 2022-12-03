using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddedQuizIdForeignKeyToQuizInRoomModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "QuizId",
                table: "Room",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Room_QuizId",
                table: "Room",
                column: "QuizId");

            migrationBuilder.AddForeignKey(
                name: "FK_Room_Quiz_QuizId",
                table: "Room",
                column: "QuizId",
                principalTable: "Quiz",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Room_Quiz_QuizId",
                table: "Room");

            migrationBuilder.DropIndex(
                name: "IX_Room_QuizId",
                table: "Room");

            migrationBuilder.DropColumn(
                name: "QuizId",
                table: "Room");
        }
    }
}
