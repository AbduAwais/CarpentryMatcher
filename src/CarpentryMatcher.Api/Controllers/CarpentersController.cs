using CarpentryMatcher.Api.Models;
using CarpentryMatcher.Api.Data;
using Microsoft.AspNetCore.Mvc;
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

    // GET: /api/carpenters/1
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Carpenter>> GetById(int id)
    {
        var carpenter = await _context.Carpenters.FindAsync(id);
        if (carpenter is null) return NotFound();

        return Ok(carpenter);
    }
    
    // POST: /api/carpenters
    [HttpPost]
    public async Task<ActionResult<Carpenter>> Create(Carpenter carpenter)
    {
        _context.Carpenters.Add(carpenter);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = carpenter.Id }, carpenter);
    }
    
    // PUT: /api/carpenters/1
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Carpenter carpenter)
    {
        if (id != carpenter.Id)
        {
            return BadRequest();
        }

        _context.Entry(carpenter).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await _context.Carpenters.AnyAsync(c => c.Id == id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }
    
    // DELETE: /api/carpenters/1
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var carpenter = await _context.Carpenters.FindAsync(id);
        if (carpenter is null)
        {
            return NotFound();
        }

        _context.Carpenters.Remove(carpenter);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}