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
        private UserManager<User> userManager;
        private RoleManager<User> roleManager;
        private IConfiguration configuration;

        //  private readonly UserDbContext _context;

        public UsersController(UserManager<User> userManager, RoleManager<User> roleManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.configuration = configuration;
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<ActionResult<User>> registerUser(UserDto user)
        {
            var existingUser = userManager.FindByEmailAsync(user.email);
            return Ok(user);

            if (existingUser != null)
            {
                return BadRequest(new AuthResult()
                {
                    result = false,
                    errors = new List<string>()
                    {
                        "Email already exists"
                    }

                });

            }
            else
            {
                //create a user
                var new_user = new User()
                {
                    email = user.email,
                };

                var is_created = await userManager.CreateAsync(new_user, user.password);

                if (is_created.Succeeded)
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
            return BadRequest();

        }
        private string generateToken(User user)
        {

            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.UTF8.GetBytes(configuration.GetSection("JWT:Secret").Value);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, user.email),
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


// GET: Users
/*public async Task<IActionResult> Index()
{
    return _context.Users != null ?
                View(await _context.Users.ToListAsync()) :
                Problem("Entity set 'UserDbContext.Users'  is null.");
}

// GET: Users/Details/5
public async Task<IActionResult> Details(int? id)
{
    if (id == null || _context.Users == null)
    {
        return NotFound();
    }

    var user = await _context.Users
        .FirstOrDefaultAsync(m => m.id == id);
    if (user == null)
    {
        return NotFound();
    }

    return View(user);
}

// GET: Users/Create
public IActionResult Create()
{
    return View();
}

// POST: Users/Create
// To protect from overposting attacks, enable the specific properties you want to bind to.
// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Create([Bind("id,email,password,name")] User user)
{
    if (ModelState.IsValid)
    {
        _context.Add(user);
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }
    return View(user);
}

// GET: Users/Edit/5
public async Task<IActionResult> Edit(int? id)
{
    if (id == null || _context.Users == null)
    {
        return NotFound();
    }

    var user = await _context.Users.FindAsync(id);
    if (user == null)
    {
        return NotFound();
    }
    return View(user);
}

// POST: Users/Edit/5
// To protect from overposting attacks, enable the specific properties you want to bind to.
// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Edit(int id, [Bind("id,email,password,name")] User user)
{
    if (id != user.id)
    {
        return NotFound();
    }

    if (ModelState.IsValid)
    {
        try
        {
            _context.Update(user);
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!UserExists(user.id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        return RedirectToAction(nameof(Index));
    }
    return View(user);
}

// GET: Users/Delete/5
public async Task<IActionResult> Delete(int? id)
{
    if (id == null || _context.Users == null)
    {
        return NotFound();
    }

    var user = await _context.Users
        .FirstOrDefaultAsync(m => m.id == id);
    if (user == null)
    {
        return NotFound();
    }

    return View(user);
}

// POST: Users/Delete/5
[HttpPost, ActionName("Delete")]
[ValidateAntiForgeryToken]
public async Task<IActionResult> DeleteConfirmed(int id)
{
    if (_context.Users == null)
    {
        return Problem("Entity set 'UserDbContext.Users'  is null.");
    }
    var user = await _context.Users.FindAsync(id);
    if (user != null)
    {
        _context.Users.Remove(user);
    }

    await _context.SaveChangesAsync();
    return RedirectToAction(nameof(Index));
}

private bool UserExists(int id)
{
    return (_context.Users?.Any(e => e.id == id)).GetValueOrDefault();
}*/