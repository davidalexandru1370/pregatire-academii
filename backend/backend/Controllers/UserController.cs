using backend.Model;
using backend.Model.DTOs;
using backend.Repository;
using backend.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        private ICookieUtilities _cookieUtilities;
        private AppSettings _appSettings;

        public UserController(IUserService userService, IOptions<AppSettings> options, ICookieUtilities cookieUtilities)
        {
            _userService = userService;
            _cookieUtilities = cookieUtilities;
            _appSettings = options.Value;
        }

        [HttpPost("authentificate")]
        public async Task<ActionResult> Authentificate([FromBody] UserDto user)
        {
            if (user is null)
            {
                return BadRequest("Invalid User!");
            }

            var response = await _userService.Authentificate(new User()
            {
                Email = user.email,
                Name = user.name,
                Password = user.password
            });

            AuthResultDTO authResult = new AuthResultDTO()
            {
                errors = response.errors,
                result = response.result
            };

            if (string.IsNullOrWhiteSpace(response.AccessToken))
            {
                return StatusCode(403, authResult);
            }

            _cookieUtilities.setCookiePrivate("accessToken", response.AccessToken, HttpContext, _appSettings.RefreshTokenTTL);
            _cookieUtilities.setCookiePrivate("refreshToken", response.RefreshToken, HttpContext, _appSettings.RefreshTokenTTL);

            return Ok(authResult);
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] UserDto user)
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

            _cookieUtilities.setCookiePrivate("accessToken", response.AccessToken, HttpContext, _appSettings.RefreshTokenTTL);
            _cookieUtilities.setCookiePrivate("refreshToken", response.RefreshToken, HttpContext, _appSettings.RefreshTokenTTL);
            return Ok();
        }

        [HttpPost]
        [Route("logout")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(statusCode:StatusCodes.Status200OK)]
        public async Task<ActionResult> Logout()
        {
            var accessToken = HttpContext.Request.Cookies.Where(c => c.Key == "accessToken");
            var refreshToken = HttpContext.Request.Cookies.Where(c => c.Key == "refreshToken");

            if (accessToken == null || refreshToken == null)
            {
                return BadRequest();
            }

            _cookieUtilities.setCookiePrivate("accessToken", "", HttpContext, -2);
            _cookieUtilities.setCookiePrivate("refreshToken", "", HttpContext, -2);
            return Ok();
        }

        [HttpPost]
        [Route("authorize")]
        public async Task<ActionResult> Authorize()
        {
            //var accessToken = HttpContext.Request.Cookies["accessToken"];
            var accessToken = HttpContext.Items["accessToken"] as string;
            if (accessToken is not null)
            {
                try
                {
                    var user = _userService.GetByAccessToken(accessToken).Result;
                    return Ok(new UserDto() { email = user.Email, name = user.Name });
                }
                catch (RepositoryException repositoryException)
                {

                }
            }
            return BadRequest();
        }

       /* [HttpPatch]
        
        public async Task<ActionResult> ForgotPassword(string email)
        {

        }*/
    }
}
