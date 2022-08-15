﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Model;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(EntitiesDbContext))]
    [Migration("20220814183015_ChangedPrimaryKeyTokensTable")]
    partial class ChangedPrimaryKeyTokensTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("backend.Model.Token", b =>
                {
                    b.Property<string>("TokenValue")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("Datetime");

                    b.Property<string>("CreatedByIp")
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime>("Expires")
                        .HasColumnType("Datetime");

                    b.Property<string>("ReasonRevoked")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("ReplacedByToken")
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime?>("Revoked")
                        .HasColumnType("datetime");

                    b.Property<string>("RevokedByIp")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("TokenValue");

                    b.ToTable("TokenDetails");
                });

            modelBuilder.Entity("backend.Model.Tokens", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("AccessToken")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AccessToken");

                    b.HasIndex("RefreshToken");

                    b.HasIndex("UserId");

                    b.ToTable("Tokens");
                });

            modelBuilder.Entity("backend.Model.User", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.HasKey("id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("backend.Model.Tokens", b =>
                {
                    b.HasOne("backend.Model.Token", "AccessTokenLink")
                        .WithMany()
                        .HasForeignKey("AccessToken");

                    b.HasOne("backend.Model.Token", "RefreshTokenLink")
                        .WithMany()
                        .HasForeignKey("RefreshToken");

                    b.HasOne("backend.Model.User", "user")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AccessTokenLink");

                    b.Navigation("RefreshTokenLink");

                    b.Navigation("user");
                });
#pragma warning restore 612, 618
        }
    }
}
