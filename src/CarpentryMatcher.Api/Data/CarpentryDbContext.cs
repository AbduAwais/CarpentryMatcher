using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using CarpentryMatcher.Api.Models;

namespace CarpentryMatcher.Api.Data;

public class CarpentryDbContext : DbContext
{
    public CarpentryDbContext(DbContextOptions<CarpentryDbContext> options) 
        : base(options)
    {
    }

    public DbSet<Carpenter> Carpenters => Set<Carpenter>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Configure Specialties as a comma-separated string for SQLite
        var stringListComparer = new ValueComparer<List<string>>(
            (c1, c2) => c1!.SequenceEqual(c2!),
            c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
            c => c.ToList());

        modelBuilder.Entity<Carpenter>()
            .Property(c => c.Specialties)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList())
            .Metadata.SetValueComparer(stringListComparer);
    }
}