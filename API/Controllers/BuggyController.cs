using System;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseAPIController
    {
        private readonly DataContext _context;

        public BuggyController(DataContext context)
        {
            this._context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret(){
            return "Secert text";
        }

        [HttpGet("not-found")]
        public ActionResult<string> GetNotFound(){
            var thing = _context.Users.Find(-1);
            if(thing == null) return NotFound();
            return Ok(thing);
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError(){
            try{
                var thing = _context.Users.Find(-1);
                var thingtoReturn = thing.ToString();
                return thingtoReturn;
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Source);
            }
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest(){
            return BadRequest("This is not correct request");
        }
        
    }
}