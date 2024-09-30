﻿using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Shared.DataTransferObjects;

namespace eLearningSystem.Presentation.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IServiceManager _service;
        //private readonly IEmailSender _emailSender;

        public AuthenticationController(IServiceManager service)
        {
            _service = service;
            //_emailSender = emailSender;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerUserDto)
        {
            bool result = await _service.AuthenticationService.CreateUser(registerUserDto, "Learner");
            if (result) 
            {
                return Ok(new ResponseDto(["User registered successfully!"]));
            } 
            else return BadRequest(new ResponseDto(["Registration failed. Please try again."]));

        }

        public async Task<IActionResult> Authenticate([FromBody] LoginRequestDto user)
        {
            if (!await _service.AuthenticationService.ValidateUser(user))
                return Unauthorized();

            var tokenDto = await _service.AuthenticationService.CreateToken(populateExp: true);
            return Ok(tokenDto);
        }
    }
}
