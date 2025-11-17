namespace CarpentryMatcher.Api.Models;

public class Carpenter
{
   public int Id { get; set; }
   public string Name { get; set; } = string.Empty;
   public string City { get; set; } = string.Empty;
   public string Phone { get; set; } = string.Empty;
   public string Email { get; set; } = string.Empty;
   public string Website { get; set; } = string.Empty;
   public List<string> Specialties { get; set; } = new();
   public double? Rating { get; set; } // optional
}