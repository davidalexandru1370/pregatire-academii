﻿using backend.Model;
using backend.Model.DTOs;
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

            _cookieUtilities.setCookiePrivate("accessToken", response.AccessToken, _appSettings.RefreshTokenTTL);
            _cookieUtilities.setCookiePrivate("refreshToken", response.RefreshToken, _appSettings.RefreshTokenTTL);

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

            _cookieUtilities.setCookiePrivate("accessToken", response.AccessToken, _appSettings.RefreshTokenTTL);
            _cookieUtilities.setCookiePrivate("refreshToken", response.RefreshToken, _appSettings.RefreshTokenTTL);
            return Ok();
        }

        [Authorize]
        [HttpGet]
        [Route("authorize")]
        public async Task<ActionResult> Authorize()
        {
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
        }
    }
}
