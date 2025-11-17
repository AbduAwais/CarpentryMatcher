using CarpentryMatcher.Api.Models;

namespace CarpentryMatcher.Api.Data;

public static class MockCarpenter
{
    public static List<Carpenter> Carpenters { get; } =
    [
        new Carpenter
    {
        Id = 1,
        Name = "Nordic Wood ApS",
        City = "København",
        Phone = "12345678",
        Email = "info@nordicwood.dk",
        Website = "https://nordicwood.dk",
        Specialties = ["terrasse", "tag", "renovering"],
        Rating = 4.7
    },
    new Carpenter
    {
        Id = 2,
        Name = "Terrasse Eksperten",
        City = "Roskilde",
        Phone = "87654321",
        Email = "kontakt@terrasseeksperten.dk",
        Website = "https://terrasseeksperten.dk",
        Specialties = ["terrasse", "hegn"],
        Rating = 4.5
    },
    new Carpenter
    {
        Id = 3,
        Name = "Lokalsnedkeren",
        City = "Valby",
        Phone = "55556666",
        Email = "hej@lokalsnedkeren.dk",
        Website = "",
        Specialties = ["reparation", "døre", "vinduer"],
        Rating = 4.2
    }
    ];
}


