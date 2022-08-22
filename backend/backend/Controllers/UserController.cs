using backend.Model;
using backend.Model.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("authentificate")]
        public IActionResult Authentificate([FromBody] UserDto user)
        {
            var response = _userService.Authentificate(new User()
            {
                Email = user.email,
                Name = user.name,
                Password = user.password
            });

            if (string.IsNullOrWhiteSpace(response.Result.AccessToken))
            {
                return StatusCode(403, response);
            }

            setTokenCookie("accessToken", response.Result.AccessToken);
            setTokenCookie("refreshToken", response.Result.RefreshToken);

            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDto user)
        {
            var response = await _userService.Register(new User()
            {
                Email = user.email,
                Name = user.name,
                Password = user.password
            });

            if (response.result == false)
            {
                return BadRequest(response);
            }

            setTokenCookie("accessToken", response.AccessToken);
            setTokenCookie("refreshToken", response.RefreshToken);
            return Ok();
        }

        private void setTokenCookie(string tokenName, string tokenValue)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                IsEssential = true,
                Expires = DateTime.Now.AddDays(7),
            };

            Response.Cookies.Append(tokenName, tokenValue, cookieOptions);
            Response.Cookies.Append(tokenName, tokenValue, cookieOptions);
        }
    }
}
