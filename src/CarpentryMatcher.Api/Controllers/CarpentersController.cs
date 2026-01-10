using CarpentryMatcher.Api.Models;
using Microsoft.AspNetCore.Mvc;
using CarpentryMatcher.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace CarpentryMatcher.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarpentersController : ControllerBase
{
    private readonly CarpentryDbContext _context;

    public CarpentersController(CarpentryDbContext context)
    {
        _context = context;
    }

    // GET: /api/carpenters
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Carpenter>>> GetAll(
        [FromQuery] string? query,
        [FromQuery] string? city)
    {
        var carpenters = _context.Carpenters.AsQueryable();

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

        return Ok(await carpenters.ToListAsync());
    }

    // GET /api/carpenters/1
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Carpenter>> GetById(int id)
    {
        var carpenter = await _context.Carpenters.FindAsync(id);
        if (carpenter is null) return NotFound();

        return Ok(carpenter);
    }
    
    // POST /api/carpenters
    [HttpPost]
    public async Task<ActionResult<Carpenter>> Create(Carpenter carpenter)
    {
        _context.Carpenters.Add(carpenter);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = carpenter.Id }, carpenter);
    }

    // PUT /api/carpenters/1
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Carpenter carpenter)
    {
        if (id != carpenter.Id) return BadRequest();

        var existing = await _context.Carpenters.FindAsync(id);
        if (existing is null) return NotFound();

        existing.Name = carpenter.Name;
        existing.City = carpenter.City;
        existing.Phone = carpenter.Phone;
        existing.Email = carpenter.Email;
        existing.Website = carpenter.Website;
        existing.Specialties = carpenter.Specialties;
        existing.Rating = carpenter.Rating;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE /api/carpenters/1
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var carpenter = await _context.Carpenters.FindAsync(id);
        if (carpenter is null) return NotFound();

        _context.Carpenters.Remove(carpenter);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}