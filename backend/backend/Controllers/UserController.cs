using backend.Model;
using backend.Model.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authentificate")]
        public IActionResult Authentificate([FromBody] UserDto user)
        {
            var response = _userService.Authentificate(new Model.User()
            {
                email = user.email,
                name = user.name,
                password = user.password
            }, HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString());

            if (string.IsNullOrWhiteSpace(response.Result.AccessToken))
            {
                return Forbid();
            }

            setTokenCookie("accessToken", response.Result.AccessToken);
            setTokenCookie("refreshToken", response.Result.RefreshToken);

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto user)
        {
            var response = _userService.Register(new User()
            {
                email = user.email,
                name = user.name,
                password = user.password
            }, HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString());

            if (response.Result.result == false)
            {
                return BadRequest(response.Result.errors);
            }
            setTokenCookie("accessToken", response.Result.AccessToken);
            setTokenCookie("refreshToken", response.Result.RefreshToken);
            return Ok();
        }

        private void setTokenCookie(string tokenName, string tokenValue)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                Expires = DateTime.Now.AddDays(7),
            };

            Response.Cookies.Append(tokenName, tokenValue, cookieOptions);
            Response.Cookies.Append(tokenName, tokenValue, cookieOptions);
        }
    }
}
