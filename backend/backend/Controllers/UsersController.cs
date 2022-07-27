using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using backend.Model;
using System.Text.Encodings;
using Microsoft.AspNetCore.Identity;
using backend.Validators;
using backend.Model.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        //private UserManager<IdentityUser> userManager;
        //private RoleManager<User> roleManager;
        private IConfiguration configuration;

        private readonly Model.EntitiesDbContext context;

        public UsersController(Model.EntitiesDbContext _context, IConfiguration configuration)
        {
            //this.userManager = userManager;
            context = _context;
            this.configuration = configuration;
        }

        [HttpPost]
        //[ServiceFilter(typeof(ValidationFilterAttribute))]
        [Route("Register")]
        public async Task<IActionResult> registerUser([FromBody] UserDto user)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await context.Users.FirstOrDefaultAsync(x => x.email == user.email);

                if (existingUser != null)
                {
                    return BadRequest(new AuthResult()
                    {
                        result = false,
                        errors = new List<string>()
                    {
                        "Exista deja aceasta adresa de email inregistrata!"
                    }
                    });
                }
                else
                {
                    //create a user
                    var new_user = new IdentityUser()
                    {
                        Email = user.email
                    };

                    //var is_created = await userManager.CreateAsync(new_user, user.password);
                    var is_created = await context.Users.AddAsync(new Model.User()
                    {
                        email = user.email,
                        password = user.password,
                        name = user.email
                    });

                    await context.SaveChangesAsync();

                    if (is_created != null)
                    {
                        //generate token
                        var token = generateToken(new_user);
                        return Ok(new AuthResult()
                        {
                            result = true,
                            token = token
                        });
                    }
                    else
                    {
                        return BadRequest(new AuthResult()
                        {
                            errors = new List<string>()
                        {
                            "server error"
                        },
                            result = false
                        });
                    }
                }
            }

            return BadRequest(new AuthResult()
            {
                errors = new List<string>()
                {
                    "Datele sunt invalide"
                },
                result = false

            });

        }
        private string generateToken(IdentityUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.UTF8.GetBytes(configuration.GetSection("JWT:Secret").Value);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                }),

                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);

            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken.ToString();
        }
    }
}