using Microsoft.EntityFrameworkCore;
using SurveyApi.Data;
using SurveyApi.Interfaces;
using SurveyApi.Models;

namespace SurveyApi.Repositories
{
  public class SurveyRepository : ISurveyRepository
  {
    private readonly AppDbContext _db;

    public SurveyRepository(AppDbContext db)
    {
      _db = db;
    }

    public async Task CreateSurveyAsync(Survey survey)
    {
        await _db.Surveys.AddAsync(survey);
      await _db.SaveChangesAsync();

    }
    public async Task<IEnumerable<Survey>> GetAllAsync()
    {
        return await _db.Surveys.ToListAsync();
    }

    public async Task<Survey> GetSurveyByIDAsync(int id)
    {
      return await _db.Surveys.Include("Questions.Options").FirstAsync(s => s.ID == id);
    }    
  }
}