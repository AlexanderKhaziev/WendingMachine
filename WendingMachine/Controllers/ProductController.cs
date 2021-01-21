using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WendingMachine.Models;

namespace WendingMachine.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController : Controller
    {
        ApplicationContext db;
        public ProductController(ApplicationContext context)
        {
            db = context;
            if (!db.Products.Any())
            {
                // for test
                db.Products.Add(new Product { Name = "Coca-Cola", Price = 32, Count = 3, ImagePath = "" });
                db.Products.Add(new Product { Name = "Pepsi-Cola", Price = 29, Count = 4, ImagePath = "" });
                db.Products.Add(new Product { Name = "Bonaqua", Price = 17, Count = 6, ImagePath = "" });
                db.Products.Add(new Product { Name = "Sprite", Price = 30, Count = 2, ImagePath = "" });
                db.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return db.Products.ToList();
        }

        [HttpGet("{id}")]
        public Product Get(int id)
        {
            Product product = db.Products.FirstOrDefault(x => x.Id == id);
            return product;
        }

        [HttpPost]
        public IActionResult Post(Product product)
        {
            if(ModelState.IsValid)
            {
                db.Products.Add(product);
                db.SaveChanges();
                return Ok(product);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(Product product)
        {
            if(ModelState.IsValid)
            {
                db.Update(product);
                db.SaveChanges();
                return Ok(product);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Product product = db.Products.FirstOrDefault(x => x.Id == id);
            if(product != null)
            {
                db.Products.Remove(product);
                db.SaveChanges();
            }
            return Ok(product);
        }
    }
}
