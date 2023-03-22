using Microsoft.EntityFrameworkCore;

namespace api_job_testing.Models;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    {
    }

    public DbSet<Game> Games { get; set; } = null!;
}