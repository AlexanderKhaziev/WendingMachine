using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WendingMachine.Models;

namespace WendingMachine.Controllers
{
    [ApiController]
    [Route("api/coins")]
    public class CoinController : Controller
    {
        ApplicationContext db;
        public CoinController(ApplicationContext context)
        {
            db = context;
            if (!db.Coins.Any())
            {
                db.Coins.Add(new Coin { Value = 1, Active = true });
                db.Coins.Add(new Coin { Value = 2, Active = false });
                db.Coins.Add(new Coin { Value = 5, Active = true });
                db.Coins.Add(new Coin { Value = 10, Active = true });
                db.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<Coin> Get()
        {
            return db.Coins.ToList();
        }

        [HttpPut]
        public IActionResult Put(Coin coin)
        {
            if (ModelState.IsValid)
            {
                db.Update(coin);
                db.SaveChanges();
                return Ok(coin);
            }
            return BadRequest(ModelState);
        }
    }
}
