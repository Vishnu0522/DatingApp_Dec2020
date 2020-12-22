using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class UsersController : BaseAPIController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {

            var users = await _context.Users.ToListAsync();
            return users;
        }

        [Authorize]
        // api/users/1
        [HttpGet("{Id}")]
        public ActionResult<AppUser> GetUser(int Id)
        {

            var user = _context.Users.Where(x=>x.Id == Id).FirstOrDefault();
            return user;
        }
    }
}