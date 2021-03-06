using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.Interface;
using API.DTOs;
using AutoMapper;
using System.Security.Claims;

namespace API.Controllers
{

    [Authorize]
    public class UsersController : BaseAPIController
    {
        private readonly IUserRepository _repository;

        public IMapper _mapper { get; }

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _repository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var user = await _repository.GetUsersAsync();
            var userToReturn = _mapper.Map<IEnumerable<MemberDto>>(user);
            return Ok(userToReturn);   
        }

        // api/users/1
        [HttpGet("emp/{Id}")]
        public ActionResult<AppUser> GetUser(int Id)
        {
            return Ok(_repository.GetUserByIdAsync(Id));
        }

        // api/users/1
        // [HttpGet("{member}")]
        // public async Task<ActionResult<MemberDto>> GetUser(string username)
        // {
        //     var user = await _repository.GetUserbyUsernameAsync(username);
        //     var mappedUser = this._mapper.Map<MemberDto>(user);
        //     return Ok(mappedUser);
        // }

        [HttpGet("{member}")]
        public async Task<ActionResult<MemberDto>> GetMember(string member)
        {
            var user = await _repository.GetMemberAsync(member);
            var mappedUser = this._mapper.Map<MemberDto>(user);
            return Ok(mappedUser);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMember(MemberUpdateDto memberUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _repository.GetUserbyUsernameAsync(username);
            _mapper.Map(memberUpdateDto, user);
            _repository.Update(user);

            if (await _repository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to update user");
        }
    }
}