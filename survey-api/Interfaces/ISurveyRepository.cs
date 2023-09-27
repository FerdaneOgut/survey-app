using SurveyApi.Models;

namespace SurveyApi.Interfaces
{
  public interface ISurveyRepository
  {
    Task<IEnumerable<Survey>> GetAllAsync();
    Task<Survey> GetSurveyByIDAsync(int id);
    Task CreateSurveyAsync(Survey survey);
  }
}