using CarpentryMatcher.Api.Models;
using Microsoft.AspNetCore.Mvc;
using CarpentryMatcher.Api.Data;

namespace CarpentryMatcher.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarpentersController : ControllerBase
{
    // GET: /api/carpenters
    [HttpGet]
    public ActionResult<IEnumerable<Carpenter>> GetAll(
        [FromQuery] string? query,
        [FromQuery] string? city)
    {
        var carpenters = MockCarpenter.Carpenters.AsQueryable();

        if (!string.IsNullOrWhiteSpace(city))
        {
            var cityLower = city.Trim().ToLower();
            carpenters = carpenters.Where(c => c.City.ToLower().Contains(cityLower));
        }

        if (!string.IsNullOrWhiteSpace(query))
        {
            var q = query.Trim().ToLower();
            carpenters = carpenters.Where(c =>
                c.Name.ToLower().Contains(q) ||
                c.Specialties.Any(s => s.ToLower().Contains(q))
            );
        }

        return Ok(carpenters.ToList());
    }

    // Optional: GET /api/carpenters/1
    [HttpGet("{id:int}")]
    public ActionResult<Carpenter> GetById(int id)
    {
        var carpenter = MockCarpenter.Carpenters.FirstOrDefault(c => c.Id == id);
        if (carpenter is null) return NotFound();

        return Ok(carpenter);
    }
    
    [HttpPost(Name = "CreateCarpenter")]
    public ActionResult<Carpenter> Create(Carpenter carpenter)
    {
        MockCarpenter.Carpenters.Add(carpenter);
        return CreatedAtAction(nameof(GetById), new { id = carpenter.Id }, carpenter);
    }
}