using SurveyApi.Models;
using Microsoft.EntityFrameworkCore;

namespace SurveyApi.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
      this.Database.EnsureCreated();
    }

    public DbSet<Survey> Surveys { get; set; }
    public DbSet<SurveyQuestion> SurveyQuestions { get; set; }
    public DbSet<SurveyQuestion> SurveyQuestionChoices { get; set; }
  }
}